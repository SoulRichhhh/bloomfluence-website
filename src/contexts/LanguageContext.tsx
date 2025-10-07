import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    'header.services': 'Services',
    'header.cases': 'Cases',
    'header.solutions': 'Solutions',
    'header.clients': 'Clients',
    'header.contact': 'Contact Us',
    'header.features': 'Features',
    'header.pricing': 'Pricing',
    'header.partners': 'Partners',
    'header.caseStudies': 'Case Studies',
    'header.login': 'Sign in',
    'header.getStarted': 'Get Started',
    
    // Hero
    'hero.badge': 'AI Influencer Marketing Platform',
    'hero.mission': 'Global Influence for Your AI Products',
    'hero.subtitle': 'We specialize in AI tool influencer marketing, partnering with high-potential AI products to create viral hits and achieve global growth.',
    'hero.getStarted': 'Get Started',
    'hero.learnMore': 'Learn More',
    'hero.startCampaign': 'Start a Campaign',
    'hero.stats.influencers': 'Influencers',
    'hero.stats.roi': 'Average ROI',
    'hero.stats.automation': 'Automation',
    'hero.stats.rating': 'Client Rating',
    
    // Process
    'process.title1': 'One click to launch an expert-level campaign',
    'process.desc1': 'Simply paste your website URL - BloomFluence delivers a campaign that\'s launch-ready: precise targeting and core selling points, platform selection, geographic reach, and budget plan. All in under a minute, with no manual input.',
    'process.feature1.1': 'Market positioning & audience profiling',
    'process.feature1.2': 'Core value & messaging framework',
    'process.feature1.3': 'Channel & region strategy',
    'process.feature1.4': 'Budget & timeline optimization',
    'process.stat1': '20x faster',
    'process.statDesc1': 'Takes just 5 minutes to generate a full brand strategy vs. 1–2 days manually.',
    
    'process.title2': 'From 50M+ influencers, AI identifies the ones who truly match your brand',
    'process.desc2': 'BloomFluence\'s influencer matching engine analyzes 237+ behavioral signals with LLMs trained on millions of successful brand-influencer collaborations, adapting to real-time trends and audience data to deliver precise, ROI-driven recommendations.',
    'process.feature2.1': '237+ dimensions behavioral analysis',
    'process.feature2.2': 'Brand-aligned audience matching',
    'process.feature2.3': 'LLM-powered fit prediction & ROI scoring',
    'process.feature2.4': 'Social insights across all major platforms',
    'process.stat2': '100,000× wider reach',
    'process.statDesc2': 'A human team can review and match about 500 influencers per day; BloomFluence scanned 50M+ and matched us with perfectly aligned influencers in just hour.',
    
    'process.title3': 'AI negotiates the best price and terms — then delivers ready-to-launch influencers',
    'process.desc3': 'BloomFluence automates the full workflow—from initial outreach to best-price negotiation and secured partnerships and contract signing—so you move faster with zero manual effort.',
    'process.feature3.1': 'Automatic outreach',
    'process.feature3.2': 'Price negotiation',
    'process.feature3.3': 'Collaboration established',
    'process.feature3.4': 'Signing contract',
    'process.stat3': '5-10x efficiency',
    'process.statDesc3': 'Instead of spending weeks chasing and negotiating with influencers, BloomFluence delivered a ready-to-go roster of fully aligned, contract-signed influencers in just days.',
    
    'process.title4': 'Creative oversight at the highest standard. Guaranteed final results.',
    'process.desc4': 'BloomFluence ensures influencers follow your brand vision—every step from script to final video delivery is monitored and optimized for quality, consistency, and brand safety.',
    'process.feature4.1': 'Brand guidelines submission',
    'process.feature4.2': 'Script alignment',
    'process.feature4.3': 'Multi-round revisions',
    'process.feature4.4': 'Guaranteed publishment',
    'process.stat4': '100% guaranteed',
    'process.statDesc4': 'BloomFluence\'s process oversight kept every influencer aligned, enabling rapid production of consistent, high-quality contents at scale.',
    
    'process.title5': 'AI reviews data and optimizes every campaign for better results',
    'process.desc5': 'Track every influencer\'s performance with precision. BloomFluence automatically analyzes real-time metrics and campaign outcomes—surfacing ROI insights, identifying top performers, and continuously optimizing your strategy.',
    'process.feature5.1': 'Influencer-level breakdown',
    'process.feature5.2': 'Key metrics tracked',
    'process.feature5.3': 'Real-time optimization',
    'process.stat5': '22x conversion rate',
    'process.statDesc5': 'With BloomFluence, our conversion rate hit 22.19%—far above the 1–3% we normally see in our industry.',
    
    // Who We Power
    'whowpower.title': 'Who We Power',
    'whowpower.subtitle': 'From first campaign to global rollout — we power influencer marketing for startups, enterprises, and agencies alike.',
    'whowpower.startup': 'Startup',
    'whowpower.enterprise': 'Enterprise',
    'whowpower.agency': 'Agency',
    'whowpower.startup.desc': 'Skip the hiring and long ramp-up. BloomFluence gets your campaigns live in hours, tapping into 50M+ influencers worldwide with smart pricing and fully automated execution.',
    'whowpower.enterprise.desc': 'Scale your influencer marketing across multiple brands and regions with enterprise-grade security, compliance, and dedicated support.',
    'whowpower.agency.desc': 'Manage influencer campaigns for multiple clients with white-label solutions, advanced reporting, and team collaboration tools.',
    'whowpower.cta.startup': 'Start for free',
    'whowpower.cta.enterprise': 'Contact sales',
    'whowpower.cta.agency': 'Book a demo',
    // Startup features
    'whowpower.startup.feature1': 'Quick campaign setup in under 5 minutes',
    'whowpower.startup.feature2': 'Access to 50M+ verified influencers',
    'whowpower.startup.feature3': 'AI-powered pricing optimization',
    'whowpower.startup.feature4': 'Automated campaign management',
    'whowpower.startup.feature5': 'Real-time performance tracking',
    'whowpower.startup.feature6': 'No long-term contracts required',
    // Enterprise features
    'whowpower.enterprise.feature1': 'Multi-brand campaign management',
    'whowpower.enterprise.feature2': 'Enterprise security & compliance',
    'whowpower.enterprise.feature3': 'Dedicated account manager',
    'whowpower.enterprise.feature4': 'Custom reporting & analytics',
    'whowpower.enterprise.feature5': 'API integration capabilities',
    'whowpower.enterprise.feature6': 'Priority support & SLA',
    // Agency features
    'whowpower.agency.feature1': 'White-label platform access',
    'whowpower.agency.feature2': 'Multi-client management',
    'whowpower.agency.feature3': 'Team collaboration tools',
    'whowpower.agency.feature4': 'Advanced reporting suite',
    'whowpower.agency.feature5': 'Client portal access',
    'whowpower.agency.feature6': 'Revenue sharing options',
    
    // Features
    'features.title': 'All the features you need',
    'features.subtitle': 'to scale your growth',
    'features.desc': 'A comprehensive platform designed for modern influencer marketing at scale, empowering your brand to grow rapidly.',
    'features.ai.title': 'AI Smart Matching',
    'features.ai.desc': 'Advanced algorithms analyze 237+ behavioral signals to match you with the perfect influencer partners.',
    'features.automation.title': 'Marketing Automation',
    'features.automation.desc': 'Launch campaigns in minutes, with AI handling outreach, negotiation, and performance tracking.',
    'features.targeting.title': 'Precise Targeting',
    'features.targeting.desc': 'Target specific demographics, interests, and behaviors across 140+ social platforms.',
    'features.analytics.title': 'Real-time Analytics',
    'features.analytics.desc': 'Monitor campaign performance with detailed analytics, A/B testing, and automatic optimization.',
    'features.network.title': 'Global Network',
    'features.network.desc': 'Connect with 50M+ verified influencers globally, covering all major platforms and regions.',
    'features.safety.title': 'Brand Safety',
    'features.safety.desc': 'Every collaboration is protected by legal contracts, content approval processes, and fraud detection.',
    
    // Partners
    'partners.title': 'Trusted by the World\'s Leading AI-Native Organizations',
    
    // Testimonials
    'testimonials.badge': 'Loved by influencers worldwide',
    'testimonials.title': 'What our influencers say',
    'testimonials.subtitle': 'Join thousands of successful influencers who\'ve grown their reach with BloomFluence',
    
    // Case Studies
    'casestudies.title': 'Proven wins with the leading AI-native teams',
    'casestudies.subtitle': 'Success stories from AI-first innovators turning intelligence, precision, and efficiency into real, measurable results.',
    'casestudies.cta': 'Start for free',
    'casestudies.caseStudy': 'Case study',
    // Fellou
    'casestudies.fellou.category': 'AI Character Social & Virtual Human App',
    'casestudies.fellou.description': 'Fellou is a global Agentic Browser with powerful AI capabilities, currently serving millions of users. Through AI-driven character socialization and virtual human technology, it provides immersive interactive experiences, making AI characters an integral part of users\' daily social lives.',
    'casestudies.fellou.contribution': 'BloomFluence helped Fellou achieve rapid user base growth and effective global market expansion through precise AI influencer matching and content strategy.',
    'casestudies.fellou.metric1': 'User Growth',
    'casestudies.fellou.value1': 'Millions',
    'casestudies.fellou.improvement1': '+200%',
    'casestudies.fellou.metric2': 'Global Coverage',
    'casestudies.fellou.value2': '50+ Countries',
    'casestudies.fellou.improvement2': '+300%',
    'casestudies.fellou.metric3': 'User Engagement',
    'casestudies.fellou.value3': '85%',
    'casestudies.fellou.improvement3': '+45%',
    // Mootion
    'casestudies.mootion.category': 'AI 3D Character Animation Generator',
    'casestudies.mootion.description': 'Mootion is an easy-to-use AI video platform focusing on 3D animation generation. Used in over 50 countries with 2M+ registered users and 400K+ monthly active users, generating over 10M video content pieces, becoming a leading global AI animation creation tool.',
    'casestudies.mootion.contribution': 'BloomFluence helped Mootion establish strong brand influence and user base in the competitive 3D animation market through professional AI tool promotion strategies.',
    'casestudies.mootion.metric1': 'Registered Users',
    'casestudies.mootion.value1': '2M+',
    'casestudies.mootion.improvement1': '+150%',
    'casestudies.mootion.metric2': 'Monthly Active Users',
    'casestudies.mootion.value2': '400K+',
    'casestudies.mootion.improvement2': '+120%',
    'casestudies.mootion.metric3': 'Video Content',
    'casestudies.mootion.value3': '10M+',
    'casestudies.mootion.improvement3': '+400%',
    // Readdy
    'casestudies.readdy.category': 'AI Website Builder - Generate Sites in Minutes',
    'casestudies.readdy.description': 'Readdy.ai is an AI-driven website building platform that enables users to quickly generate professional websites without design or programming experience. Achieved over $5M ARR in 4 months, demonstrating the huge market potential of AI website building tools and providing efficient digital solutions for SMBs.',
    'casestudies.readdy.contribution': 'BloomFluence helped Readdy.ai establish strong market awareness and user trust in a short period through precise B2B influencer marketing strategies.',
    'casestudies.readdy.metric1': 'ARR Growth',
    'casestudies.readdy.value1': '$5M',
    'casestudies.readdy.improvement1': '+500%',
    'casestudies.readdy.metric2': 'Site Build Time',
    'casestudies.readdy.value2': '5 Minutes',
    'casestudies.readdy.improvement2': '-95%',
    'casestudies.readdy.metric3': 'User Satisfaction',
    'casestudies.readdy.value3': '92%',
    'casestudies.readdy.improvement3': '+25%',
    
    // Guarantee
    'guarantee.badge': '100% Guarantee',
    'guarantee.title1': 'Your growth',
    'guarantee.title2': 'backed by ',
    'guarantee.title3': '100% guarantee',
    'guarantee.subtitle': 'Ready to build something amazing? We guarantee your success with transparent, secure results.',
    'guarantee.card1.title': 'Pay only for results',
    'guarantee.card1.desc': 'Guaranteed 100% refund if deliverables aren\'t met.',
    'guarantee.card1.feature1': 'Performance-based pricing',
    'guarantee.card1.feature2': 'No upfront costs',
    'guarantee.card1.feature3': '100% money-back guarantee',
    'guarantee.card1.feature4': 'Transparent reporting',
    'guarantee.card2.title': 'Dual-Sided contract protection',
    'guarantee.card2.desc': 'Every collaboration is secured by a legally binding contract.',
    'guarantee.card2.feature1': 'Legal contract protection',
    'guarantee.card2.feature2': 'Clear terms & conditions',
    'guarantee.card2.feature3': 'Dispute resolution process',
    'guarantee.card2.feature4': 'Secure payment handling',
    'guarantee.card3.title': 'Verified real traffic',
    'guarantee.card3.desc': 'All traffic and engagement are authenticated and fraud-free.',
    'guarantee.card3.feature1': 'Fraud detection system',
    'guarantee.card3.feature2': 'Real engagement verification',
    'guarantee.card3.feature3': 'Audit trail for all metrics',
    'guarantee.card3.feature4': 'Third-party validation',
    'guarantee.cta.title1': 'Ready to build something ',
    'guarantee.cta.title2': 'AMAZING',
    'guarantee.cta.title3': '?',
    'guarantee.cta.desc': 'Join thousands of brands already growing with BloomFluence.',
    'guarantee.cta.button': 'Start Building',
    
    // Footer
    'footer.desc': 'The modern platform for influencer marketing. Build, launch, and scale your campaigns with confidence.',
    'footer.navigation': 'Navigation',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.docs': 'Documentation',
    'footer.help': 'Help Center',
    'footer.community': 'Community',
    'footer.status': 'Status',
    'footer.copyright': '© 2024 ',
    'footer.rights': '. All rights reserved.',
    'footer.made': 'Made with 🩷 for creators',
  },
  zh: {
    // Header
    'header.services': '服务',
    'header.cases': '案例',
    'header.solutions': '解决方案',
    'header.clients': '客户',
    'header.contact': '联系我们',
    'header.features': '功能',
    'header.pricing': '定价',
    'header.partners': '合作伙伴',
    'header.caseStudies': '案例研究',
    'header.login': '登录',
    'header.getStarted': '开始使用',
    
    // Hero
    'hero.badge': 'AI网红营销平台',
    'hero.mission': '帮助最棒的AI产品被世界看见',
    'hero.subtitle': '我们专注于AI工具网红营销，与高潜力AI产品合作，打造爆款并实现全球增长。',
    'hero.getStarted': '立即开始',
    'hero.learnMore': '了解更多',
    'hero.startCampaign': '启动营销活动',
    'hero.stats.influencers': '网红数量',
    'hero.stats.roi': '平均投资回报率',
    'hero.stats.automation': '自动化程度',
    'hero.stats.rating': '客户评分',
    
    // Process
    'process.title1': '一键启动专家级营销活动',
    'process.desc1': '只需粘贴您的网站URL，BloomFluence即可交付一个随时可用的营销活动：精准定位和核心卖点、平台选择、地域覆盖和预算计划。全程不到一分钟，无需手动输入。',
    'process.feature1.1': '市场定位与受众画像',
    'process.feature1.2': '核心价值与信息框架',
    'process.feature1.3': '渠道与区域策略',
    'process.feature1.4': '预算与时间线优化',
    'process.stat1': '快20倍',
    'process.statDesc1': '生成完整品牌策略仅需5分钟，而手动需要1-2天。',
    
    'process.title2': '从5000万+网红中，AI识别真正匹配您品牌的人',
    'process.desc2': 'BloomFluence的网红匹配引擎分析237+行为信号，使用在数百万成功品牌-网红合作中训练的大语言模型，适应实时趋势和受众数据，提供精准的、以ROI为导向的推荐。',
    'process.feature2.1': '237+维度行为分析',
    'process.feature2.2': '品牌一致的受众匹配',
    'process.feature2.3': 'LLM驱动的匹配预测与ROI评分',
    'process.feature2.4': '跨主流平台的社交洞察',
    'process.stat2': '覆盖范围扩大10万倍',
    'process.statDesc2': '人工团队每天约能审查和匹配500个网红；BloomFluence扫描了5000万+网红，并在几小时内为我们匹配了完全对齐的网红。',
    
    'process.title3': 'AI谈判最优价格和条款——然后交付可立即启动的网红',
    'process.desc3': 'BloomFluence自动化整个工作流程——从初次接触到最优价格谈判、确保合作伙伴关系和签署合同——让您以零人工工作量更快推进。',
    'process.feature3.1': '自动联系',
    'process.feature3.2': '价格谈判',
    'process.feature3.3': '建立合作',
    'process.feature3.4': '签署合同',
    'process.stat3': '效率提升5-10倍',
    'process.statDesc3': '不再需要花费数周追逐和谈判网红，BloomFluence在几天内就交付了一个随时可用的、完全对齐的、已签约的网红名单。',
    
    'process.title4': '最高标准的创意监督，保证最终结果',
    'process.desc4': 'BloomFluence确保网红遵循您的品牌愿景——从脚本到最终视频交付的每一步都受到监控和优化，确保质量、一致性和品牌安全。',
    'process.feature4.1': '品牌指南提交',
    'process.feature4.2': '脚本对齐',
    'process.feature4.3': '多轮修订',
    'process.feature4.4': '保证发布',
    'process.stat4': '100%保证',
    'process.statDesc4': 'BloomFluence的流程监督使每个网红保持一致，实现快速生产一致、高质量的内容。',
    
    'process.title5': 'AI审查数据并优化每个营销活动以获得更好的结果',
    'process.desc5': '精准追踪每个网红的表现。BloomFluence自动分析实时指标和营销活动结果——呈现ROI洞察、识别顶级表现者，并持续优化您的策略。',
    'process.feature5.1': '网红级别细分',
    'process.feature5.2': '关键指标追踪',
    'process.feature5.3': '实时优化',
    'process.stat5': '转化率提升22倍',
    'process.statDesc5': '使用BloomFluence，我们的转化率达到22.19%——远高于我们行业通常的1-3%。',
    
    // Who We Power
    'whowpower.title': '我们为谁赋能',
    'whowpower.subtitle': '从首次营销活动到全球推广——我们为初创企业、大型企业和代理机构提供网红营销服务。',
    'whowpower.startup': '初创企业',
    'whowpower.enterprise': '企业',
    'whowpower.agency': '代理机构',
    'whowpower.startup.desc': '跳过招聘和漫长的准备期。BloomFluence让您的营销活动在几小时内上线，接入全球5000万+网红，智能定价和全自动执行。',
    'whowpower.enterprise.desc': '通过企业级安全、合规性和专属支持，跨多个品牌和地区扩展您的网红营销。',
    'whowpower.agency.desc': '使用白标解决方案、高级报告和团队协作工具，为多个客户管理网红营销活动。',
    'whowpower.cta.startup': '免费开始',
    'whowpower.cta.enterprise': '联系销售',
    'whowpower.cta.agency': '预约演示',
    // Startup features
    'whowpower.startup.feature1': '5分钟内快速设置营销活动',
    'whowpower.startup.feature2': '访问5000万+认证网红',
    'whowpower.startup.feature3': 'AI驱动的价格优化',
    'whowpower.startup.feature4': '自动化营销活动管理',
    'whowpower.startup.feature5': '实时效果追踪',
    'whowpower.startup.feature6': '无需长期合同',
    // Enterprise features
    'whowpower.enterprise.feature1': '多品牌营销活动管理',
    'whowpower.enterprise.feature2': '企业级安全与合规',
    'whowpower.enterprise.feature3': '专属客户经理',
    'whowpower.enterprise.feature4': '定制报告与分析',
    'whowpower.enterprise.feature5': 'API集成能力',
    'whowpower.enterprise.feature6': '优先支持与SLA',
    // Agency features
    'whowpower.agency.feature1': '白标平台访问',
    'whowpower.agency.feature2': '多客户管理',
    'whowpower.agency.feature3': '团队协作工具',
    'whowpower.agency.feature4': '高级报告套件',
    'whowpower.agency.feature5': '客户门户访问',
    'whowpower.agency.feature6': '收益分享选项',
    
    // Features
    'features.title': '您需要的所有功能',
    'features.subtitle': '助力规模化增长',
    'features.desc': '专为现代网红营销规模化设计的综合平台，让您的品牌影响力快速提升。',
    'features.ai.title': 'AI智能匹配',
    'features.ai.desc': '先进算法分析237+行为信号，为您匹配最完美的网红合作伙伴。',
    'features.automation.title': '自动化营销',
    'features.automation.desc': '几分钟内启动营销活动，AI处理联系、谈判和效果跟踪。',
    'features.targeting.title': '精准定向',
    'features.targeting.desc': '在140+社交平台上针对特定人群、兴趣和行为进行精准定向。',
    'features.analytics.title': '实时分析',
    'features.analytics.desc': '通过详细分析、A/B测试和自动优化监控活动效果。',
    'features.network.title': '全球网络',
    'features.network.desc': '连接全球50M+经过验证的网红，覆盖所有主要平台和地区。',
    'features.safety.title': '品牌安全',
    'features.safety.desc': '每个合作都有法律合同、内容审批流程和欺诈检测保障。',
    
    // Partners
    'partners.title': '受全球领先AI原生组织信赖',
    
    // Testimonials
    'testimonials.badge': '受全球网红喜爱',
    'testimonials.title': '网红们的评价',
    'testimonials.subtitle': '加入成千上万通过BloomFluence扩大影响力的成功网红行列',
    
    // Case Studies
    'casestudies.title': '与领先AI原生团队的成功案例',
    'casestudies.subtitle': 'AI先行创新者的成功故事，将智能、精准和效率转化为真实、可衡量的结果。',
    'casestudies.cta': '免费开始',
    'casestudies.caseStudy': '案例研究',
    // Fellou
    'casestudies.fellou.category': 'AI角色社交与虚拟人应用',
    'casestudies.fellou.description': 'Fellou是一个全球性的Agentic Browser，具备强大的AI能力，目前拥有数百万用户。通过AI驱动的角色社交和虚拟人技术，为用户提供沉浸式的交互体验，让AI角色成为用户日常社交的重要组成部分。',
    'casestudies.fellou.contribution': 'BloomFluence帮助Fellou通过精准的AI网红匹配和内容策略，实现了用户基数的快速增长和全球市场的有效拓展。',
    'casestudies.fellou.metric1': '用户增长',
    'casestudies.fellou.value1': '数百万',
    'casestudies.fellou.improvement1': '+200%',
    'casestudies.fellou.metric2': '全球覆盖',
    'casestudies.fellou.value2': '50+国家',
    'casestudies.fellou.improvement2': '+300%',
    'casestudies.fellou.metric3': '用户活跃度',
    'casestudies.fellou.value3': '85%',
    'casestudies.fellou.improvement3': '+45%',
    // Mootion
    'casestudies.mootion.category': 'AI 3D人物动画生成工具',
    'casestudies.mootion.description': 'Mootion是一个易用的AI视频平台，专注于3D动画生成。平台已在50多个国家使用，拥有200万+注册用户和40万+月活用户，累计生成超过1000万条视频内容，成为全球领先的AI动画创作工具。',
    'casestudies.mootion.contribution': 'BloomFluence通过专业的AI工具推广策略，帮助Mootion在竞争激烈的3D动画市场中建立了强大的品牌影响力和用户基础。',
    'casestudies.mootion.metric1': '注册用户',
    'casestudies.mootion.value1': '200万+',
    'casestudies.mootion.improvement1': '+150%',
    'casestudies.mootion.metric2': '月活用户',
    'casestudies.mootion.value2': '40万+',
    'casestudies.mootion.improvement2': '+120%',
    'casestudies.mootion.metric3': '视频内容',
    'casestudies.mootion.value3': '1000万+',
    'casestudies.mootion.improvement3': '+400%',
    // Readdy
    'casestudies.readdy.category': 'AI建站平台几分钟生成网站',
    'casestudies.readdy.description': 'Readdy.ai是一个AI驱动的建站平台，让用户无需设计或编程经验即可快速生成专业网站。在4个月内实现了超过500万美元的ARR，展现了AI建站工具的巨大市场潜力，为中小企业提供了高效的数字化解决方案。',
    'casestudies.readdy.contribution': 'BloomFluence通过精准的B2B网红营销策略，帮助Readdy.ai在短时间内建立了强大的市场认知度和用户信任度。',
    'casestudies.readdy.metric1': 'ARR增长',
    'casestudies.readdy.value1': '500万美元',
    'casestudies.readdy.improvement1': '+500%',
    'casestudies.readdy.metric2': '建站时间',
    'casestudies.readdy.value2': '5分钟',
    'casestudies.readdy.improvement2': '-95%',
    'casestudies.readdy.metric3': '用户满意度',
    'casestudies.readdy.value3': '92%',
    'casestudies.readdy.improvement3': '+25%',
    
    // Guarantee
    'guarantee.badge': '100% 保证',
    'guarantee.title1': '您的增长',
    'guarantee.title2': '由',
    'guarantee.title3': '100%保证支持',
    'guarantee.subtitle': '准备好创造令人惊叹的成果了吗？我们以透明、安全的结果保证您的成功。',
    'guarantee.card1.title': '只为结果付费',
    'guarantee.card1.desc': '如果未达到交付成果，保证100%退款',
    'guarantee.card1.feature1': '基于效果的定价',
    'guarantee.card1.feature2': '无预付费用',
    'guarantee.card1.feature3': '100%退款保证',
    'guarantee.card1.feature4': '透明报告',
    'guarantee.card2.title': '双方合同保护',
    'guarantee.card2.desc': '每次合作由具有法律约束力的合同保障',
    'guarantee.card2.feature1': '法律合同保护',
    'guarantee.card2.feature2': '明确的条款与条件',
    'guarantee.card2.feature3': '争议解决流程',
    'guarantee.card2.feature4': '安全支付处理',
    'guarantee.card3.title': '验证真实流量',
    'guarantee.card3.desc': '所有流量和互动都经过认证且无欺诈',
    'guarantee.card3.feature1': '欺诈检测系统',
    'guarantee.card3.feature2': '真实互动验证',
    'guarantee.card3.feature3': '所有指标的审计追踪',
    'guarantee.card3.feature4': '第三方验证',
    'guarantee.cta.title1': '准备好创造',
    'guarantee.cta.title2': '令人惊叹',
    'guarantee.cta.title3': '的成果了吗？',
    'guarantee.cta.desc': '加入已经在使用BloomFluence成长的数千品牌。',
    'guarantee.cta.button': '开始创建',
    
    // Footer
    'footer.desc': '现代化的网红营销平台。自信地创建、启动和扩展您的营销活动。',
    'footer.navigation': '导航',
    'footer.company': '公司',
    'footer.resources': '资源',
    'footer.about': '关于我们',
    'footer.blog': '博客',
    'footer.careers': '招聘',
    'footer.docs': '文档',
    'footer.help': '帮助中心',
    'footer.community': '社区',
    'footer.status': '服务状态',
    'footer.copyright': '© 2024 ',
    'footer.rights': '. 保留所有权利。',
    'footer.made': '用🩷为创作者打造',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
