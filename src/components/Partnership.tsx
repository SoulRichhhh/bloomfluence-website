import { MessageCircle, Phone, Mail, CheckCircle, Star } from 'lucide-react'

const Partnership = () => {
  const idealPartners = [
    "海外AI工具产品负责人",
    "面临冷启动和增长挑战的创业者",
    "专注\"内容+社交裂变\"策略的增长负责人",
    "希望放大项目曝光度和品牌影响力的投资人"
  ]

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-20 bg-gradient-to-b from-boom-400 to-boom-600 rounded-full opacity-60 floating"></div>
      <div className="absolute top-40 right-20 w-20 h-2 bg-gradient-to-r from-boom-400 to-boom-600 rounded-full opacity-60 floating" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/2 w-2 h-16 bg-gradient-to-b from-boom-500 to-boom-700 rounded-full opacity-60 floating" style={{animationDelay: '4s'}}></div>
      
      <div className="container max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-boom-400 mb-8">
            We're Looking for Partners!
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join BoomFluence to help the best AI products be seen by the world
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Ideal Partners */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-boom-500 rounded-2xl flex items-center justify-center mr-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-boom-400">Ideal Partners</h3>
            </div>
            
            <div className="space-y-4">
              {idealPartners.map((partner, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-boom-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300 text-lg">{partner}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-boom-200/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-boom-500 rounded-2xl flex items-center justify-center mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-boom-400">Contact Us!</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-boom-400" />
                <a 
                  href="tel:13681642990" 
                  className="text-white text-xl hover:text-boom-400 transition-colors"
                >
                  13681642990
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-boom-400" />
                <a 
                  href="mailto:yang.zhou910825@gmail.com" 
                  className="text-white text-xl hover:text-boom-400 transition-colors"
                >
                  yang.zhou910825@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8 p-6 bg-boom-500/10 rounded-2xl border border-boom-500/20">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-boom-400 mr-2" />
                <h4 className="text-lg font-semibold text-boom-400">为什么选择BoomFluence？</h4>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• 专业的AI产品增长经验</li>
                <li>• 全球网红资源网络</li>
                <li>• 数据驱动的营销策略</li>
                <li>• 100%结果保证</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership
