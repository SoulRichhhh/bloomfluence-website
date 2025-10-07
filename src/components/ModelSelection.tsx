import React from 'react'
import { ChevronLeft, Plus } from 'lucide-react'

interface ModelSelectionProps {
  onNavigateToChat: () => void
  onShowFilter: () => void
}

const ModelSelection: React.FC<ModelSelectionProps> = ({ 
  onNavigateToChat: _onNavigateToChat, 
  onShowFilter 
}) => {
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
        <button className="w-6 h-6 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-figma-gray-950" />
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-figma-gray-950 font-pingfang">
          推荐模型
        </h1>
      </div>

      {/* 模型卡片列表 */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* 模型卡片 1 */}
        <div className="figma-card p-4">
          <div className="flex flex-col space-y-3">
            <div className="h-9 flex items-center">
              <div className="w-8 h-8 bg-figma-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">M</span>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-figma-gray-950">MiniCPM 4.0</h3>
                <p className="text-xs text-figma-gray-500">端侧守护隐私安全</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-figma-blue-500 rounded-full"></div>
              <span className="text-xs text-figma-gray-500">在线</span>
            </div>
          </div>
        </div>

        {/* 模型卡片 2 */}
        <div className="figma-card p-4">
          <div className="flex flex-col space-y-3">
            <div className="h-9 flex items-center">
              <div className="w-8 h-8 bg-figma-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">G</span>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-figma-gray-950">GPT-4</h3>
                <p className="text-xs text-figma-gray-500">强大的多模态模型</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-figma-blue-500 rounded-full"></div>
              <span className="text-xs text-figma-gray-500">在线</span>
            </div>
            <div className="w-full h-1 bg-figma-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 底部添加按钮 */}
      <div className="px-4 py-4 bg-white">
        <button 
          onClick={onShowFilter}
          className="w-full h-12 bg-white border border-figma-gray-200 rounded-lg flex items-center justify-center space-x-2 figma-button"
        >
          <Plus className="w-5 h-5 text-figma-gray-950" />
          <span className="text-sm font-medium text-figma-gray-950">添加新模型</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-6 bg-figma-gray-50 flex items-center justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}

export default ModelSelection
