import { useState, useRef, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

const WhoWePower = () => {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const content = {
    startup: {
      title: t('whowpower.startup'),
      description: t('whowpower.startup.desc'),
      features: [
        t('whowpower.startup.feature1'),
        t('whowpower.startup.feature2'),
        t('whowpower.startup.feature3'),
        t('whowpower.startup.feature4'),
        t('whowpower.startup.feature5'),
        t('whowpower.startup.feature6')
      ],
      cta: t('whowpower.cta.startup')
    },
    enterprise: {
      title: t('whowpower.enterprise'), 
      description: t('whowpower.enterprise.desc'),
      features: [
        t('whowpower.enterprise.feature1'),
        t('whowpower.enterprise.feature2'),
        t('whowpower.enterprise.feature3'),
        t('whowpower.enterprise.feature4'),
        t('whowpower.enterprise.feature5'),
        t('whowpower.enterprise.feature6')
      ],
      cta: t('whowpower.cta.enterprise')
    },
    agency: {
      title: t('whowpower.agency'),
      description: t('whowpower.agency.desc'),
      features: [
        t('whowpower.agency.feature1'),
        t('whowpower.agency.feature2'),
        t('whowpower.agency.feature3'),
        t('whowpower.agency.feature4'),
        t('whowpower.agency.feature5'),
        t('whowpower.agency.feature6')
      ],
      cta: t('whowpower.cta.agency')
    }
  }

  const contentArray = [
    { ...content.startup, id: 'startup' },
    { ...content.enterprise, id: 'enterprise' },
    { ...content.agency, id: 'agency' }
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
    <section id="whowpower" className="py-20 bg-white" style={{ scrollMarginTop: '240px' }}>
      <div className="container max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('whowpower.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {t('whowpower.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {/* 横向滑动卡片容器 */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {contentArray.map((item) => (
                <div 
                  key={item.id}
                  className="flex-shrink-0 w-full snap-center px-2"
                >
                  <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
                    {/* 标题标签 */}
                    <div className="flex justify-center mb-6">
                      <div className="bg-white rounded-xl px-6 py-2 shadow-sm">
                        <h3 className="text-lg font-semibold text-primary-600">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* 描述 */}
                    <div className="max-w-3xl mx-auto text-center">
                      <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                        {item.description}
                      </p>

                      {/* 特性列表 */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {item.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3 text-left">
                            <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 指示器圆点 */}
            <div className="flex justify-center gap-2 mt-6">
              {contentArray.map((_, index) => (
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default WhoWePower
