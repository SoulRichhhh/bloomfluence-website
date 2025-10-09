import { Zap, Target, BarChart3, Globe, Shield, Brain } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'
import { useState, useEffect } from 'react'

const Features = () => {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const features = [
    {
      title: t('features.ai.title'),
      description: t('features.ai.desc'),
      icon: Brain,
      color: "from-accent-400 to-accent-600"
    },
    {
      title: t('features.automation.title'),
      description: t('features.automation.desc'),
      icon: Zap,
      color: "from-aura-400 to-aura-600"
    },
    {
      title: t('features.targeting.title'),
      description: t('features.targeting.desc'),
      icon: Target,
      color: "from-accent-400 to-accent-600"
    },
    {
      title: t('features.analytics.title'),
      description: t('features.analytics.desc'),
      icon: BarChart3,
      color: "from-aura-400 to-aura-600"
    },
    {
      title: t('features.network.title'),
      description: t('features.network.desc'),
      icon: Globe,
      color: "from-accent-400 to-accent-600"
    },
    {
      title: t('features.safety.title'),
      description: t('features.safety.desc'),
      icon: Shield,
      color: "from-aura-400 to-aura-600"
    }
  ]

  // 自动轮播效果
  useEffect(() => {
    if (isHovering) return // 如果用户正在hover某个卡片，暂停自动轮播
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 3000) // 每3秒切换一次

    return () => clearInterval(interval)
  }, [isHovering, features.length])

  return (
    <section id="services" className="pt-32 pb-12 bg-gray-50" style={{ scrollMarginTop: '80px' }}>
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
            <br />
            <span className="text-gray-600">{t('features.subtitle')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('features.desc')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const isActive = index === activeIndex
            
            // 移动端2列：最后2个不显示底部线，偶数列不显示右侧线
            const isMobileLastRow = index >= features.length - 2
            const isMobileLastColumn = (index + 1) % 2 === 0
            
            // 桌面端3列：最后一行不显示底部线，第3列不显示右侧线
            const isDesktopLastRow = index >= features.length - (features.length % 3 === 0 ? 3 : features.length % 3)
            const isDesktopLastColumn = (index + 1) % 3 === 0
            
            return (
              <ScrollReveal key={index} delay={index * 100}>
                <div 
                  className={`relative p-8 group transition-all duration-500 ${
                    isActive ? 'bg-gray-50/30' : 'hover:bg-gray-50/30'
                  }`}
                  onMouseEnter={() => {
                    setIsHovering(true)
                    setActiveIndex(index)
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false)
                  }}
                >
                  {/* 十字分割线 - 移动端2列 */}
                  {!isMobileLastColumn && (
                    <div className="md:hidden absolute right-0 top-0 bottom-0 w-px bg-gray-300/40"></div>
                  )}
                  {!isMobileLastRow && (
                    <div className="md:hidden absolute left-0 right-0 bottom-0 h-px bg-gray-300/40"></div>
                  )}
                  
                  {/* 十字分割线 - 桌面端3列 */}
                  {!isDesktopLastColumn && (
                    <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gray-300/40"></div>
                  )}
                  {!isDesktopLastRow && (
                    <div className="hidden md:block absolute left-0 right-0 bottom-0 h-px bg-gray-300/40"></div>
                  )}
                  
                  <div className="text-center">
                    <div className={`w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 shadow-lg shadow-gray-900/20 relative overflow-hidden ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}>
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-pink-500 via-pink-400 to-green-500 transition-opacity duration-500 animate-gradient-x ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        style={{
                          backgroundSize: '200% 200%'
                        }}
                      ></div>
                      <IconComponent className="h-7 w-7 text-white relative z-10 transition-colors duration-500" />
                    </div>
                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-500 ${
                      isActive ? 'text-gray-700' : 'text-gray-900 group-hover:text-gray-700'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>


      </div>
    </section>
  )
}

export default Features
