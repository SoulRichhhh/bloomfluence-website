import { X, Mail, MessageCircle, Copy, Check, Phone, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false)
  const [copiedWechat, setCopiedWechat] = useState(false)
  const [showWhatsappQR, setShowWhatsappQR] = useState(false)
  const [showWechatQR, setShowWechatQR] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const copyToClipboard = async (text: string, type: 'email' | 'whatsapp' | 'wechat') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'email') {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else if (type === 'whatsapp') {
        setCopiedWhatsapp(true)
        setTimeout(() => setCopiedWhatsapp(false), 2000)
      } else {
        setCopiedWechat(true)
        setTimeout(() => setCopiedWechat(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 卡片容器 - 小巧精致 */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/5 hover:bg-black/10 transition-all duration-200 group"
        >
          <X className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
        </button>

        {/* 上半部分：图片卡片 */}
        <div
          className="relative w-full h-[240px]"
          style={{
            backgroundImage: 'url(/images/welcome-bg.jpg), url(/images/welcome-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* 文字内容 - 左上角，紧凑层级分明 */}
          <div className="absolute top-6 left-6 space-y-1">
            {/* 一级标题 - 最大最重 */}
            <h1 className="text-2xl font-poetsen text-black tracking-tight leading-none w-fit">
              BoomFluence
            </h1>
            {/* 二级标题 - 中等尺寸，加粗 */}
            <p className="text-[9px] font-semibold text-black/85 leading-tight mt-0.5" style={{ width: '152px', letterSpacing: '0.2px' }}>
              Influencer Marketing for AI Growth
            </p>
            {/* 三级标题 - 最小，细字重 */}
            <p className="text-[10px] text-black/60 font-normal font-sans leading-tight mt-0.5">
              帮助最棒的 AI 产品被世界看见
            </p>
          </div>
        </div>

        {/* 下半部分：联系方式 - 克制简洁 */}
        <div className="p-6 bg-white">
          <div className="space-y-3">
            {/* WhatsApp */}
            <div className="rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-all duration-200 group relative">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setShowWhatsappQR(!showWhatsappQR)
                    if (!showWhatsappQR) setShowWechatQR(false)
                  }}
                >
                  <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                    WhatsApp
                    <span className="text-[10px] text-gray-400">（点击展开二维码）</span>
                  </p>
                  <p className="text-sm font-medium text-gray-900">+86 18511146775</p>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showWhatsappQR ? 'rotate-180' : ''}`}
                />
                <button
                  onClick={() => copyToClipboard('+86 18511146775', 'whatsapp')}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  title="复制 WhatsApp"
                >
                  {copiedWhatsapp ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {/* WhatsApp 二维码 */}
              {showWhatsappQR && (
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                  <img 
                    src="/images/whatsup.png" 
                    alt="WhatsApp QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
              )}
            </div>

            {/* 微信 */}
            <div className="rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-all duration-200 group relative">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setShowWechatQR(!showWechatQR)
                    if (!showWechatQR) setShowWhatsappQR(false)
                  }}
                >
                  <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                    WeChat
                    <span className="text-[10px] text-gray-400">（点击展开二维码）</span>
                  </p>
                  <p className="text-sm font-medium text-gray-900">czhi-cz</p>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showWechatQR ? 'rotate-180' : ''}`}
                />
                <button
                  onClick={() => copyToClipboard('czhi-cz', 'wechat')}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  title="复制微信号"
                >
                  {copiedWechat ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {/* WeChat 二维码 */}
              {showWechatQR && (
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                  <img 
                    src="/images/wechat.png" 
                    alt="WeChat QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
              )}
            </div>

            {/* 邮箱 */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group relative">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate">workwithjimmyglobal@gmail.com</p>
              </div>
              <button
                onClick={() => copyToClipboard('workwithjimmyglobal@gmail.com', 'email')}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                title="复制邮箱"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* CTA按钮 - 克制的黑色 */}
          <a
            href="mailto:workwithjimmyglobal@gmail.com"
            className="block w-full mt-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-all duration-200 text-center"
          >
            开始合作
          </a>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal

