import React, { useState, useRef, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

const Process = () => {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const processes = [
    {
      title: t('process.title1'),
      description: t('process.desc1'),
      image: '/images/One-click.jpg',
      emoji: '✨',
      imageText: 'Launch',
      features: [
        t('process.feature1.1'),
        t('process.feature1.2'), 
        t('process.feature1.3'),
        t('process.feature1.4')
      ],
      stat: t('process.stat1'),
      statDescription: t('process.statDesc1')
    },
    {
      title: t('process.title2'),
      description: t('process.desc2'),
      image: '/images/From-50M-influencers.jpg',
      emoji: '🎯',
      imageText: 'Discover',
      features: [
        t('process.feature2.1'),
        t('process.feature2.2'),
        t('process.feature2.3'),
        t('process.feature2.4')
      ],
      stat: t('process.stat2'),
      statDescription: t('process.statDesc2')
    },
    {
      title: t('process.title3'),
      description: t('process.desc3'),
      image: '/images/Creative-oversight.jpg',
      emoji: '⚡',
      imageText: 'Manage',
      features: [
        t('process.feature3.1'),
        t('process.feature3.2'), 
        t('process.feature3.3'),
        t('process.feature3.4')
      ],
      stat: t('process.stat3'),
      statDescription: t('process.statDesc3')
    },
    {
      title: t('process.title4'),
      description: t('process.desc4'),
      image: '/images/AI-reviews.jpg',
      emoji: '👥',
      imageText: 'Review',
      features: [
        t('process.feature4.1'),
        t('process.feature4.2'),
        t('process.feature4.3'),
        t('process.feature4.4')
      ],
      stat: t('process.stat4'),
      statDescription: t('process.statDesc4')
    },
    {
      title: t('process.title5'),
      description: t('process.desc5'),
      image: '/images/AI-negotiates.jpg',
      emoji: '📈',
      imageText: 'Optimize',
      features: [
        t('process.feature5.1'),
        t('process.feature5.2'),
        t('process.feature5.3')
      ],
      stat: t('process.stat5'),
      statDescription: t('process.statDesc5')
    }
  ]

  // 监听滚动位置更新指示器
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.offsetWidth
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(newIndex)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击指示器滚动到对应卡片
  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const cardWidth = container.offsetWidth
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    })
    setActiveIndex(index)
  }

  return (
    <section id="solutions" className="pt-6 pb-12 lg:py-24 bg-gray-50 lg:bg-white">
      {/* 桌面端：保持原有布局 */}
      <div className="hidden lg:block w-full">
        {processes.map((process, index) => (
          <React.Fragment key={index}>
            <ScrollReveal delay={0}>
              <div className={`${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'} w-full`}>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-20 lg:py-28">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {process.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                    {process.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                    {process.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div 
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #10b981 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-x 3s ease infinite'
                          }}
                        >
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {process.stat}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {process.statDescription}
                    </p>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lg relative bg-gray-100 group">
                    <ScrollReveal delay={200}>
                      <img 
                        src={process.image} 
                        alt={process.title}
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </ScrollReveal>
                    {/* Emoji覆盖层 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      {/* 方形白色背景 */}
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">{process.emoji}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
          </React.Fragment>
        ))}
      </div>

      {/* 手机端：横向滑动卡片 */}
      <div className="lg:hidden">
        {/* 横向滚动容器 */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {processes.map((process, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-full snap-center px-4 py-4"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                {/* 图片 */}
                <div className="relative bg-gray-100 aspect-video overflow-hidden">
                  <ScrollReveal delay={100}>
                    <img 
                      src={process.image} 
                      alt={process.title}
                      className="w-full h-full object-cover"
                    />
                  </ScrollReveal>
                  {/* Emoji覆盖层 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{process.emoji}</span>
                    </div>
                  </div>
                </div>

                {/* 内容 */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {process.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {process.description}
                  </p>
                  
                  {/* 特性列表 */}
                  <div className="space-y-2 mb-6">
                    {process.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2">
                        <div 
                          className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #10b981 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-x 3s ease infinite'
                          }}
                        >
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* 统计数据 */}
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {process.stat}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {process.statDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 指示器圆点 */}
        <div className="flex justify-center gap-2 mt-3">
          {processes.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? 'w-8 h-2 bg-gray-900' 
                  : 'w-2 h-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
