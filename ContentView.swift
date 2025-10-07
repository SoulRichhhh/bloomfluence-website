import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            ModelSelectionView()
                .tabItem {
                    Image(systemName: "square.grid.2x2")
                    Text("模型选择")
                }
            
            ChatView()
                .tabItem {
                    Image(systemName: "message")
                    Text("对话")
                }
            
            HistoryView()
                .tabItem {
                    Image(systemName: "clock")
                    Text("历史")
                }
        }
        .accentColor(.blue)
    }
}

#Preview {
    ContentView()
}
