import React from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Process = () => {
  const { t } = useLanguage()
  const processes = [
    {
      title: t('process.title1'),
      description: t('process.desc1'),
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
      features: [
        t('process.feature5.1'),
        t('process.feature5.2'),
        t('process.feature5.3')
      ],
      stat: t('process.stat5'),
      statDescription: t('process.statDesc5')
    }
  ]

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="w-full">
        {processes.map((process, index) => (
          <React.Fragment key={index}>
            <div className={`${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'} w-full`}>
              <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-16 lg:py-20">
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
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-video flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                        <ArrowRight className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-600 font-medium text-sm md:text-base">Interactive Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default Process
