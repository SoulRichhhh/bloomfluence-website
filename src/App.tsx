import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Features from './components/Features'
import Process from './components/Process'
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import WhoWePower from './components/WhoWePower'
import Guarantee from './components/Guarantee'
import Footer from './components/Footer'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Features />
          <CaseStudies />
          <Process />
          <Testimonials />
          <WhoWePower />
          <Partners />
          <Guarantee />
        </main>
        <Footer />
        
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-[60] p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="回到顶部"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </LanguageProvider>
  )
}

export default App