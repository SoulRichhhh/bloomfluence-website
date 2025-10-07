import SwiftUI

struct AddModelView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var selectedModel: String = ""
    
    let availableModels = [
        "MiniCPM 4.0",
        "GPT-4",
        "Claude 3",
        "Gemini Pro",
        "Llama 2"
    ]
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // 标题栏
                HStack {
                    Text("模型")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.primary)
                    
                    Spacer()
                    
                    Button("关闭") {
                        presentationMode.wrappedValue.dismiss()
                    }
                    .foregroundColor(.blue)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                
                Divider()
                
                // 模型列表
                ScrollView {
                    LazyVStack(spacing: 0) {
                        ForEach(availableModels, id: \.self) { model in
                            ModelSelectionRow(
                                model: model,
                                isSelected: selectedModel == model
                            ) {
                                selectedModel = model
                            }
                        }
                    }
                }
                
                // 底部按钮
                VStack(spacing: 16) {
                    Button("添加模型") {
                        // 这里可以添加模型添加逻辑
                        presentationMode.wrappedValue.dismiss()
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(selectedModel.isEmpty ? Color.gray : Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
                    .disabled(selectedModel.isEmpty)
                    
                    Text("选择要添加的AI模型")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 16)
            }
            .background(Color(.secondarySystemBackground))
            .cornerRadius(16)
        }
        .frame(width: 400, height: 500)
    }
}

struct ModelSelectionRow: View {
    let model: String
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(model)
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.primary)
                    
                    Text("端侧守护隐私安全 开始对话吧")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.blue)
                        .font(.system(size: 20))
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color(.secondarySystemBackground))
        }
        .buttonStyle(PlainButtonStyle())
        
        Divider()
            .padding(.leading, 16)
    }
}

#Preview {
    AddModelView()
}
