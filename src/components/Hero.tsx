import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
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

  // 初始化物理状态
  useEffect(() => {
    const rect = document.querySelector('section')?.getBoundingClientRect()
    if (!rect) return

    const initialPhysics = emojis.map((emoji) => {
      const x = emoji.left !== undefined 
        ? (rect.width * emoji.left / 100) 
        : (rect.width - rect.width * (emoji.right || 0) / 100)
      const y = emoji.top !== undefined 
        ? (rect.height * emoji.top / 100) 
        : (rect.height - rect.height * (emoji.bottom || 0) / 100)
      
      return {
        x,
        y,
        vx: 0,
        vy: 0,
        originalX: x,
        originalY: y
      }
    })

    setEmojiPhysics(initialPhysics)
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
        // iOS 13+ 需要用户授权
        const button = document.createElement('button')
        button.textContent = '允许摇晃交互'
        button.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px 20px;background:#ec4899;color:white;border:none;border-radius:8px;font-size:14px;'
        button.onclick = async () => {
          try {
            const response = await (DeviceMotionEvent as any).requestPermission()
            if (response === 'granted') {
              window.addEventListener('devicemotion', handleDeviceMotion)
              button.remove()
            }
          } catch (error) {
            console.error('Error requesting device motion permission:', error)
          }
        }
        // 只在移动设备上显示按钮
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          document.body.appendChild(button)
          // 3秒后自动隐藏按钮
          setTimeout(() => button.remove(), 3000)
        }
      } else {
        // Android 和旧版 iOS 直接监听
        window.addEventListener('devicemotion', handleDeviceMotion)
      }
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [])

  // 物理引擎主循环
  useEffect(() => {
    if (emojiPhysics.length === 0) return

    let animationFrameId: number

    const physicsLoop = () => {
      const rect = document.querySelector('section')?.getBoundingClientRect()
      if (!rect) return

      setEmojiPhysics(prevPhysics => {
        const newPhysics = prevPhysics.map((physics, i) => {
          let { x, y, vx, vy, originalX, originalY } = physics
          const emoji = emojis[i]

          // 鼠标相关计算
          const mouseX = mousePos.x - rect.left
          const mouseY = mousePos.y - rect.top
          const dxToMouse = mouseX - x
          const dyToMouse = mouseY - y
          const distanceToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse)

          // 控制范围：500px内受鼠标影响（增大范围）
          const controlRadius = 500
          const isInControl = isHovering && distanceToMouse < controlRadius

          if (isInControl) {
            // 鼠标驱赶力（推开emoji）- 增大推力和范围
            if (distanceToMouse > 0 && distanceToMouse < 250) {
              const repelForce = (250 - distanceToMouse) / 250 * 1.5
              vx -= (dxToMouse / distanceToMouse) * repelForce
              vy -= (dyToMouse / distanceToMouse) * repelForce
            }
            
            // 吸引力（在远处时轻微吸引）
            if (distanceToMouse > 250 && distanceToMouse < controlRadius) {
              const attractForce = ((distanceToMouse - 250) / (controlRadius - 250)) * 0.2
              vx += (dxToMouse / distanceToMouse) * attractForce
              vy += (dyToMouse / distanceToMouse) * attractForce
            }
          } else {
            // 脱离控制：回归原位
            const dxToOriginal = originalX - x
            const dyToOriginal = originalY - y
            const distanceToOriginal = Math.sqrt(dxToOriginal * dxToOriginal + dyToOriginal * dyToOriginal)
            
            if (distanceToOriginal > 1) {
              const returnForce = Math.min(distanceToOriginal * 0.02, 0.5)
              vx += (dxToOriginal / distanceToOriginal) * returnForce
              vy += (dyToOriginal / distanceToOriginal) * returnForce
            }
          }

          // emoji之间的碰撞排斥力
          for (let j = 0; j < prevPhysics.length; j++) {
            if (i === j) continue

            const other = prevPhysics[j]
            const dx = x - other.x
            const dy = y - other.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = emoji.radius + emojis[j].radius

            if (distance < minDistance && distance > 0) {
              // 碰撞排斥力
              const collisionForce = (minDistance - distance) / minDistance * 0.6
              vx += (dx / distance) * collisionForce
              vy += (dy / distance) * collisionForce
            }
          }

          // 阻力（空气阻力）
          const damping = 0.92
          vx *= damping
          vy *= damping

          // 速度限制（增大最大速度）
          const maxSpeed = 25
          const speed = Math.sqrt(vx * vx + vy * vy)
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed
            vy = (vy / speed) * maxSpeed
          }

          // 更新位置
          x += vx
          y += vy

          // 边界约束（柔性边界）
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
  }, [mousePos, isHovering, emojiPhysics.length])

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
      content: "BloomFluence transformed our influencer marketing. We saw 300% increase in engagement and 150% boost in conversions within just 2 months.",
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
      content: "BloomFluence's automation saved us 20+ hours per week. Our team can focus on strategy instead of manual outreach.",
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
      content: "BloomFluence helped us scale globally. We now work with brands across 15 countries seamlessly.",
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

      {/* Random Emoji Background Decorations - 避开中心文字区域，支持鼠标聚集 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
              className={`absolute ${emojiData.size} cursor-pointer pointer-events-auto`}
              style={{
                ...combinedStyle
              }}
            >
              {emojiData.emoji}
            </div>
          )
        })}
      </div>
      
      <div className="container max-w-7xl pt-40 pb-32 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 text-gray-300 text-sm font-medium mb-10 rounded-full border border-gray-700/50">
            <Star className="h-4 w-4 mr-2 text-gray-400" />
            <span>{t('hero.badge')}</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight tracking-tight font-poetsen">
            {titleVisible ? (
              <span 
                className="inline-block bg-gradient-to-r from-pink-500 via-pink-400 to-green-500 bg-clip-text text-transparent animate-gradient-x"
                style={{
                  backgroundSize: '200% 200%',
                  paddingLeft: '0.5em',
                  paddingRight: '0.5em'
                }}
              >
                BloomFluence
              </span>
            ) : (
              <span className="opacity-0">BloomFluence</span>
            )}
          </h1>
          
          {/* Mission Statement */}
          <h2 className={`text-2xl md:text-4xl font-bold text-white mb-4 -mt-6 whitespace-pre-line ${language === 'zh' ? 'font-sans' : 'font-sf-pro'}`}>
            {t('hero.mission')}
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 md:gap-4 justify-center items-center mb-12">
            <a
              href="#demo"
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
            </a>
            <a
              href="#services"
              className="relative bg-gray-900 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:bg-gray-800 inline-flex items-center group overflow-hidden"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Sparkles className="mr-2 h-4 w-4 relative z-10" />
              <span className="relative z-10">{t('hero.learnMore')}</span>
            </a>
          </div>
          
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
          
          {/* Stats */}
          <div className="stats-section relative grid grid-cols-2 md:flex md:justify-center md:items-center gap-8 md:gap-16 max-w-5xl mx-auto -mt-6">
            {/* Mobile: Vertical divider line (center) */}
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 -translate-x-1/2"></div>
            
            {/* Mobile: Horizontal divider line (center) */}
            <div className="md:hidden absolute top-1/2 left-0 right-0 h-px bg-gray-700 -translate-y-1/2"></div>
            
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
        </div>
      </div>
    </section>
  )
}

export default Hero
