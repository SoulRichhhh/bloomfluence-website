import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollReveal from './ScrollReveal'

const Testimonials = () => {
  const { t } = useLanguage()
  const scrollRef1 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)
  const scrollRef3 = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const scrollContainers = [scrollRef1.current, scrollRef2.current, scrollRef3.current].filter(Boolean)
    if (scrollContainers.length === 0) return

    let animationId: number
    const scrollPositions = [0, 0, 0]
    const scrollSpeeds = [0.5, -0.3, 0.4] // Different speeds and directions

    const animate = () => {
      scrollContainers.forEach((container, index) => {
        if (container) {
          scrollPositions[index] += scrollSpeeds[index]
          container.scrollLeft = scrollPositions[index]

          // Reset scroll position when reaching the end
          if (scrollPositions[index] >= container.scrollWidth - container.clientWidth) {
            scrollPositions[index] = 0
          } else if (scrollPositions[index] < 0) {
            scrollPositions[index] = container.scrollWidth - container.clientWidth
          }
        }
      })

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
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Left fade overlay - 手机端隐藏 */}
      <div 
        className="hidden md:block absolute left-0 top-0 bottom-0 z-30 pointer-events-none"
        style={{
          left: '0px',
          width: '200px',
          background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)'
        }}
      ></div>
      
      {/* Right fade overlay - 手机端隐藏 */}
      <div 
        className="hidden md:block absolute right-0 top-0 bottom-0 z-30 pointer-events-none"
        style={{
          right: '0px',
          width: '200px',
          background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)'
        }}
      ></div>
      
      <div className="container max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white text-black text-sm font-medium mb-6 rounded-full">
              {t('testimonials.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Three rows of scrolling testimonials */}
        <div className="space-y-2">
          {/* Row 1 */}
          <div 
            ref={scrollRef1}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            } as React.CSSProperties}
          >
            {testimonials.slice(0, 3).map((testimonial) => (
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

          {/* Row 2 - Reverse direction */}
          <div 
            ref={scrollRef2}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            } as React.CSSProperties}
          >
            {testimonials.slice(3, 6).map((testimonial) => (
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
            {testimonials.slice(3, 6).map((testimonial) => (
              <div
                key={`duplicate-2-${testimonial.id}`}
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

          {/* Row 3 */}
          <div 
            ref={scrollRef3}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            } as React.CSSProperties}
          >
            {testimonials.slice(6, 9).map((testimonial) => (
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
            {testimonials.slice(6, 9).map((testimonial) => (
              <div
                key={`duplicate-3-${testimonial.id}`}
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
      </div>
    </section>
  )
}

export default Testimonials
