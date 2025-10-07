import { Minus, Twitter, Linkedin, Github, Mail } from 'lucide-react'
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
    <footer id="contact" className="bg-black text-white">
      <div className="container max-w-7xl py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <Minus className="h-4 w-4 text-black" />
            </div>
            <span className="ml-3 text-2xl font-poetsen text-white">
              BloomFluence
            </span>
          </div>

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
