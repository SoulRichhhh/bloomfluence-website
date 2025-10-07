import React, { useState } from 'react'
import { ChevronLeft, Plus, Smile } from 'lucide-react'

interface ChatInterfaceProps {
  onNavigateBack: () => void
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onNavigateBack }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // 处理发送消息逻辑
      console.log('发送消息:', inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="w-full h-screen bg-figma-gray-50 flex flex-col">
      {/* 状态栏 */}
      <div className="w-full h-11 bg-white flex items-center justify-between px-4">
        <div className="text-sm font-medium text-black">9:41</div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-3 bg-black rounded-sm"></div>
          <div className="w-4 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* 导航栏 */}
      <div className="w-full h-12 bg-figma-gray-50 flex items-center px-4">
        <button 
          onClick={onNavigateBack}
          className="w-6 h-6 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-figma-gray-950" />
        </button>
        <div className="flex-1 flex items-center justify-center space-x-1">
          <h1 className="text-base font-semibold text-figma-gray-950 font-sf-pro">MiniCPM</h1>
          <span className="text-base text-figma-gray-950 font-sf-pro">4.0</span>
          <div className="w-3 h-3 bg-figma-gray-950 rounded-sm"></div>
        </div>
        <button className="w-6 h-6 flex items-center justify-center">
          <Plus className="w-5 h-5 text-figma-gray-950" />
        </button>
      </div>

      {/* 聊天内容区域 */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {/* 用户消息 */}
        <div className="flex justify-end">
          <div className="max-w-xs bg-figma-blue-50 rounded-lg p-3">
            <p className="text-sm text-figma-gray-950">你好，请介绍一下北京</p>
          </div>
        </div>

        {/* AI 回复 */}
        <div className="flex justify-start">
          <div className="max-w-xs bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm text-figma-gray-950 mb-2">没问题！五句话浓缩北京精华玩法：</p>
            <div className="text-sm text-figma-gray-950 space-y-1">
              <p>故宫 必看，感受帝王宫殿的震撼 🏯</p>
              <p>长城 选一段爬（推荐八达岭），当回好汉 💪</p>
              <p>天坛 看祈年殿，体验皇家祭天文化 🌈</p>
              <p>颐和园 泛舟游湖，赏皇家园林美景 🛶</p>
              <p>什刹海 逛胡同、泡酒吧，体验老北京烟火气 🍷</p>
            </div>
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="px-3 py-3 bg-white">
        <div className="figma-input p-4">
          <div className="flex items-center space-x-3">
            <button className="w-6 h-6 flex items-center justify-center">
              <Smile className="w-5 h-5 text-figma-gray-950" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="端侧守护隐私安全 开始对话吧"
              className="flex-1 text-sm text-figma-gray-950 placeholder-figma-gray-400 bg-transparent outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-6 bg-figma-gray-50 flex items-center justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}

export default ChatInterface
