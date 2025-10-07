import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

// 跨平台屏幕宽度获取
extension View {
    var screenWidth: CGFloat {
        #if canImport(UIKit)
        return UIScreen.main.bounds.width
        #else
        return 375 // macOS默认宽度
        #endif
    }
}

struct ChatView: View {
    @State private var messageText = ""
    @State private var messages: [ChatMessage] = [
        ChatMessage(
            id: UUID(),
            content: "北京有什么好玩的",
            isUser: true,
            timestamp: Date()
        ),
        ChatMessage(
            id: UUID(),
            content: "没问题！五句话浓缩北京精华玩法：",
            isUser: false,
            timestamp: Date()
        ),
        ChatMessage(
            id: UUID(),
            content: "故宫 必看，感受帝王宫殿的震撼 🏯\n长城 选一段爬（推荐八达岭），当回好汉 💪\n天坛 看祈年殿，体验皇家祭天文化 🌈\n颐和园 泛舟游湖，赏皇家园林美景 🛶\n什刹海 逛胡同、泡酒吧，体验老北京烟火气 🍷",
            isUser: false,
            timestamp: Date()
        )
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            // 状态栏
            StatusBarView()
            
            // 导航栏
            NavigationBarView()
            
            // 对话区域
            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(messages) { message in
                        MessageBubbleView(message: message)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
            }
            .background(Color(red: 0.98, green: 0.98, blue: 0.98))
            
            Spacer()
            
            // 输入区域
            InputAreaView(messageText: $messageText, onSend: sendMessage)
            
            // Home指示器
            HomeIndicatorView()
        }
        .background(Color(red: 0.98, green: 0.98, blue: 0.98))
        .ignoresSafeArea(.all, edges: .bottom)
    }
    
    private func sendMessage() {
        guard !messageText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        
        let newMessage = ChatMessage(
            id: UUID(),
            content: messageText,
            isUser: true,
            timestamp: Date()
        )
        
        messages.append(newMessage)
        messageText = ""
        
        // 这里可以添加发送消息到AI的逻辑
    }
}

struct StatusBarView: View {
    var body: some View {
        HStack {
            // 时间
            Text("9:41")
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(.black)
            
            Spacer()
            
            // 右侧图标组
            HStack(spacing: 4) {
                // WiFi图标
                Image(systemName: "wifi")
                    .font(.system(size: 14))
                    .foregroundColor(.black)
                
                // 信号强度图标
                HStack(spacing: 2) {
                    ForEach(0..<4) { index in
                        Rectangle()
                            .fill(Color.black)
                            .frame(width: 3, height: CGFloat(4 + index * 2))
                            .cornerRadius(1.2)
                    }
                }
                
                // 电池图标
                HStack(spacing: 2) {
                    Rectangle()
                        .stroke(Color.black, lineWidth: 1.5)
                        .frame(width: 22, height: 11.5)
                        .cornerRadius(1.6)
                    
                    Rectangle()
                        .fill(Color.black)
                        .frame(width: 1.5, height: 4)
                        .cornerRadius(0.75)
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.top, 2)
        .frame(height: 44)
        .background(Color(red: 0.98, green: 0.98, blue: 0.98))
    }
}

struct NavigationBarView: View {
    var body: some View {
        HStack {
            // 返回按钮
            Button(action: {}) {
                Image(systemName: "chevron.left")
                    .font(.system(size: 18, weight: .medium))
                    .foregroundColor(.black)
            }
            
            Spacer()
            
            // 标题区域
            HStack(spacing: 4) {
                Text("MiniCPM")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                
                Text("4.0")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                
                // 菜单按钮
                Button(action: {}) {
                    Image(systemName: "chevron.down")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                }
            }
            
            Spacer()
            
            // 添加按钮
            Button(action: {}) {
                Image(systemName: "plus")
                    .font(.system(size: 18, weight: .medium))
                    .foregroundColor(.black)
            }
        }
        .padding(.horizontal, 16)
        .frame(height: 48)
        .background(Color(red: 0.98, green: 0.98, blue: 0.98))
    }
}

struct MessageBubbleView: View {
    let message: ChatMessage
    
    var body: some View {
        HStack {
            if message.isUser {
                Spacer()
                
                VStack(alignment: .trailing, spacing: 0) {
                    Text(message.content)
                        .font(.system(size: 14))
                        .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                        .padding(.horizontal, 16)
                        .padding(.vertical, 12)
                        .background(Color(red: 0.92, green: 0.93, blue: 0.97))
                        .cornerRadius(8)
                }
                .frame(maxWidth: screenWidth * 0.7, alignment: .trailing)
            } else {
                VStack(alignment: .leading, spacing: 0) {
                    Text(message.content)
                        .font(.system(size: 14))
                        .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                        .padding(.horizontal, 16)
                        .padding(.vertical, 12)
                        .background(Color.white)
                        .cornerRadius(8)
                }
                .frame(maxWidth: screenWidth * 0.7, alignment: .leading)
                
                Spacer()
            }
        }
    }
}

struct InputAreaView: View {
    @Binding var messageText: String
    let onSend: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // 输入框
            VStack(spacing: 0) {
                HStack {
                    TextField("端侧守护隐私安全 开始对话吧", text: $messageText)
                        .font(.system(size: 14))
                        .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                        .padding(.horizontal, 16)
                        .padding(.vertical, 12)
                        .background(Color.white)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(red: 0.91, green: 0.91, blue: 0.91), lineWidth: 1)
                        )
                        .shadow(color: Color.black.opacity(0.04), radius: 2, x: 0, y: 2)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                
                // 底部功能栏
                HStack {
                    // 标签按钮
                    Button(action: {}) {
                        HStack(spacing: 4) {
                            Image(systemName: "face.smiling")
                                .font(.system(size: 14))
                            Text("标签")
                                .font(.system(size: 12))
                        }
                        .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color(red: 0.96, green: 0.96, blue: 0.96))
                        .cornerRadius(6)
                    }
                    
                    Spacer()
                    
                    // 功能按钮组
                    HStack(spacing: 12) {
                        Button(action: {}) {
                            Image(systemName: "photo")
                                .font(.system(size: 16))
                                .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                        }
                        
                        Button(action: {}) {
                            Image(systemName: "chevron.up.circle")
                                .font(.system(size: 16))
                                .foregroundColor(Color(red: 0.2, green: 0.2, blue: 0.2))
                        }
                    }
                }
                .padding(.horizontal, 12)
                .padding(.bottom, 8)
            }
            .background(Color.white)
        }
        .background(Color(red: 0.98, green: 0.98, blue: 0.98))
    }
}

struct HomeIndicatorView: View {
    var body: some View {
        HStack {
            Spacer()
            
            Rectangle()
                .fill(Color.black)
                .frame(width: 134, height: 5)
                .cornerRadius(100)
            
            Spacer()
        }
        .padding(.vertical, 8)
        .background(Color(red: 0.98, green: 0.98, blue: 0.98))
    }
}

struct ChatMessage: Identifiable {
    let id: UUID
    let content: String
    let isUser: Bool
    let timestamp: Date
}

#Preview {
    ChatView()
}
