import { CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Partners = () => {
  const { t } = useLanguage()
  const partners = [
    { name: 'Product Hunt', logo: 'PH', featured: true },
    { name: 'Roboneo', logo: 'R', featured: true },
    { name: 'Shakker', logo: 'S', featured: true },
    { name: 'Roleza', logo: 'R', featured: false },
    { name: 'Trae', logo: 'T', featured: false },
    { name: 'Aippt', logo: 'A', featured: true },
    { name: 'Pageon', logo: 'P', featured: false },
    { name: 'Mootion', logo: 'M', featured: false },
    { name: 'Onlyoffice', logo: 'O', featured: false },
    { name: 'Vivago', logo: 'V', featured: true },
    { name: 'Meta', logo: 'M', featured: true },
    { name: 'Qacdora', logo: 'Q', featured: true },
    { name: 'Vizard', logo: 'V', featured: true },
    { name: 'Shopme', logo: 'S', featured: false },
    { name: 'Myll', logo: 'M', featured: false },
    { name: 'Auro', logo: 'A', featured: false },
    { name: 'Startglobal', logo: 'S', featured: false },
    { name: 'Clawlab', logo: 'C', featured: true },
    { name: 'Lyfefuel', logo: 'L', featured: false },
    { name: 'Laipic', logo: 'L', featured: false },
    { name: 'Puroxy', logo: 'P', featured: true },
    { name: 'Fantasia', logo: 'F', featured: true },
  ]

  return (
    <section id="clients" className="pt-0 pb-20 bg-white overflow-hidden">
      <div className="container max-w-7xl mb-8">
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">
            {t('partners.title')}
          </h2>
        </div>
      </div>
      
      {/* Partners Marquee - 单行轮动 */}
      <div className="relative w-full">
        {/* 左侧渐变蒙层 */}
        <div className="absolute left-0 top-0 bottom-0 w-48 md:w-56 lg:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" style={{ 
          left: '0',
          paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2))'
        }}></div>
        {/* 右侧渐变蒙层 */}
        <div className="absolute right-0 top-0 bottom-0 w-48 md:w-56 lg:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" style={{ 
          right: '0',
          paddingRight: 'max(1rem, calc((100vw - 80rem) / 2))'
        }}></div>
        
        <div className="flex animate-marquee hover:pause space-x-8" style={{ width: 'max-content' }}>
          {/* 第一组 */}
          {partners.map((partner, index) => (
            <div
              key={`partner-1-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-aura-50 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-aura-100 to-aura-200 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-aura-700 font-bold text-lg group-hover:text-aura-900">
                    {partner.logo}
                  </span>
                </div>
                {partner.featured && (
                  <div 
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #10b981 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-x 3s ease infinite'
                    }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-aura-600 font-medium text-center whitespace-nowrap">{partner.name}</p>
            </div>
          ))}
          {/* 第二组 - 用于无缝循环 */}
          {partners.map((partner, index) => (
            <div
              key={`partner-2-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-aura-50 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-aura-100 to-aura-200 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-aura-700 font-bold text-lg group-hover:text-aura-900">
                    {partner.logo}
                  </span>
                </div>
                {partner.featured && (
                  <div 
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #10b981 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-x 3s ease infinite'
                    }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-aura-600 font-medium text-center whitespace-nowrap">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
