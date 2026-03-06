# 🇰🇷 Korea MCP Hub

**AI 에이전트를 위한 한국 서비스 연결 플랫폼**

한국 로컬 서비스(네이버, 카카오, 공공데이터, 택배 등)를 AI 에이전트(Claude, ChatGPT, Cursor)가 사용할 수 있게 MCP 서버를 모아둔 허브입니다.

## 구조

```
korea-mcp-hub/
├── apps/web/           # 허브 웹사이트 (Next.js 15)
├── packages/delivery/  # 택배 조회 MCP 서버 (오리지널)
├── packages/shared/    # 공유 유틸리티
└── ...
```

## 우리 서버 (Official)

| 패키지 | 설명 | 상태 |
|--------|------|------|
| `@korea-mcp/delivery` | 한국 택배 배송 조회 (9개 택배사) | ✅ 개발완료 |

## 커뮤니티 서버 (카탈로그)

| 서버 | 제공 기능 | 제작자 |
|------|----------|--------|
| KiMCP | 네이버 검색, 카카오맵, TMAP | @zeikar |
| mcp-server-naver-search | 네이버 검색 API | @uju777 |
| data-go-mcp-servers | 공공데이터포털 | @Koomook |
| naver-finance-crawl-mcp | 한국 주식 시세 | @greatsumini |
| building-register-mcp | 건축물대장 | @coding-realtor |
| korea-stock-analyzer-mcp | 한국 주식 분석 | @Mrbaeksang |
| be-node-seoul-data-mcp | 서울 공공데이터 | @pinnaclesoft-ko |

## 빠른 시작

```bash
# 1. 클론
git clone https://github.com/korea-mcp-hub/korea-mcp-hub.git
cd korea-mcp-hub

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작
npm run dev
```

### 택배 MCP 서버 사용

```bash
# Claude Code에서
claude mcp add korea-delivery npx @korea-mcp/delivery

# 그 다음 Claude에게
# "CJ대한통운 운송장 123456789012 배송 상태 확인해줘"
```

## 기여하기

한국 MCP 서버를 만드셨나요? PR을 보내주세요!

1. `apps/web/data/servers.ts`에 서버 정보 추가
2. PR 제출

## 라이선스

MIT
