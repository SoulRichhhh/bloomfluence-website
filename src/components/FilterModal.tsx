import React from 'react'
import { X } from 'lucide-react'

interface FilterModalProps {
  onClose: () => void
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative w-full bg-white rounded-t-xl max-h-[80vh] overflow-hidden">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-figma-gray-200">
          <h2 className="text-base font-semibold text-figma-gray-950 font-pingfang">模型</h2>
          <button 
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-figma-gray-950" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-4 space-y-4">
          {/* 模型卡片 1 */}
          <div className="figma-card p-4">
            <div className="flex flex-col space-y-2">
              <div className="h-8 flex items-center">
                <div className="w-8 h-8 bg-figma-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">M</span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-figma-gray-950">MiniCPM 4.0</h3>
                  <p className="text-xs text-figma-gray-500">端侧守护隐私安全</p>
                </div>
              </div>
            </div>
          </div>

          {/* 模型卡片 2 */}
          <div className="figma-card p-4">
            <div className="flex flex-col space-y-2">
              <div className="h-8 flex items-center">
                <div className="w-8 h-8 bg-figma-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">G</span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-figma-gray-950">GPT-4</h3>
                  <p className="text-xs text-figma-gray-500">强大的多模态模型</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
