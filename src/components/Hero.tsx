import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

interface HeroProps {
  onGetStartedClick?: () => void
}

const Hero = ({ onGetStartedClick }: HeroProps) => {
  const { t, language } = useLanguage()
  const scrollRef1 = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    influencers: 0,
    roi: 0,
    automation: 0,
    rating: 0
  })
  const [titleVisible, setTitleVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [draggedEmoji, setDraggedEmoji] = useState<number | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [shouldResetEmojis, setShouldResetEmojis] = useState(0) // 用于触发重置
  const [deviceGravity, setDeviceGravity] = useState({ x: 0, y: 0 }) // 设备倾斜重力
  const [orientationPermissionGranted, setOrientationPermissionGranted] = useState(false) // 权限状态
  const orientationHandlerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(null) // 监听器引用

  // Emoji配置数据（添加半径信息用于碰撞检测）
  const emojis = [
    { emoji: '🚀', top: 5, left: 5, size: 'text-5xl', radius: 24 },
    { emoji: '🎯', top: 12, left: 15, size: 'text-4xl', radius: 18 },
    { emoji: '⭐', top: 8, left: 25, size: 'text-3xl', radius: 15 },
    { emoji: '🌍', top: 6, right: 8, size: 'text-4xl', radius: 18 },
    { emoji: '✈️', top: 14, right: 18, size: 'text-5xl', radius: 24 },
    { emoji: '💎', top: 10, right: 28, size: 'text-3xl', radius: 15 },
    { emoji: '🤖', top: 35, left: 3, size: 'text-4xl', radius: 18 },
    { emoji: '📱', top: 50, left: 6, size: 'text-3xl', radius: 15 },
    { emoji: '🎬', top: 65, left: 4, size: 'text-5xl', radius: 24 },
    { emoji: '📈', top: 38, right: 5, size: 'text-3xl', radius: 15 },
    { emoji: '💰', top: 52, right: 8, size: 'text-4xl', radius: 18 },
    { emoji: '🎪', top: 68, right: 6, size: 'text-5xl', radius: 24 },
    { emoji: '🎨', bottom: 8, left: 12, size: 'text-3xl', radius: 15 },
    { emoji: '✨', bottom: 6, left: 25, size: 'text-4xl', radius: 18 },
    { emoji: '🤝', bottom: 10, right: 15, size: 'text-3xl', radius: 15 },
    { emoji: '👥', bottom: 7, right: 28, size: 'text-5xl', radius: 24 },
  ]

  // 物理引擎状态：位置、速度
  const [emojiPhysics, setEmojiPhysics] = useState<{
    x: number, 
    y: number, 
    vx: number, 
    vy: number,
    originalX: number,
    originalY: number
  }[]>([])

  // 初始化物理状态（首次加载和重置时触发）
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    console.log('🔄 Initializing emoji...', { isMobile, shouldResetEmojis, scrollY: window.scrollY })
    
    // 桌面端：检查是否在顶部
    if (!isMobile) {
      const currentScrollY = window.scrollY
      if (shouldResetEmojis === 0 && currentScrollY > 10) {
        console.log('⏸️ Desktop: Page not at top, emoji initialization skipped')
        return
      }
    }
    
    // 手机端或桌面端在顶部：立即初始化
    const rect = document.querySelector('section')?.getBoundingClientRect()
    if (!rect) {
      console.log('⚠️ Section not found, will retry...')
      // 如果section还没准备好，延迟重试
      const retryTimer = setTimeout(() => {
        setShouldResetEmojis(prev => prev + 1)
      }, 100)
      return () => clearTimeout(retryTimer)
    }
    
    const initialPhysics = emojis.map((emoji) => {
      let x, y
      
      if (isMobile) {
        // 手机端：从屏幕顶端上方掉落
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        // 分散的水平分布，从屏幕左右两侧掉落
        x = 60 + Math.random() * (screenWidth - 120) // 在屏幕宽度范围内随机分布（留60px边距）
        // 从顶端-80px开始掉落，错开掉落时间
        y = screenHeight + 80 + Math.random() * 40 // 从-80px到-120px错开掉落
      } else {
        // 桌面端：原有位置
        x = emoji.left !== undefined 
          ? (rect.width * emoji.left / 100) 
          : (rect.width - rect.width * (emoji.right || 0) / 100)
        y = emoji.top !== undefined 
          ? (rect.height * emoji.top / 100) 
          : (rect.height - rect.height * (emoji.bottom || 0) / 100)
      }
      
      return {
        x,
        y,
        vx: isMobile ? (Math.random() - 0.5) * 1.5 : 0, // 极小的初始水平速度，便于堆成山形
        vy: isMobile ? -Math.random() * 1.0 - 0.3 : 0, // 更慢的初速度（-0.3到-1.3）
        originalX: x,
        originalY: y
      }
    })

    console.log('📍 Setting emojiPhysics...', { count: initialPhysics.length, isMobile, shouldResetEmojis })
    setEmojiPhysics(initialPhysics)
    console.log('✅ Emoji initialized!', isMobile ? 'Mobile mode' : 'Desktop mode', 'Reset count:', shouldResetEmojis)
  }, [shouldResetEmojis]) // 监听重置触发器

  // 监听滚动，只有真正触顶时才重置emoji
  useEffect(() => {
    let wasScrolledDown = false
    let isResetting = false // 标记是否正在重置中
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isMobile = window.innerWidth < 768
      
      // 记录是否曾经向下滚动过
      if (currentScrollY > 100) {
        wasScrolledDown = true
        isResetting = false // 离开顶部时重置标记
      }
      
      // 当接近顶部（scrollY < 50）时重置emoji（仅手机端）
      if (isMobile && wasScrolledDown && currentScrollY < 50 && !isResetting) {
        isResetting = true // 立即设置标记，防止重复触发
        console.log('🔝 Reached top! Clearing old emojis...')
        
        // 立即清空旧的emoji（让它们消失）
        setEmojiPhysics([])
        
        // 延迟后重新生成新的emoji从顶部掉落
        setTimeout(() => {
          console.log('🎆 Dropping new emojis!')
          setShouldResetEmojis(prev => prev + 1)
          wasScrolledDown = false
        }, 200) // 200ms延迟，给用户时间看到emoji消失
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 手机摇晃检测（仅移动端）
  useEffect(() => {
    let lastX: number | null = null
    let lastY: number | null = null
    let lastZ: number | null = null
    let lastTime = Date.now()

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity
      if (!acceleration || !acceleration.x || !acceleration.y || !acceleration.z) return

      const currentTime = Date.now()
      const timeDiff = currentTime - lastTime

      if (timeDiff > 100) { // 每100ms检测一次
        const x = acceleration.x
        const y = acceleration.y
        const z = acceleration.z

        if (lastX !== null && lastY !== null && lastZ !== null) {
          const deltaX = Math.abs(x - lastX)
          const deltaY = Math.abs(y - lastY)
          const deltaZ = Math.abs(z - lastZ)
          const totalShake = deltaX + deltaY + deltaZ

          // 如果检测到明显的摇晃（阈值可调整）
          if (totalShake > 15) {
            // 应用随机力到emoji
            setEmojiPhysics(prevPhysics => 
              prevPhysics.map(physics => ({
                ...physics,
                vx: physics.vx + (Math.random() - 0.5) * totalShake * 3,
                vy: physics.vy + (Math.random() - 0.5) * totalShake * 3
              }))
            )
          }
        }

        lastX = x
        lastY = y
        lastZ = z
        lastTime = currentTime
      }
    }

    // 检查是否支持 DeviceMotion API（主要是移动设备）
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      // 某些浏览器需要用户授权
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        // iOS 13+ 需要用户授权 - 静默请求，不显示按钮
        // 用户首次点击emoji时会触发授权
      } else {
        // Android 和旧版 iOS 直接监听
        window.addEventListener('devicemotion', handleDeviceMotion)
      }
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [])

  // 设备倾斜重力感应（仅移动端）
  useEffect(() => {
    let logCount = 0
    
    // 创建持久的监听器处理函数
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta || 0  // 前后倾斜
      const gamma = event.gamma || 0 // 左右倾斜
      
      // 转换倾斜角度为重力加速度
      const gravityX = Math.max(-1, Math.min(1, gamma / 45)) // 45度为最大倾斜
      const gravityY = Math.max(-0.5, Math.min(0.5, (beta - 90) / 90))
      
      setDeviceGravity({ x: gravityX, y: gravityY })
      
      // 每秒输出一次调试信息
      logCount++
      if (logCount % 30 === 0) { // 假设30fps
        console.log('🌐 Tilt:', { 
          gamma: gamma.toFixed(1), 
          beta: beta.toFixed(1), 
          gravityX: gravityX.toFixed(2), 
          gravityY: gravityY.toFixed(2) 
        })
      }
    }
    
    // 保存监听器引用
    orientationHandlerRef.current = handleDeviceOrientation
    
    // 检查是否支持 DeviceOrientation API
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        console.log('📱 iOS device - gravity will be enabled after first emoji touch')
      } else {
        // Android 和旧版 iOS 直接启用
        window.addEventListener('deviceorientation', handleDeviceOrientation)
        console.log('✅ DeviceOrientation active (Android/old iOS)')
      }
    }
    
    return () => {
      if (orientationHandlerRef.current) {
        window.removeEventListener('deviceorientation', orientationHandlerRef.current)
      }
    }
  }, [])

  // 物理引擎主循环
  useEffect(() => {
    let animationFrameId: number

    const physicsLoop = () => {
      const rect = document.querySelector('section')?.getBoundingClientRect()
      if (!rect) return

      setEmojiPhysics(prevPhysics => {
        // 如果没有emoji，返回空数组
        if (prevPhysics.length === 0) return prevPhysics
        
        const newPhysics = prevPhysics.map((physics, i) => {
          let { x, y, vx, vy, originalX, originalY } = physics
          const emoji = emojis[i]
          const isMobile = window.innerWidth < 768

          if (isMobile) {
            // 手机端：重力物理
            // 持续的重力加速度（向下为负，y减小）
            vy -= 1.2
            
            // 设备倾斜重力影响（增强效果）
            // gamma倾斜：向右倾斜时emoji向右移动
            vx += deviceGravity.x * 1.5 // 增强水平重力影响
            // beta倾斜：可选的垂直影响（前后倾斜时稍微影响下落速度）
            vy -= deviceGravity.y * 0.5 // 增强垂直重力影响
            
            // 地面碰撞（屏幕底部边界，紧贴底部）
            const ground = 20 // 距离底部20px
            if (y <= ground) {
              y = ground
              
              // 明显的弹性反弹效果
              if (Math.abs(vy) < 1) {
                // 速度很小时完全停止
                vy = 0
                vx *= 0.7 // 强摩擦力，快速停止
              } else {
                // 有明显弹性的反弹，逐次消减（50%弹性，更明显）
                vy = -vy * 0.5
                vx *= 0.88 // 摩擦力消减水平速度
              }
            }
            
            // 左右边界碰撞
            const screenWidth = window.innerWidth
            if (x < 50) {
              x = 50
              vx = Math.abs(vx) * 0.6
            } else if (x > screenWidth - 50) {
              x = screenWidth - 50
              vx = -Math.abs(vx) * 0.6
            }
          } else {
            // 桌面端：原有鼠标交互逻辑
            const mouseX = mousePos.x - rect.left
            const mouseY = mousePos.y - rect.top
            const dxToMouse = mouseX - x
            const dyToMouse = mouseY - y
            const distanceToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse)

            const controlRadius = 500
            const isInControl = isHovering && distanceToMouse < controlRadius

            if (isInControl) {
              if (distanceToMouse > 0 && distanceToMouse < 250) {
                const repelForce = (250 - distanceToMouse) / 250 * 1.5
                vx -= (dxToMouse / distanceToMouse) * repelForce
                vy -= (dyToMouse / distanceToMouse) * repelForce
              }
              
              if (distanceToMouse > 250 && distanceToMouse < controlRadius) {
                const attractForce = ((distanceToMouse - 250) / (controlRadius - 250)) * 0.2
                vx += (dxToMouse / distanceToMouse) * attractForce
                vy += (dyToMouse / distanceToMouse) * attractForce
              }
            } else {
              const dxToOriginal = originalX - x
              const dyToOriginal = originalY - y
              const distanceToOriginal = Math.sqrt(dxToOriginal * dxToOriginal + dyToOriginal * dyToOriginal)
              
              if (distanceToOriginal > 1) {
                const returnForce = Math.min(distanceToOriginal * 0.02, 0.5)
                vx += (dxToOriginal / distanceToOriginal) * returnForce
                vy += (dyToOriginal / distanceToOriginal) * returnForce
              }
            }
          }

          // emoji之间的碰撞排斥力（手机端和桌面端都需要）
          for (let j = 0; j < prevPhysics.length; j++) {
            if (i === j) continue

            const other = prevPhysics[j]
            const dx = x - other.x
            const dy = y - other.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = isMobile ? 45 : (emoji.radius + emojis[j].radius)

            if (distance < minDistance && distance > 0) {
              let collisionForce
              if (isMobile) {
                // 在空中时几乎无碰撞力，让emoji能自由落下
                if (y > 100 || other.y > 100) {
                  collisionForce = (minDistance - distance) / minDistance * 0.2 // 空中碰撞极弱
                } else {
                  // 只在都接近地面时才有强碰撞力
                  collisionForce = (minDistance - distance) / minDistance * 2.0
                }
              } else {
                collisionForce = (minDistance - distance) / minDistance * 0.6
              }
              
              const pushX = (dx / distance) * collisionForce
              const pushY = (dy / distance) * collisionForce
              
              vx += pushX
              vy += pushY
              
              // 地面附近的堆叠优化（只影响底层emoji）
              if (isMobile && y < 80 && other.y < 80) {
                // 在地面时，减少垂直推力，增强堆叠稳定性
                vy *= 0.5
                vx *= 0.9
              }
            }
          }

          // 阻力
          if (isMobile) {
            // 只在地面且速度几乎为0时才完全停止
            if (y <= 40 && Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3) {
              vx = 0
              vy = 0
            } else {
              // 极小的空气阻力，几乎不影响下落
              vx *= 0.997
              vy *= 0.999 // 垂直方向阻力极小，确保能落到底部
            }
          } else {
            vx *= 0.92
            vy *= 0.92
          }

          // 速度限制（手机端不限制垂直速度，确保能快速落到底部）
          if (isMobile) {
            // 只限制水平速度
            const maxSpeedX = 30
            if (Math.abs(vx) > maxSpeedX) {
              vx = (vx / Math.abs(vx)) * maxSpeedX
            }
            // 垂直速度不限制，让重力自然作用
          } else {
            const maxSpeed = 25
            const speed = Math.sqrt(vx * vx + vy * vy)
            if (speed > maxSpeed) {
              vx = (vx / speed) * maxSpeed
              vy = (vy / speed) * maxSpeed
            }
          }

          // 更新位置
          x += vx
          y += vy

          // 边界约束（仅桌面端，手机端已在重力物理中处理）
          if (!isMobile) {
            const padding = 50
            if (x < padding) {
              x = padding
              vx *= -0.5
            }
            if (x > rect.width - padding) {
              x = rect.width - padding
              vx *= -0.5
            }
            if (y < padding) {
              y = padding
              vy *= -0.5
            }
            if (y > rect.height - padding) {
              y = rect.height - padding
              vy *= -0.5
            }
          }

          return { x, y, vx, vy, originalX, originalY }
        })

        return newPhysics
      })

      animationFrameId = requestAnimationFrame(physicsLoop)
    }

    physicsLoop()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [mousePos, isHovering, deviceGravity])

  // 计算emoji的动态位置 - 物理引擎驱动
  const getEmojiStyle = (emoji: any, index: number) => {
    // 使用物理引擎位置
    if (emojiPhysics.length === 0) {
      return {
        transform: 'translate(0, 0) scale(1) rotate(0deg)',
        transition: 'none'
      }
    }

    const rect = document.querySelector('section')?.getBoundingClientRect()
    if (!rect) return {}

    const physics = emojiPhysics[index]
    const originalX = emoji.left !== undefined 
      ? (rect.width * emoji.left / 100) 
      : (rect.width - rect.width * (emoji.right || 0) / 100)
    const originalY = emoji.top !== undefined 
      ? (rect.height * emoji.top / 100) 
      : (rect.height - rect.height * (emoji.bottom || 0) / 100)

    const dx = physics.x - originalX
    const dy = physics.y - originalY
    
    // 计算速度大小（用于视觉反馈）
    const speed = Math.sqrt(physics.vx * physics.vx + physics.vy * physics.vy)
    
    // 计算到鼠标的距离
    const mouseX = mousePos.x - rect.left
    const mouseY = mousePos.y - rect.top
    const distanceToMouse = Math.sqrt(
      Math.pow(physics.x - mouseX, 2) + 
      Math.pow(physics.y - mouseY, 2)
    )
    
    // 默认微动效果（基于时间和索引）
    const time = Date.now() / 1000
    const floatY = Math.sin(time * 0.5 + index * 0.5) * 8 // 上下浮动8px
    const floatX = Math.cos(time * 0.3 + index * 0.7) * 5 // 左右微动5px
    
    // 旋转效果：基于速度方向 + 微旋转
    const floatRotate = Math.sin(time * 0.4 + index * 0.3) * 5 // 微旋转5度
    let rotation = floatRotate
    if (speed > 0.5) {
      rotation = Math.atan2(physics.vy, physics.vx) * 180 / Math.PI + (index % 2 === 0 ? 15 : -15)
    }
    
    // 缩放效果：基于速度和距离
    const speedScale = Math.min(speed / 10, 0.15)
    const distanceScale = isHovering && distanceToMouse < 200 
      ? Math.max(0, (200 - distanceToMouse) / 200) * 0.3 
      : 0
    const scale = 1 + speedScale + distanceScale
    
    // 透明度：默认呼吸 + 鼠标交互
    const breatheOpacity = 0.5 + Math.sin(time * 0.6 + index * 0.4) * 0.3 // 0.2-0.8
    const opacity = isHovering && distanceToMouse < 250 ? 0.9 : breatheOpacity

    return {
      transform: `translate(${dx + floatX}px, ${dy + floatY}px) scale(${scale}) rotate(${rotation}deg)`,
      opacity: opacity,
      transition: 'opacity 0.3s ease-out'
    }
  }

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Tech Influencer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "BoomFluence transformed our influencer marketing. We saw 300% increase in engagement and 150% boost in conversions within just 2 months.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Lifestyle Creator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The AI matching is incredible. It found us perfect influencers we never would have discovered manually. ROI improved by 400%.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Fashion Blogger",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Finally, a platform that understands our brand voice. The content quality and engagement rates are outstanding.",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "Tech Reviewer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "BoomFluence's automation saved us 20+ hours per week. Our team can focus on strategy instead of manual outreach.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Zhang",
      role: "Beauty Influencer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      content: "The analytics and reporting are game-changing. We can finally measure the true impact of our influencer campaigns.",
      rating: 5
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Gaming Creator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content: "From campaign setup to results tracking, everything is seamless. Our conversion rate increased by 250%.",
      rating: 5
    },
    {
      id: 7,
      name: "Maya Patel",
      role: "Fitness Influencer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      content: "The platform's AI understands our audience perfectly. Every campaign feels authentic and drives real engagement.",
      rating: 5
    },
    {
      id: 8,
      name: "James Wilson",
      role: "Travel Blogger",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      content: "BoomFluence helped us scale globally. We now work with brands across 15 countries seamlessly.",
      rating: 5
    },
    {
      id: 9,
      name: "Sophie Brown",
      role: "Food Creator",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      content: "The content guidelines and brand alignment features are incredible. Every post feels perfectly on-brand.",
      rating: 5
    }
  ]

  // 数字动画效果
  useEffect(() => {
    const animateNumber = (start: number, end: number, duration: number, callback: (value: number) => void) => {
      const startTime = performance.now()
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // 使用缓动函数
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const currentValue = start + (end - start) * easeOutCubic
        
        callback(Math.floor(currentValue))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }

    if (isVisible) {
      // 延迟启动动画
      const timer = setTimeout(() => {
        animateNumber(0, 50, 2000, (value) => {
          setAnimatedValues(prev => ({ ...prev, influencers: value }))
        })
        
        animateNumber(0, 22, 2000, (value) => {
          setAnimatedValues(prev => ({ ...prev, roi: value }))
        })
        
        animateNumber(0, 95, 2000, (value) => {
          setAnimatedValues(prev => ({ ...prev, automation: value }))
        })
        
        animateNumber(0, 4.9, 2000, (value) => {
          setAnimatedValues(prev => ({ ...prev, rating: value }))
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.querySelector('.stats-section')
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        setIsVisible(isInView)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始检查

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Title gradient animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleVisible(true)
    }, 500) // Start animation after 500ms

    return () => clearTimeout(timer)
  }, [])

  // 鼠标追踪和emoji实时互动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.querySelector('section')
      if (!heroSection) return
      
      const rect = heroSection.getBoundingClientRect()
      const isInHero = e.clientX >= rect.left && 
                       e.clientX <= rect.right && 
                       e.clientY >= rect.top && 
                       e.clientY <= rect.bottom
      
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsHovering(isInHero)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef1.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      scrollPosition += scrollSpeed
      scrollContainer.scrollLeft = scrollPosition

      // Reset scroll position when reaching the end
      if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollPosition = 0
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Random Emoji Background Decorations - 桌面端分散显示，手机端隐藏 */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-0">
        {emojis.map((emojiData, index) => {
          const positionStyle: React.CSSProperties = {}
          if (emojiData.top !== undefined) positionStyle.top = `${emojiData.top}%`
          if (emojiData.bottom !== undefined) positionStyle.bottom = `${emojiData.bottom}%`
          if (emojiData.left !== undefined) positionStyle.left = `${emojiData.left}%`
          if (emojiData.right !== undefined) positionStyle.right = `${emojiData.right}%`

          const dynamicStyle = getEmojiStyle(emojiData, index)
          const combinedStyle = { ...positionStyle, ...dynamicStyle }

          return (
            <div
              key={index}
              className={`absolute ${emojiData.size} cursor-pointer pointer-events-auto transition-transform duration-100 hover:scale-110`}
              style={{
                ...combinedStyle
              }}
              onClick={() => {
                // 桌面端点击产生范围冲击波效果
                if (emojiPhysics.length > 0) {
                  const clickedPhysics = emojiPhysics[index]
                  const impactRadius = 250 // 桌面端更大的冲击半径
                  
                  setEmojiPhysics(prev => 
                    prev.map((p, i) => {
                      if (i === index) {
                        // 被点击的emoji：强力反应
                        return {
                          ...p,
                          vy: p.vy + 30,
                          vx: p.vx + (Math.random() - 0.5) * 15
                        }
                      } else {
                        // 计算与点击位置的距离
                        const dx = p.x - clickedPhysics.x
                        const dy = p.y - clickedPhysics.y
                        const distance = Math.sqrt(dx * dx + dy * dy)
                        
                        if (distance < impactRadius) {
                          // 在冲击范围内，施加向外推的力
                          const impactStrength = (impactRadius - distance) / impactRadius
                          const pushForce = impactStrength * 20
                          
                          const dirX = distance > 0 ? dx / distance : (Math.random() - 0.5)
                          const dirY = distance > 0 ? dy / distance : (Math.random() - 0.5)
                          
                          return {
                            ...p,
                            vx: p.vx + dirX * pushForce,
                            vy: p.vy + dirY * pushForce + 8
                          }
                        }
                        return p
                      }
                    })
                  )
                }
              }}
            >
              {emojiData.emoji}
            </div>
          )
        })}
      </div>

      {/* Mobile: Emoji pile at bottom - 手机端底部emoji堆（重力堆叠） */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-screen z-40 pointer-events-none overflow-hidden">
        {emojis.map((emojiData, index) => {
          if (emojiPhysics.length === 0) return null
          
          const physics = emojiPhysics[index]
          if (!physics) return null
          
          // 确保emoji在可见范围内
          const clampedX = Math.max(40, Math.min(physics.x, window.innerWidth - 40))
          // 转换为top定位：screenHeight - y = 从顶部的距离
          const topPosition = Math.max(0, Math.min(window.innerHeight, window.innerHeight - physics.y))
          
          return (
            <div
              key={index}
              className={`absolute text-3xl cursor-pointer pointer-events-auto transition-all duration-100 ease-out ${
                draggedEmoji === index ? 'scale-110 brightness-125' : 'scale-100'
              }`}
              style={{
                left: `${clampedX}px`,
                top: `${topPosition}px`,
                transform: 'translate(-50%, 0)',
                willChange: 'left, top, transform',
                filter: draggedEmoji === index ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' : 'none'
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0]
                setDraggedEmoji(index)
                setDragStart({ x: touch.clientX, y: touch.clientY })
                
                // 触觉反馈（如果设备支持）
                if (navigator.vibrate) {
                  navigator.vibrate([10, 5, 10]) // 更强的震动模式
                }
                
                // 请求设备方向权限（iOS 13+）- 只请求一次
                if (!orientationPermissionGranted && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                  console.log('📱 Requesting DeviceOrientation permission...')
                  
                  const requestPermission = async () => {
                    try {
                      const response = await (DeviceOrientationEvent as any).requestPermission()
                      console.log('Response:', response)
                      
                      if (response === 'granted') {
                        setOrientationPermissionGranted(true)
                        
                        // 使用持久的监听器引用
                        if (orientationHandlerRef.current) {
                          window.addEventListener('deviceorientation', orientationHandlerRef.current)
                          console.log('✅ Gravity enabled! Tilt your phone to see emojis move!')
                          
                          // 震动反馈
                          if (navigator.vibrate) {
                            navigator.vibrate([50, 30, 50])
                          }
                          
                          // 测试输出当前重力
                          setTimeout(() => {
                            console.log('Current gravity:', deviceGravity)
                          }, 1000)
                        }
                      } else {
                        console.log('❌ Permission denied')
                      }
                    } catch (error) {
                      console.error('❌ Error:', error)
                    }
                  }
                  
                  requestPermission()
                }
                
                // 点击产生范围冲击波效果
                const clickedPhysics = emojiPhysics[index]
                const impactRadius = 200 // 冲击波半径（像素）
                
                setEmojiPhysics(prev => 
                  prev.map((p, i) => {
                    if (i === index) {
                      // 被点击的emoji：强力向上弹跳
                      return {
                        ...p,
                        vy: p.vy + 35, // 更强的向上冲击
                        vx: p.vx + (Math.random() - 0.5) * 12
                      }
                    } else {
                      // 计算与点击位置的距离
                      const dx = p.x - clickedPhysics.x
                      const dy = p.y - clickedPhysics.y
                      const distance = Math.sqrt(dx * dx + dy * dy)
                      
                      if (distance < impactRadius) {
                        // 在冲击范围内，施加向外推的力
                        const impactStrength = (impactRadius - distance) / impactRadius
                        const pushForce = impactStrength * 25 // 最大推力25
                        
                        // 归一化方向向量
                        const dirX = distance > 0 ? dx / distance : (Math.random() - 0.5)
                        const dirY = distance > 0 ? dy / distance : (Math.random() - 0.5)
                        
                        return {
                          ...p,
                          vx: p.vx + dirX * pushForce,
                          vy: p.vy + dirY * pushForce + 10 // 额外的向上推力
                        }
                      }
                      return p
                    }
                  })
                )
              }}
              onTouchMove={(e) => {
                if (draggedEmoji === index) {
                  e.preventDefault()
                  const touch = e.touches[0]
                  const deltaX = touch.clientX - dragStart.x
                  const deltaY = touch.clientY - dragStart.y
                  
                  // 非常响应的滑动跟随 + 强惯性
                  setEmojiPhysics(prev => 
                    prev.map((p, i) => 
                      i === index ? {
                        ...p,
                        x: p.x + deltaX * 1.2, // 更快的跟随
                        y: p.y - deltaY * 1.2, // 屏幕坐标Y向下，物理坐标Y向上
                        vx: deltaX * 1.0, // 更强的惯性
                        vy: -deltaY * 1.0
                      } : p
                    )
                  )
                  
                  setDragStart({ x: touch.clientX, y: touch.clientY })
                }
              }}
              onTouchEnd={() => {
                // 滑动结束时保持惯性，并给予额外的推力效果
                if (draggedEmoji === index) {
                  // 触觉反馈
                  if (navigator.vibrate) {
                    navigator.vibrate(15) // 稍长的震动15ms
                  }
                  
                  setEmojiPhysics(prev => 
                    prev.map((p, i) => 
                      i === index ? {
                        ...p,
                        // 保持当前速度，让惯性效果更明显
                        vx: p.vx * 1.3, // 额外增强30%
                        vy: p.vy * 1.3
                      } : p
                    )
                  )
                }
                setDraggedEmoji(null)
              }}
            >
              {emojiData.emoji}
            </div>
          )
        })}
      </div>
      
      <div className="container max-w-7xl pt-36 md:pt-40 pb-32 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScrollReveal delay={0}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 text-sm font-medium mb-10 -mt-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm relative overflow-hidden cursor-default">
              {/* 光泽扫过效果 */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                  animation: 'badge-shimmer 3s ease-in-out infinite'
                }}
              ></div>
              
              {/* 内容层 */}
              <Star className="h-4 w-4 mr-2 text-gray-400 relative z-10" />
              <span className="text-gray-300 relative z-10">
                {t('hero.badge')}
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-12 leading-tight tracking-tight font-poetsen text-center">
              {titleVisible ? (
                <span 
                  className="inline-block bg-gradient-to-r from-pink-500 via-pink-400 to-green-500 bg-clip-text text-transparent animate-gradient-x"
                  style={{
                    backgroundSize: '200% 200%',
                    paddingLeft: '0.5em',
                    paddingRight: '0.5em'
                  }}
                >
                  BoomFluence
                </span>
              ) : (
                <span className="opacity-0">BoomFluence</span>
              )}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            {/* Mission Statement */}
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 -mt-6 whitespace-pre-line ${language === 'zh' ? 'font-sans' : 'font-sf-pro'}`}>
              {t('hero.mission')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 md:gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetStartedClick}
              className="relative bg-white text-gray-900 font-medium py-2 px-4 md:px-6 rounded-lg transition-all duration-300 hover:bg-gray-50 inline-flex items-center group overflow-hidden"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">{t('hero.getStarted')}</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
            <a
              href="#services"
              className="relative bg-white/5 text-white font-medium py-2.5 px-5 md:px-7 rounded-lg transition-all duration-300 inline-flex items-center group overflow-hidden backdrop-blur-sm hover:bg-white/10"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)'
              }}
            >
              {/* hover时光泽扫过效果 */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  animation: 'badge-shimmer-hover 1.5s ease-in-out'
                }}
              ></div>
              
              <Sparkles className="mr-2 h-4 w-4 relative z-10" />
              <span className="relative z-10">{t('hero.learnMore')}</span>
            </a>
          </div>
          </ScrollReveal>
          
          {/* Testimonials Section */}
          <div className="relative mb-20 mt-20 overflow-hidden">
            {/* Left fade overlay - only covers testimonials area - 手机端隐藏 */}
            <div 
              className="hidden md:block absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{
                left: '0px',
                width: '100px',
                background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)'
              }}
            ></div>
            
            {/* Right fade overlay - only covers testimonials area - 手机端隐藏 */}
            <div 
              className="hidden md:block absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{
                right: '0px',
                width: '100px',
                background: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)'
              }}
            ></div>

            {/* Single row of scrolling testimonials */}
            <div 
              ref={scrollRef1}
              className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              } as React.CSSProperties}
              onMouseMove={(e) => {
                setMousePos({ x: e.clientX, y: e.clientY })
                setIsHovering(true)
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 w-80 bg-black rounded-2xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300 "
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div>
                      <p className="text-gray-200 text-sm leading-relaxed mb-4 text-left line-clamp-3">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center bg-gray-800">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'block';
                              }
                            }}
                          />
                          <div className="text-gray-400 text-xs font-medium hidden">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate for seamless loop */}
                {testimonials.slice(0, 3).map((testimonial) => (
                  <div
                    key={`duplicate-1-${testimonial.id}`}
                    className="flex-shrink-0 w-80 bg-black rounded-2xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300 "
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div>
                      <p className="text-gray-200 text-sm leading-relaxed mb-4 text-left line-clamp-3">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center bg-gray-800">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'block';
                              }
                            }}
                          />
                          <div className="text-gray-400 text-xs font-medium hidden">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          <ScrollReveal delay={200}>
            {/* Stats */}
            <div className="stats-section grid grid-cols-2 md:flex md:justify-center md:items-center gap-8 md:gap-16 max-w-5xl mx-auto -mt-6">
            <div className="text-center group md:min-w-[100px]">
              <div className="text-3xl font-bold text-white mb-2 transition-colors duration-300">
                {animatedValues.influencers}M+
              </div>
              <div className="text-gray-400 text-sm font-medium transition-colors duration-300">{t('hero.stats.influencers')}</div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-700 flex-shrink-0"></div>
            
            <div className="text-center group md:min-w-[100px]">
              <div className="text-3xl font-bold text-white mb-2 transition-colors duration-300">
                {animatedValues.roi}x
              </div>
              <div className="text-gray-400 text-sm font-medium transition-colors duration-300">ROI</div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-700 flex-shrink-0"></div>
            
            <div className="text-center group md:min-w-[100px]">
              <div className="text-3xl font-bold text-white mb-2 transition-colors duration-300">
                {animatedValues.automation}%
              </div>
              <div className="text-gray-400 text-sm font-medium transition-colors duration-300">{t('hero.stats.automation')}</div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-gray-700 flex-shrink-0"></div>
            
            <div className="text-center group md:min-w-[100px]">
              <div className="text-3xl font-bold text-white mb-2 transition-colors duration-300">
                {animatedValues.rating.toFixed(1)}
              </div>
              <div className="text-gray-400 text-sm font-medium transition-colors duration-300">Rating</div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Hero
