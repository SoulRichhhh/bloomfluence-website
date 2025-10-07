import SwiftUI

struct HistoryView: View {
    @State private var conversations: [Conversation] = [
        Conversation(
            id: UUID(),
            title: "北京旅游攻略",
            lastMessage: "故宫 必看，感受帝王宫殿的震撼 🏯",
            timestamp: Date().addingTimeInterval(-3600)
        ),
        Conversation(
            id: UUID(),
            title: "编程问题讨论",
            lastMessage: "SwiftUI 的状态管理最佳实践...",
            timestamp: Date().addingTimeInterval(-7200)
        ),
        Conversation(
            id: UUID(),
            title: "美食推荐",
            lastMessage: "推荐几家北京特色餐厅...",
            timestamp: Date().addingTimeInterval(-10800)
        )
    ]
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // 自定义导航栏
                HistoryNavigationBar()
                
                ScrollView {
                    VStack(spacing: 0) {
                        // 历史会话标题
                        HistorySectionHeader()
                        
                        // 对话列表
                        LazyVStack(spacing: 0) {
                            ForEach(conversations) { conversation in
                                ConversationRow(conversation: conversation)
                            }
                        }
                    }
                }
            }
            .background(Color(.systemBackground))
        }
        #if os(iOS)
        .navigationBarHidden(true)
        #endif
    }
}

struct HistoryNavigationBar: View {
    var body: some View {
        VStack(spacing: 0) {
            // 状态栏占位
            Rectangle()
                .fill(Color.clear)
                .frame(height: 44)
            
            // 导航栏内容
            HStack {
                Spacer()
                
                Text("历史会话")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.primary)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(Color(.secondarySystemBackground))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(.separator), lineWidth: 1)
                    )
                
                Spacer()
            }
            .frame(height: 48)
            .background(Color(.systemBackground))
        }
    }
}

struct HistorySectionHeader: View {
    var body: some View {
        HStack {
            Text("时间")
                .font(.system(size: 14))
                .foregroundColor(.secondary)
            
            Spacer()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }
}

struct ConversationRow: View {
    let conversation: Conversation
    
    var body: some View {
        VStack(spacing: 0) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(conversation.title)
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.primary)
                    
                    Text(conversation.lastMessage)
                        .font(.system(size: 14))
                        .foregroundColor(.primary)
                        .lineLimit(2)
                }
                
                Spacer()
                
                Text(conversation.timestamp, style: .time)
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            
            Divider()
                .padding(.leading, 16)
        }
        .background(Color(.secondarySystemBackground))
    }
}

struct Conversation: Identifiable {
    let id: UUID
    let title: String
    let lastMessage: String
    let timestamp: Date
}

#Preview {
    HistoryView()
}
