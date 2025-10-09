import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  onVisible?: () => void
}

const ScrollReveal = ({ children, delay = 0, className = '', onVisible }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // 触发回调
            if (onVisible) {
              onVisible()
            }
            // 一旦显示就不再隐藏
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // 当10%的元素可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前触发动画
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [onVisible])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal

