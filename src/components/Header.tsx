import { useState, useEffect } from 'react'
import { Menu, X, Minus, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Header = () => {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 50)
    }

    // 立即检查初始状态
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击页面其他位置关闭菜单
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const header = document.querySelector('header')
      
      // 如果点击的不是header内的元素，关闭菜单
      if (header && !header.contains(target)) {
        setIsMenuOpen(false)
      }
    }

    // 延迟添加监听器，避免与菜单按钮的点击事件冲突
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  const navigation = [
    { name: t('header.services'), href: '#services' },
    { name: t('header.cases'), href: '#cases' },
    { name: t('header.solutions'), href: '#solutions' },
    { name: t('header.clients'), href: '#whowpower' },
    { name: t('header.contact'), href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg shadow-black/10' 
        : 'bg-black/95 backdrop-blur-xl border-b border-gray-800 shadow-lg shadow-black/20'
    }`}>
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <div className={`w-8 h-8 flex items-center justify-center transition-colors ${
                isScrolled ? 'bg-gray-900 group-hover:bg-gray-800' : 'bg-white group-hover:bg-gray-200'
              }`}>
                <Minus className={`h-4 w-4 transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-black'
                }`} />
              </div>
              <span className={`ml-3 text-2xl font-poetsen transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                BloomFluence
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-300 relative group flex items-center ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-gray-900' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#login"
              className={`font-medium transition-colors duration-300 px-2.5 py-1.5 rounded-lg text-sm ${
                isScrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('header.login')}
            </a>
            
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className={`flex items-center space-x-2 py-1.5 px-3 rounded-lg transition-colors duration-300 font-medium text-sm ${
                isScrolled
                  ? 'text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-200'
                  : 'text-white/80 bg-white/10 hover:text-white hover:bg-white/20'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'EN' : '中'}</span>
            </button>
            
            <a
              href="#demo"
              className={`font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm ${
                isScrolled 
                  ? 'text-white bg-black hover:bg-gray-900' 
                  : 'text-gray-900 bg-white hover:bg-gray-50'
              }`}
            >
              <span className="font-semibold">{t('header.getStarted')}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden border-t backdrop-blur-xl transition-all duration-300 ${
            isScrolled 
              ? 'border-gray-200 bg-white/95' 
              : 'border-gray-800 bg-black/95'
          }`}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 font-medium transition-colors rounded-lg ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className={`pt-4 space-y-3 border-t ${
                isScrolled ? 'border-gray-200' : 'border-gray-800'
              }`}>
                <a
                  href="#login"
                  className={`block px-4 py-3 font-medium transition-colors rounded-lg ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('header.login')}
                </a>
                
                {/* Language Switcher for Mobile */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 font-medium transition-colors rounded-lg ${
                    isScrolled
                      ? 'text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-200'
                      : 'text-white/80 bg-white/10 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : '中'}</span>
                </button>
                
                <a
                  href="#demo"
                  className={`block px-4 py-3 font-medium text-center rounded-lg transition-all duration-300 text-sm ${
                    isScrolled 
                      ? 'text-white bg-black hover:bg-gray-900' 
                      : 'text-gray-900 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold">{t('header.getStarted')}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
