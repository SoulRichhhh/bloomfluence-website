import { ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

// 数字滚动动画组件
const AnimatedNumber = ({ value, isActive }: { value: string, isActive: boolean }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isActive || hasAnimated.current) return

    // 提取数字
    const numbers = value.match(/\d+/g)
    if (!numbers) {
      setDisplayValue(value)
      return
    }

    const targetNumber = parseInt(numbers[0])
    const prefix = value.split(numbers[0])[0]
    const suffix = value.split(numbers[0])[1] || ''
    
    let start = 0
    const duration = 1500 // 动画持续时间
    const increment = targetNumber / (duration / 16) // 每帧增加的值
    
    const animate = () => {
      start += increment
      if (start < targetNumber) {
        setDisplayValue(`${prefix}${Math.floor(start)}${suffix}`)
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
        hasAnimated.current = true
      }
    }
    
    // 延迟启动动画
    setTimeout(() => {
      animate()
    }, 200)
  }, [isActive, value])

  return <span>{displayValue}</span>
}

interface CaseStudiesProps {
  onGetStartedClick?: () => void
}

const CaseStudies = ({ onGetStartedClick }: CaseStudiesProps) => {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (isHovering) return // 如果正在hover，暂停自动轮播

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % 3
        setAnimatedCards(prevSet => new Set(prevSet).add(next))
        return next
      })
    }, 3000) // 每3秒切换

    return () => clearInterval(interval)
  }, [isHovering])

  const caseStudies = [
    {
      title: "Fellou",
      image: "/api/placeholder/400/300",
      emoji: "👥",
      category: t('casestudies.fellou.category'),
      results: [
        { metric: t('casestudies.fellou.metric1'), value: t('casestudies.fellou.value1'), improvement: t('casestudies.fellou.improvement1') },
        { metric: t('casestudies.fellou.metric2'), value: t('casestudies.fellou.value2'), improvement: t('casestudies.fellou.improvement2') },
        { metric: t('casestudies.fellou.metric3'), value: t('casestudies.fellou.value3'), improvement: t('casestudies.fellou.improvement3') }
      ],
      description: t('casestudies.fellou.description'),
      contribution: t('casestudies.fellou.contribution')
    },
    {
      title: "Mootion", 
      image: "/api/placeholder/400/300",
      emoji: "🎬",
      category: t('casestudies.mootion.category'),
      results: [
        { metric: t('casestudies.mootion.metric1'), value: t('casestudies.mootion.value1'), improvement: t('casestudies.mootion.improvement1') },
        { metric: t('casestudies.mootion.metric2'), value: t('casestudies.mootion.value2'), improvement: t('casestudies.mootion.improvement2') },
        { metric: t('casestudies.mootion.metric3'), value: t('casestudies.mootion.value3'), improvement: t('casestudies.mootion.improvement3') }
      ],
      description: t('casestudies.mootion.description'),
      contribution: t('casestudies.mootion.contribution')
    },
    {
      title: "Readdy",
      image: "/api/placeholder/400/300",
      emoji: "🌐",
      category: t('casestudies.readdy.category'),
      results: [
        { metric: t('casestudies.readdy.metric1'), value: t('casestudies.readdy.value1'), improvement: t('casestudies.readdy.improvement1') },
        { metric: t('casestudies.readdy.metric2'), value: t('casestudies.readdy.value2'), improvement: t('casestudies.readdy.improvement2') },
        { metric: t('casestudies.readdy.metric3'), value: t('casestudies.readdy.value3'), improvement: t('casestudies.readdy.improvement3') }
      ],
      description: t('casestudies.readdy.description'),
      contribution: t('casestudies.readdy.contribution')
    }
  ]

  return (
    <section id="cases" className="py-20 bg-gray-50" style={{ scrollMarginTop: '100px' }}>
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('casestudies.title')}
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            {t('casestudies.subtitle')}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, index) => (
            <ScrollReveal 
              key={index} 
              delay={index * 150}
              onVisible={() => {
                // 滚动到卡片时立即触发动画
                setAnimatedCards(prev => new Set(prev).add(index))
              }}
            >
              <div 
                className={`bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 group case-study-card ${index === activeIndex && !isHovering ? 'active-card' : ''}`}
              style={{
                boxShadow: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                setIsHovering(true)
                setActiveIndex(index)
                setAnimatedCards(prev => new Set(prev).add(index))
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)'
              }}
              onMouseLeave={(e) => {
                setIsHovering(false)
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div 
                className="gradient-bg flex items-center justify-center relative animate-gradient-bg"
                style={{ 
                  aspectRatio: '16/9'
                }}
              >
                <div className="text-center px-6 md:px-8">
                  <div className="flex flex-col items-center justify-center space-y-2 md:space-y-3">
                    {/* Emoji */}
                    <div className="group-hover:scale-105 transition-all duration-300">
                      <span className="text-4xl md:text-5xl">{study.emoji}</span>
                    </div>
                    
                    {/* Brand Name */}
                    <div className="space-y-1.5 md:space-y-2">
                      <div 
                        className="text-2xl md:text-3xl font-bold transition-transform duration-300 font-poetsen brand-title leading-none"
                        style={{
                          letterSpacing: '-0.03em'
                        }}
                      >
                        {study.title}
                      </div>
                      
                      {/* Category */}
                      <p className="text-white/80 font-medium text-[10px] md:text-xs tracking-wider uppercase">
                        {study.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">{study.title}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded group-hover:bg-gray-200 group-hover:text-gray-700 transition-colors duration-300">
                    {t('casestudies.caseStudy')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {study.description}
                </p>
                
                <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed text-sm font-medium">
                    {study.contribution}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded group-hover:bg-gray-100 transition-colors duration-300">
                      <span className="text-gray-600 text-sm font-medium">{result.metric}</span>
                      <div className="text-right">
                        <span className="font-semibold text-gray-900 text-sm">
                          {result.value}
                        </span>
                        <span className="text-green-600 text-xs ml-2">
                          <AnimatedNumber 
                            value={result.improvement} 
                            isActive={animatedCards.has(index) || index === activeIndex} 
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={onGetStartedClick}
            className="bg-aura-900 hover:bg-aura-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg inline-flex items-center group"
          >
            {t('casestudies.cta')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
