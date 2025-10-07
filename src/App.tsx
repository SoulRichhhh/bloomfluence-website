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
      </div>
    </LanguageProvider>
  )
}

export default App