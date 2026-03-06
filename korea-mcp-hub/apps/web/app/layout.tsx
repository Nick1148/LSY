import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korea MCP Hub - 한국 MCP 서버 허브",
  description:
    "AI 에이전트를 위한 한국 서비스 연결 플랫폼. 네이버, 카카오, 공공데이터 등 한국 로컬 MCP 서버를 한 곳에서.",
  keywords: ["MCP", "한국", "AI", "에이전트", "네이버", "카카오", "Claude", "ChatGPT"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <style>{`
          :root {
            --bg-dark: #0f172a;
            --bg-card: #1e293b;
            --bg-card-hover: #334155;
            --accent-blue: #3b82f6;
            --accent-purple: #8b5cf6;
            --accent-green: #10b981;
            --accent-orange: #f59e0b;
            --text-white: #f8fafc;
            --text-gray: #94a3b8;
            --text-light: #cbd5e1;
            --border: #334155;
          }

          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-dark);
            color: var(--text-white);
            line-height: 1.6;
          }

          a { color: var(--accent-blue); text-decoration: none; }
          a:hover { text-decoration: underline; }

          .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

          .header {
            border-bottom: 1px solid var(--border);
            padding: 16px 0;
          }
          .header-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo { font-size: 20px; font-weight: 700; }
          .logo span { color: var(--accent-blue); }
          .nav { display: flex; gap: 24px; }
          .nav a { color: var(--text-gray); font-size: 14px; }
          .nav a:hover { color: var(--text-white); text-decoration: none; }

          .hero {
            text-align: center;
            padding: 80px 0 60px;
          }
          .hero h1 {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 16px;
            background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .hero p { font-size: 18px; color: var(--text-gray); max-width: 600px; margin: 0 auto; }

          .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          .badge-blue { background: rgba(59,130,246,0.15); color: var(--accent-blue); }
          .badge-green { background: rgba(16,185,129,0.15); color: var(--accent-green); }
          .badge-purple { background: rgba(139,92,246,0.15); color: var(--accent-purple); }
          .badge-orange { background: rgba(245,158,11,0.15); color: var(--accent-orange); }

          .stats {
            display: flex;
            justify-content: center;
            gap: 48px;
            padding: 32px 0;
          }
          .stat { text-align: center; }
          .stat-number { font-size: 32px; font-weight: 700; color: var(--accent-blue); }
          .stat-label { font-size: 14px; color: var(--text-gray); }

          .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
            margin: 32px 0;
          }
          .category-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: var(--bg-card);
            color: var(--text-gray);
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          }
          .category-btn:hover, .category-btn.active {
            border-color: var(--accent-blue);
            color: var(--accent-blue);
            background: rgba(59,130,246,0.1);
          }

          .server-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 20px;
            padding: 20px 0 60px;
          }

          .server-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 24px;
            transition: all 0.2s;
          }
          .server-card:hover {
            border-color: var(--accent-blue);
            transform: translateY(-2px);
          }
          .server-card.ours {
            border-color: var(--accent-green);
            background: linear-gradient(135deg, rgba(16,185,129,0.05), var(--bg-card));
          }
          .server-card h3 {
            font-size: 16px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .server-card p {
            font-size: 14px;
            color: var(--text-gray);
            margin-bottom: 12px;
            line-height: 1.5;
          }
          .server-card .author {
            font-size: 12px;
            color: var(--text-gray);
          }
          .server-card .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 12px;
          }
          .server-card .tag {
            font-size: 11px;
            padding: 2px 8px;
            background: rgba(255,255,255,0.05);
            border-radius: 4px;
            color: var(--text-gray);
          }
          .server-card .tools-count {
            font-size: 12px;
            color: var(--accent-blue);
            margin-top: 8px;
          }
          .server-card .install-cmd {
            margin-top: 12px;
            padding: 8px 12px;
            background: rgba(0,0,0,0.3);
            border-radius: 6px;
            font-family: monospace;
            font-size: 12px;
            color: var(--accent-green);
            overflow-x: auto;
          }

          .section-title {
            font-size: 28px;
            font-weight: 700;
            margin: 48px 0 24px;
          }

          .guide-section {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 32px;
            margin: 32px 0;
          }
          .guide-section h3 { margin-bottom: 16px; }
          .guide-section pre {
            background: rgba(0,0,0,0.3);
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 13px;
            color: var(--accent-green);
          }

          .footer {
            border-top: 1px solid var(--border);
            padding: 32px 0;
            text-align: center;
            color: var(--text-gray);
            font-size: 14px;
          }

          @media (max-width: 768px) {
            .hero h1 { font-size: 32px; }
            .server-grid { grid-template-columns: 1fr; }
            .stats { gap: 24px; }
            .stat-number { font-size: 24px; }
          }
        `}</style>
      </head>
      <body>
        <header className="header">
          <div className="container header-inner">
            <div className="logo">
              🇰🇷 Korea <span>MCP</span> Hub
            </div>
            <nav className="nav">
              <a href="/">홈</a>
              <a href="/servers">서버 목록</a>
              <a href="/guide">설치 가이드</a>
              <a href="https://github.com/korea-mcp-hub" target="_blank" rel="noopener">GitHub</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">
            <p>Korea MCP Hub - AI 에이전트를 위한 한국 서비스 연결 플랫폼</p>
            <p style={{ marginTop: 8 }}>Made with Claude Code</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
