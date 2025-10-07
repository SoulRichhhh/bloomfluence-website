import SwiftUI

struct ModelSelectionView: View {
    @State private var showingAddModel = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // 自定义导航栏
                CustomNavigationBar(title: "推荐模型")
                
                ScrollView {
                    VStack(spacing: 16) {
                        // 模型卡片
                        ModelCard(
                            title: "MiniCPM 4.0",
                            description: "端侧守护隐私安全 开始对话吧",
                            isActive: true
                        )
                        
                        ModelCard(
                            title: "MiniCPM 4.0",
                            description: "端侧守护隐私安全 开始对话吧",
                            isActive: false
                        )
                        
                        // 添加新模型按钮
                        AddModelButton {
                            showingAddModel = true
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 16)
                }
            }
            .background(Color(.systemBackground))
            .sheet(isPresented: $showingAddModel) {
                AddModelView()
            }
        }
        #if os(iOS)
        .navigationBarHidden(true)
        #endif
    }
}

struct CustomNavigationBar: View {
    let title: String
    
    var body: some View {
        VStack(spacing: 0) {
            // 状态栏占位
            Rectangle()
                .fill(Color.clear)
                .frame(height: 44)
            
            // 导航栏内容
            HStack {
                Button(action: {}) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 22))
                        .foregroundColor(.primary)
                }
                
                Spacer()
                
                Text(title)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.primary)
                
                Spacer()
                
                // 占位符保持对称
                Image(systemName: "chevron.left")
                    .font(.system(size: 22))
                    .foregroundColor(.clear)
            }
            .padding(.horizontal, 16)
            .frame(height: 48)
            .background(Color(.systemBackground))
        }
    }
}

struct ModelCard: View {
    let title: String
    let description: String
    let isActive: Bool
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            VStack(alignment: .leading, spacing: 8) {
                Text(title)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.primary)
                
                HStack(spacing: 4) {
                    Circle()
                        .fill(isActive ? Color.green : Color.gray)
                        .frame(width: 8, height: 8)
                    
                    Text(description)
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                }
            }
            
            if !isActive {
                Rectangle()
                    .fill(Color(.separator))
                    .frame(height: 4)
                    .cornerRadius(2)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(8)
        .shadow(color: Color.black.opacity(0.04), radius: 2, x: 0, y: 2)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color(.separator), lineWidth: 1)
        )
    }
}

struct AddModelButton: View {
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 4) {
                Image(systemName: "plus.circle.fill")
                    .font(.system(size: 21))
                    .foregroundColor(.black)
                
                Text("添加新模型")
                    .font(.system(size: 14))
                    .foregroundColor(.black)
            }
        }
        .padding(.vertical, 16)
        .padding(.horizontal, 108)
    }
}

#Preview {
    ModelSelectionView()
}
