import React, { useState } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const WhoWePower = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('startup')

  const tabs = [
    { id: 'startup', label: t('whowpower.startup') },
    { id: 'enterprise', label: t('whowpower.enterprise') },
    { id: 'agency', label: t('whowpower.agency') }
  ]

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

  return (
    <section id="whowpower" className="py-20 bg-white" style={{ scrollMarginTop: '240px' }}>
      <div className="container max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('whowpower.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              {t('whowpower.subtitle')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 rounded-2xl p-2 inline-flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                {content[activeTab as keyof typeof content].description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {content[activeTab as keyof typeof content].features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="bg-aura-900 hover:bg-aura-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg inline-flex items-center group"
              >
                {content[activeTab as keyof typeof content].cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWePower
