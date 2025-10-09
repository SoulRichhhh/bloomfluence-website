import { useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

const WhoWePower = () => {
  const { t } = useLanguage()
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

  // 点击tab滚动到对应卡片
  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const cardWidth = container.offsetWidth
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    })
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
              {contentArray.map((item, itemIndex) => (
                <div 
                  key={item.id}
                  className="flex-shrink-0 w-full snap-center px-2"
                >
                  <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
                    {/* Tab导航 - 保持原有样式 */}
                    <div className="flex justify-center mb-8">
                      <div className="bg-white rounded-2xl p-2 inline-flex shadow-sm">
                        {contentArray.map((tab, tabIndex) => (
                          <button
                            key={tab.id}
                            onClick={() => scrollToIndex(tabIndex)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                              itemIndex === tabIndex
                                ? 'bg-gray-900 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {tab.title}
                          </button>
                        ))}
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default WhoWePower
