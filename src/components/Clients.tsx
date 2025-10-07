import { Users, Globe, TrendingUp, CheckCircle } from 'lucide-react'

const Clients = () => {
  const clients = [
    {
      name: "Fellou",
      category: "AI角色社交与虚拟人应用",
      description: "全球Agentic Browser，拥有数百万用户",
      achievement: "BoomFluence帮助Fellou快速获得市场关注",
      icon: <Users className="h-8 w-8" />,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Mootion",
      category: "AI 3D人物动画生成工具",
      description: "AI视频平台，超过200万注册用户，40万+月活用户，在50+国家使用，生成超过1000万视频",
      achievement: "BoomFluence是Mootion全球增长的长期合作伙伴",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Readdy",
      category: "AI建站平台几分钟生成网站",
      description: "使用自然语言快速生成专业网站的AI平台，四个月内实现超过500万ARR",
      achievement: "BoomFluence支持其Product Hunt发布并持续助力全球增长",
      icon: <Globe className="h-8 w-8" />,
      color: "from-green-400 to-green-600"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-boom-500 mb-6">
            Our Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We partner with leading AI products worldwide to help them achieve rapid growth and market breakthroughs
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {clients.map((client, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${client.color} rounded-2xl flex items-center justify-center text-white mr-4`}>
                  {client.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{client.name}</h3>
                  <p className="text-boom-500 font-medium">{client.category}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {client.description}
              </p>
              
              <div className="bg-boom-50 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-boom-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-boom-700 font-medium">
                    {client.achievement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="bg-black rounded-3xl p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-boom-400 mb-8 text-center">
              BoomFluence 核心团队
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Founder */}
              <div className="bg-white rounded-2xl p-8 text-black">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-boom-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    TZ
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Tina Zhou</h3>
                    <p className="text-boom-500 font-medium">创始人</p>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  Oxford Mathematics背景，投资银行经验，对AI产品增长和市场进入策略有深刻洞察。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  作为AI博主和采访者，连接全球顶级AI创业者，为产品增长提供专业指导。
                </p>
              </div>

              {/* Team Highlights */}
              <div>
                <h3 className="text-2xl font-bold text-boom-400 mb-6">团队亮点</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-boom-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">专注AI网红，拥有数千个AI相关YouTube合作者数据库</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-boom-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">高质量交付团队，精准网红匹配，高合作效率</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-boom-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">服务多个领先AI工具经验，从0-1发布到常规campaign</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-boom-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">全球网红覆盖，包括欧美、中东、日韩、巴西等地区</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
