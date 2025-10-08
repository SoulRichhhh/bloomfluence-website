import React, { useState } from 'react'
import { CheckCircle, ArrowRight, Star } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

const Guarantee = () => {
  const { t } = useLanguage()
  const [emojis, setEmojis] = useState<Array<{ id: number; x: number; y: number; emoji: string; vx: number; vy: number }>>([])
  
  const marketingEmojis = ['🚀', '💰', '📈', '🌍', '💎', '✨', '🎯', '💪', '🔥', '⭐', '🌟', '💼', '📊', '🎉']
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // 随机生成emoji粒子
    if (Math.random() > 0.7) { // 30%概率生成
      const angle = Math.random() * Math.PI * 2 // 随机角度
      const velocity = 100 + Math.random() * 50 // 速度
      const newEmoji = {
        id: Date.now() + Math.random(),
        x,
        y,
        emoji: marketingEmojis[Math.floor(Math.random() * marketingEmojis.length)],
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 30 // 向上的偏移
      }
      setEmojis(prev => [...prev, newEmoji])
      
      // 1.8秒后移除emoji
      setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== newEmoji.id))
      }, 1800)
    }
  }
  const guarantees = [
    {
      icon: "💎",
      title: t('guarantee.card1.title'),
      description: t('guarantee.card1.desc'),
      features: [
        t('guarantee.card1.feature1'),
        t('guarantee.card1.feature2'),
        t('guarantee.card1.feature3'),
        t('guarantee.card1.feature4')
      ]
    },
    {
      icon: "🤝",
      title: t('guarantee.card2.title'),
      description: t('guarantee.card2.desc'),
      features: [
        t('guarantee.card2.feature1'),
        t('guarantee.card2.feature2'),
        t('guarantee.card2.feature3'),
        t('guarantee.card2.feature4')
      ]
    },
    {
      icon: "✨",
      title: t('guarantee.card3.title'),
      description: t('guarantee.card3.desc'),
      features: [
        t('guarantee.card3.feature1'),
        t('guarantee.card3.feature2'),
        t('guarantee.card3.feature3'),
        t('guarantee.card3.feature4')
      ]
    }
  ]

  return (
    <section className="pt-24 pb-40 bg-black text-white relative overflow-hidden">
      <div className="container max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium mb-6 rounded-full">
              <Star className="h-4 w-4" />
              {t('guarantee.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('guarantee.title1')}
              <br />
              {t('guarantee.title2')}<span className="text-gray-300">{t('guarantee.title3')}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('guarantee.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {guarantees.map((guarantee, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="group flex flex-col relative overflow-hidden guarantee-card-wrapper" style={{ animationDelay: `${index * 0.5}s` }}>
              {/* 边框光感层 */}
              <div className="absolute inset-0 rounded-2xl border-light-effect"></div>
              
              {/* 卡片主体 */}
              <div className="relative bg-black rounded-2xl p-8 border border-gray-800 group-hover:border-gray-600 transition-all duration-500 flex flex-col h-full">
                {/* Linear光感效果 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                
                {/* 轮换光泽动效 */}
                <div className="absolute inset-0 shine-effect rounded-2xl"></div>
              
              <div className="text-left flex-grow relative z-10">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors duration-500 relative">
                  <div className="text-white text-xl">
                    {guarantee.icon}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300">
                  {guarantee.title}
                </h3>
                
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                  {guarantee.description}
                </p>
              </div>
              
              <div className="space-y-2 mt-auto relative z-10">
                {guarantee.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <div id="contact" className="text-center mt-40 scroll-mt-[200px] md:scroll-mt-20">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal delay={0}>
              {/* Logo */}
              <div className="flex items-center justify-center mb-4 px-4">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poetsen text-white">
                  BoomFluence
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                {t('guarantee.cta.title1')}
                <span className="text-gray-300">{t('guarantee.cta.title2')}</span>
                {t('guarantee.cta.title3')}
              </h3>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-lg text-gray-300 mb-8">
                {t('guarantee.cta.desc')}
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={450}>
              <a
                href="#start"
                className="relative font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center group overflow-visible"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #10b981 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-x 3s ease infinite'
                }}
                onMouseMove={handleMouseMove}
              >
                {/* Emoji粒子效果 */}
                {emojis.map(emoji => (
                  <span
                    key={emoji.id}
                    className="absolute pointer-events-none text-2xl animate-emoji-burst"
                    style={{
                      left: `${emoji.x}px`,
                      top: `${emoji.y}px`,
                      '--tx': `${emoji.vx}px`,
                      '--ty': `${emoji.vy}px`
                    } as React.CSSProperties}
                  >
                    {emoji.emoji}
                  </span>
                ))}
                <span className="relative z-10 text-white">{t('guarantee.cta.button')}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guarantee
