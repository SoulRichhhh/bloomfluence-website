import { Twitter, Linkedin, Github, Mail } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  
  const navigation = [
    { name: t('header.services'), href: '#services' },
    { name: t('header.cases'), href: '#cases' },
    { name: t('header.solutions'), href: '#solutions' },
    { name: t('header.clients'), href: '#whowpower' },
    { name: t('header.contact'), href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: <Twitter className="h-5 w-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="h-5 w-5" /> },
    { name: 'GitHub', href: '#', icon: <Github className="h-5 w-5" /> },
    { name: 'Email', href: '#', icon: <Mail className="h-5 w-5" /> },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="container max-w-7xl py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <div className="w-8 h-8 flex items-center justify-center relative rounded-lg overflow-hidden">
              {/* 默认背景 */}
              <div className="absolute inset-0 bg-white transition-opacity duration-300 group-hover:opacity-0"></div>
              
              {/* hover渐变背景 */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FF45B1 0%, #3ABC68 100%)'
                }}
              ></div>
              
              {/* B字母 */}
              <svg width="13" height="19" viewBox="0 0 133 188" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path className="fill-black group-hover:fill-white transition-colors duration-300" d="M50.8757 188C40.7178 188 32.3676 187.311 25.8252 185.934C19.2828 184.729 14.0317 182.921 10.0718 180.511C6.28414 177.929 3.61553 174.744 2.06602 170.956C0.688673 167.169 0 162.692 0 157.528C0 155.978 0.0860842 153.826 0.258252 151.071C0.430421 148.145 0.688673 144.099 1.03301 138.934C1.37735 133.769 1.81777 127.141 2.32427 119.049C3.01294 110.786 3.87379 100.456 4.90679 88.0605C6.11197 72.7381 7.0589 60.6007 7.74757 51.6484C8.43625 42.696 8.95275 35.8095 9.29709 30.989C9.64142 25.9963 9.81359 22.5531 9.81359 20.6594C9.98576 18.5934 10.0718 16.8718 10.0718 15.4945C10.0718 12.7399 10.0718 10.5018 10.0718 8.78023C10.244 7.05862 10.4162 5.76741 10.5884 4.9066C10.9327 3.87363 11.3631 3.18499 11.8796 2.84067C12.5683 2.32418 13.5152 2.06594 14.7204 2.06594C24.8783 1.37729 33.4867 0.860813 40.5456 0.516495C47.7767 0.172167 54.0608 0 59.3981 0C72.4828 0 83.6738 1.11905 92.9709 3.35715C102.44 5.42308 110.102 8.43591 115.955 12.3956C121.809 16.3553 126.113 21.2619 128.868 27.1154C131.623 32.9689 133 39.5971 133 47C133 51.1319 132.57 55.4359 131.709 59.9121C130.848 64.2161 129.384 68.348 127.318 72.3077C125.252 76.2674 122.412 79.7967 118.796 82.8956C115.353 85.8224 110.962 87.9744 105.625 89.3517C115.611 92.4506 122.67 97.6154 126.802 104.846C130.934 111.905 133 120.341 133 130.154C133 138.073 131.709 145.562 129.126 152.621C126.544 159.507 122.067 165.619 115.697 170.956C109.327 176.121 100.891 180.253 90.3884 183.352C79.8861 186.451 66.7152 188 50.8757 188ZM65.5961 107.945C63.7023 107.945 61.378 108.117 58.6233 108.462C55.8686 108.634 53.0278 108.978 50.101 109.495L47.2602 151.588C53.4583 153.482 59.0537 154.429 64.0466 154.429C69.3838 154.429 73.688 153.654 76.9592 152.104C80.2304 150.555 82.7269 148.661 84.4485 146.423C86.3424 144.013 87.5476 141.43 88.0641 138.676C88.7528 135.749 89.0971 133.081 89.0971 130.67C89.0971 124.3 87.2893 118.963 83.6738 114.659C80.2304 110.183 74.2045 107.945 65.5961 107.945ZM54.7495 36.9286C54.4052 41.4048 54.0608 46.6557 53.7165 52.6813C53.5443 58.707 53.2 65.2491 52.6835 72.3077C58.1929 73.685 63.0997 74.3736 67.4039 74.3736C72.5689 74.3736 76.701 73.7711 79.8 72.5659C82.899 71.3608 85.3094 69.8114 87.0311 67.9176C88.9249 66.0238 90.1301 63.9579 90.6466 61.7198C91.3353 59.4817 91.6796 57.3297 91.6796 55.2638C91.6796 49.9268 89.8718 45.3645 86.2563 41.5769C82.8129 37.6172 76.7871 35.6374 68.1786 35.6374C66.2848 35.6374 64.1327 35.8095 61.7223 36.1539C59.4841 36.326 57.1599 36.5843 54.7495 36.9286Z"/>
              </svg>
            </div>
            <span className="ml-3 text-2xl font-poetsen text-white">
              BloomFluence
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex space-x-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container max-w-7xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}<span className="font-poetsen">BloomFluence</span>{t('footer.rights')}
            </div>
            <div className="text-gray-400 text-sm">
              {t('footer.made')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
