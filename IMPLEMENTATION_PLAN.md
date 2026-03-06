# 한국 로컬 MCP 서버 허브 - 구현 계획서 (v2 - 전략 수정)

## 전략 변경 사항

### 기존 전략 (v1)
> 모든 한국 MCP 서버를 직접 개발

### 수정 전략 (v2)
> **한국판 Smithery.ai** = 허브 플랫폼 + 빈틈 서버 개발

### 왜 수정했나?
이미 한국 MCP 서버들이 존재:
- **KiMCP**: 네이버 검색 + 카카오맵 + TMAP (가장 포괄적)
- **mcp-server-naver-search**: 네이버 쇼핑/카페/뉴스/블로그
- **data-go-mcp-servers**: 공공데이터 (국민연금, 사업자등록 등)
- **naver-finance-crawl-mcp**: 한국 주식 시세
- **building-register-mcp**: 건축물대장

→ 개별 서버 개발 = 레드오션
→ **허브 플랫폼 + 빈틈 서버** = 블루오션

---

## 아직 없는 MCP 서버 (Gap 분석)

| 분야 | 기존 서버 | 빈틈 (우리가 만들 것) |
|------|----------|-------------------|
| 검색 | KiMCP, naver-search | ✅ 있음 |
| 지도 | KiMCP (카카오맵) | 네이버 지도 (길찾기 포함) |
| 공공데이터 | data-go-mcp-servers | ✅ 일부 있음 |
| 금융 | naver-finance-crawl | ✅ 있음 |
| **택배 조회** | ❌ 없음 | **@korea-mcp/delivery** |
| **한국어 맞춤법** | ❌ 없음 | **@korea-mcp/korean-lang** |
| **배달음식** | ❌ 없음 | (Phase 2) |
| **병원/약국** | ❌ 없음 | (Phase 2) |
| **학교/교육** | ❌ 없음 | (Phase 3) |

---

## 프로젝트 개요

- **프로젝트명**: korea-mcp-hub
- **포지션**: 한국 MCP 서버 허브 플랫폼 (한국판 Smithery.ai)
- **핵심 가치**:
  1. 한국 MCP 서버 카탈로그 (기존 + 우리 서버)
  2. 한국어 설치 가이드
  3. 빈틈 서버 직접 개발
- **기술 스택**: TypeScript, Next.js 15, @modelcontextprotocol/sdk

---

## 프로젝트 구조 (Monorepo)

```
korea-mcp-hub/
├── apps/
│   └── web/                     # 허브 웹사이트 (Next.js 15)
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx         # 메인 페이지
│       │   ├── servers/
│       │   │   ├── page.tsx     # 서버 카탈로그
│       │   │   └── [slug]/
│       │   │       └── page.tsx # 서버 상세 페이지
│       │   └── guide/
│       │       └── page.tsx     # 설치 가이드
│       ├── components/
│       ├── data/
│       │   └── servers.ts       # 서버 메타데이터 (우리 서버 + 커뮤니티)
│       └── package.json
│
├── packages/
│   ├── delivery/                # 택배 조회 MCP (우리 오리지널)
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── tools/
│   │   │       ├── track.ts     # 택배 배송 조회
│   │   │       └── carriers.ts  # 택배사 목록
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── korean-lang/             # 한국어 도구 MCP (우리 오리지널)
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── tools/
│   │   │       ├── spell-check.ts    # 맞춤법 검사
│   │   │       └── translate.ts      # 한영/영한 번역
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── shared/                  # 공유 유틸리티
│       ├── src/
│       │   ├── api-client.ts
│       │   └── types.ts
│       └── package.json
│
├── package.json                 # 루트 (워크스페이스)
├── turbo.json
├── tsconfig.base.json
└── README.md
```

---

## Phase 1: MVP (Week 1~2)

### Week 1: 허브 웹사이트 + 택배 MCP 서버

#### Day 1-2: 프로젝트 셋업 + 허브 웹사이트
- Monorepo 구조 (npm workspaces + turborepo)
- Next.js 15 허브 웹사이트
- 서버 카탈로그 (기존 한국 MCP 서버 10개+ 수록)
- 각 서버별 설치 가이드 (한국어)

#### Day 3-4: 택배 조회 MCP 서버 개발
- 우리만의 오리지널 서버 (경쟁 없음)
- 주요 택배사 지원: CJ대한통운, 한진, 로젠, 우체국 등
- Tools: `track_delivery`, `list_carriers`

#### Day 5: 배포 + 마케팅
- npm 배포 (@korea-mcp/delivery)
- Vercel 배포 (hub 웹사이트)
- GitHub 공개
- GeekNews, 개발자 커뮤니티 공유

### Week 2: 한국어 도구 MCP + 문서 강화

#### Day 6-7: 한국어 MCP 서버
- 맞춤법 검사 (부산대 맞춤법 검사기 API)
- 한영/영한 번역 (Papago API)

#### Day 8-10: 문서 + 커뮤니티
- 설치 가이드 상세화 (스크린샷)
- 블로그 포스트: "AI에게 택배 조회를 시키는 방법"
- Discord/오픈카톡 개설

---

## Phase 2~3: (이전 계획과 동일)

- Phase 2 (Week 3-4): 추가 Gap 서버 개발 + 웹사이트 고도화
- Phase 3 (Week 5-8): 수익화 (프리미엄 서버 + 결제)
