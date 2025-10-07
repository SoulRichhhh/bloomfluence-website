import React from 'react'

interface HistoryDialogProps {
  onNavigateBack: () => void
}

const HistoryDialog: React.FC<HistoryDialogProps> = ({ onNavigateBack }) => {
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

      {/* 内容区域 */}
      <div className="flex-1 px-4 py-4">
        {/* 历史会话标题 */}
        <div className="bg-white rounded-xl border border-figma-gray-200 p-4 mb-4">
          <h2 className="text-sm font-medium text-figma-gray-950 mb-2">历史会话</h2>
        </div>

        {/* 时间标签 */}
        <div className="mb-4">
          <span className="text-sm text-figma-gray-500">时间</span>
        </div>

        {/* 话题列表 */}
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm text-figma-gray-950">话题1</h3>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm text-figma-gray-950">话题1</h3>
          </div>
        </div>
      </div>

      {/* 底部添加按钮 */}
      <div className="px-4 py-4 bg-white">
        <button 
          onClick={onNavigateBack}
          className="w-full h-12 bg-white border border-figma-gray-200 rounded-lg flex items-center justify-center space-x-2 figma-button"
        >
          <span className="text-sm font-medium text-figma-gray-950">返回</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-6 bg-figma-gray-50 flex items-center justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}

export default HistoryDialog
