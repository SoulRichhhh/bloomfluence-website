import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
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
        : 'md:bg-black/95 bg-white/95 backdrop-blur-xl border-b md:border-gray-800 border-gray-200 shadow-lg md:shadow-black/20 shadow-black/10'
    }`}>
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <div className="w-8 h-8 flex items-center justify-center relative rounded-lg overflow-hidden">
                {/* 移动端：始终粉绿渐变动画 */}
                <div 
                  className="absolute inset-0 md:hidden"
                  style={{
                    background: 'linear-gradient(135deg, #FF45B1 0%, #3ABC68 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'logo-gradient-flow 3s ease infinite'
                  }}
                ></div>
                
                {/* 桌面端：默认背景层 - 未滚动渐变，滚动后深色 */}
                <div 
                  className="hidden md:block absolute inset-0 transition-all duration-300 group-hover:opacity-0"
                  style={{
                    background: isScrolled 
                      ? '#111827' // 滚动后深色
                      : 'linear-gradient(135deg, #FF45B1 0%, #3ABC68 100%)', // 未滚动时粉绿渐变
                    backgroundSize: isScrolled ? '100% 100%' : '200% 200%',
                    animation: isScrolled ? 'none' : 'logo-gradient-flow 3s ease infinite'
                  }}
                ></div>
                
                {/* 桌面端：Hover渐变背景层 - 带动画 */}
                <div 
                  className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #FF45B1 0%, #3ABC68 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'logo-gradient-flow 3s ease infinite'
                  }}
                ></div>
                
                {/* B字母 - 始终白色 */}
                <svg width="13" height="19" viewBox="0 0 133 188" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                  <path className="fill-white transition-colors duration-300" d="M50.8757 188C40.7178 188 32.3676 187.311 25.8252 185.934C19.2828 184.729 14.0317 182.921 10.0718 180.511C6.28414 177.929 3.61553 174.744 2.06602 170.956C0.688673 167.169 0 162.692 0 157.528C0 155.978 0.0860842 153.826 0.258252 151.071C0.430421 148.145 0.688673 144.099 1.03301 138.934C1.37735 133.769 1.81777 127.141 2.32427 119.049C3.01294 110.786 3.87379 100.456 4.90679 88.0605C6.11197 72.7381 7.0589 60.6007 7.74757 51.6484C8.43625 42.696 8.95275 35.8095 9.29709 30.989C9.64142 25.9963 9.81359 22.5531 9.81359 20.6594C9.98576 18.5934 10.0718 16.8718 10.0718 15.4945C10.0718 12.7399 10.0718 10.5018 10.0718 8.78023C10.244 7.05862 10.4162 5.76741 10.5884 4.9066C10.9327 3.87363 11.3631 3.18499 11.8796 2.84067C12.5683 2.32418 13.5152 2.06594 14.7204 2.06594C24.8783 1.37729 33.4867 0.860813 40.5456 0.516495C47.7767 0.172167 54.0608 0 59.3981 0C72.4828 0 83.6738 1.11905 92.9709 3.35715C102.44 5.42308 110.102 8.43591 115.955 12.3956C121.809 16.3553 126.113 21.2619 128.868 27.1154C131.623 32.9689 133 39.5971 133 47C133 51.1319 132.57 55.4359 131.709 59.9121C130.848 64.2161 129.384 68.348 127.318 72.3077C125.252 76.2674 122.412 79.7967 118.796 82.8956C115.353 85.8224 110.962 87.9744 105.625 89.3517C115.611 92.4506 122.67 97.6154 126.802 104.846C130.934 111.905 133 120.341 133 130.154C133 138.073 131.709 145.562 129.126 152.621C126.544 159.507 122.067 165.619 115.697 170.956C109.327 176.121 100.891 180.253 90.3884 183.352C79.8861 186.451 66.7152 188 50.8757 188ZM65.5961 107.945C63.7023 107.945 61.378 108.117 58.6233 108.462C55.8686 108.634 53.0278 108.978 50.101 109.495L47.2602 151.588C53.4583 153.482 59.0537 154.429 64.0466 154.429C69.3838 154.429 73.688 153.654 76.9592 152.104C80.2304 150.555 82.7269 148.661 84.4485 146.423C86.3424 144.013 87.5476 141.43 88.0641 138.676C88.7528 135.749 89.0971 133.081 89.0971 130.67C89.0971 124.3 87.2893 118.963 83.6738 114.659C80.2304 110.183 74.2045 107.945 65.5961 107.945ZM54.7495 36.9286C54.4052 41.4048 54.0608 46.6557 53.7165 52.6813C53.5443 58.707 53.2 65.2491 52.6835 72.3077C58.1929 73.685 63.0997 74.3736 67.4039 74.3736C72.5689 74.3736 76.701 73.7711 79.8 72.5659C82.899 71.3608 85.3094 69.8114 87.0311 67.9176C88.9249 66.0238 90.1301 63.9579 90.6466 61.7198C91.3353 59.4817 91.6796 57.3297 91.6796 55.2638C91.6796 49.9268 89.8718 45.3645 86.2563 41.5769C82.8129 37.6172 76.7871 35.6374 68.1786 35.6374C66.2848 35.6374 64.1327 35.8095 61.7223 36.1539C59.4841 36.326 57.1599 36.5843 54.7495 36.9286Z"/>
                </svg>
              </div>
              <span className={`ml-3 text-2xl font-poetsen transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'
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
              className="p-2 rounded-lg transition-colors duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t backdrop-blur-xl transition-all duration-300 border-gray-200 bg-white/95">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 font-medium transition-colors rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <a
                  href="#login"
                  className="block px-4 py-3 font-medium transition-colors rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  {t('header.login')}
                </a>
                
                {/* Language Switcher for Mobile */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 font-medium transition-colors rounded-lg text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-200"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : '中'}</span>
                </button>
                
                <a
                  href="#demo"
                  className="block px-4 py-3 font-medium text-center rounded-lg transition-all duration-300 text-sm text-white bg-black hover:bg-gray-900"
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
