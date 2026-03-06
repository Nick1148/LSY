/**
 * 한국 MCP 서버 카탈로그 데이터
 * 우리 서버 + 커뮤니티 서버 모두 포함
 */

export interface McpServerInfo {
  slug: string;
  name: string;
  description: string;
  author: string;
  authorUrl: string;
  category: string;
  tags: string[];
  npmPackage?: string;
  githubUrl: string;
  isOurs: boolean; // 우리가 만든 서버인지
  tools: string[];
  installCommand: string;
  envVars?: { name: string; description: string; required: boolean }[];
}

export const CATEGORIES = [
  { id: "search", name: "검색", icon: "🔍" },
  { id: "map", name: "지도/교통", icon: "🗺️" },
  { id: "public", name: "공공데이터", icon: "🏛️" },
  { id: "finance", name: "금융", icon: "💰" },
  { id: "delivery", name: "택배/물류", icon: "📦" },
  { id: "language", name: "한국어 도구", icon: "🇰🇷" },
  { id: "realestate", name: "부동산", icon: "🏠" },
  { id: "lifestyle", name: "생활", icon: "🧬" },
] as const;

export const SERVERS: McpServerInfo[] = [
  // === 우리 서버 ===
  {
    slug: "korea-mcp-delivery",
    name: "@korea-mcp/delivery",
    description: "한국 택배 배송 조회. CJ대한통운, 한진, 롯데, 로젠, 우체국 등 9개 택배사 지원.",
    author: "korea-mcp-hub",
    authorUrl: "https://github.com/korea-mcp-hub",
    category: "delivery",
    tags: ["택배", "배송조회", "CJ대한통운", "한진", "로젠"],
    npmPackage: "@korea-mcp/delivery",
    githubUrl: "https://github.com/korea-mcp-hub/korea-mcp-hub/tree/main/packages/delivery",
    isOurs: true,
    tools: ["track_delivery", "list_carriers", "detect_carrier"],
    installCommand: "npx @korea-mcp/delivery",
    envVars: [
      { name: "SWEET_TRACKER_API_KEY", description: "스윗트래커 API 키", required: false },
    ],
  },

  // === 커뮤니티 서버 ===
  {
    slug: "kimcp",
    name: "KiMCP",
    description:
      "가장 포괄적인 한국 MCP 서버. 네이버 검색(블로그/뉴스/카페/지식iN/로컬/이미지/쇼핑), 다음 검색, 카카오맵, TMAP 내비게이션 지원.",
    author: "zeikar",
    authorUrl: "https://github.com/zeikar",
    category: "search",
    tags: ["네이버", "다음", "카카오맵", "TMAP", "검색", "지도"],
    githubUrl: "https://github.com/zeikar/kimcp",
    isOurs: false,
    tools: [
      "naver_blog_search", "naver_news_search", "naver_cafe_search",
      "naver_kin_search", "naver_local_search", "naver_image_search",
      "naver_shopping_search", "daum_blog_search", "daum_cafe_search",
      "kakao_map_search", "tmap_route",
    ],
    installCommand: "npx kimcp",
    envVars: [
      { name: "NAVER_CLIENT_ID", description: "네이버 API Client ID", required: true },
      { name: "NAVER_CLIENT_SECRET", description: "네이버 API Client Secret", required: true },
      { name: "KAKAO_REST_API_KEY", description: "카카오 REST API 키", required: false },
      { name: "TMAP_APP_KEY", description: "TMAP 앱 키", required: false },
    ],
  },
  {
    slug: "mcp-server-naver-search",
    name: "mcp-server-naver-search",
    description: "네이버 검색 API MCP 서버. 쇼핑, 카페, 뉴스, 블로그 검색 지원.",
    author: "uju777",
    authorUrl: "https://github.com/uju777",
    category: "search",
    tags: ["네이버", "검색", "쇼핑", "뉴스"],
    githubUrl: "https://github.com/uju777/mcp-server-naver-search",
    isOurs: false,
    tools: ["naver_shopping_search", "naver_cafe_search", "naver_news_search", "naver_blog_search"],
    installCommand: "npx mcp-server-naver-search",
    envVars: [
      { name: "NAVER_CLIENT_ID", description: "네이버 API Client ID", required: true },
      { name: "NAVER_CLIENT_SECRET", description: "네이버 API Client Secret", required: true },
    ],
  },
  {
    slug: "data-go-mcp-servers",
    name: "data-go-mcp-servers",
    description:
      "공공데이터포털(data.go.kr) MCP 서버. 국민연금 사업장 정보, 사업자등록 진위확인, 나라장터 조달정보, 금융위원회 금융정보, 대통령 연설문, 화학물질 MSDS 등.",
    author: "Koomook",
    authorUrl: "https://github.com/Koomook",
    category: "public",
    tags: ["공공데이터", "국민연금", "사업자등록", "나라장터"],
    githubUrl: "https://github.com/Koomook/data-go-mcp-servers",
    isOurs: false,
    tools: [
      "national_pension_search", "business_registration_verify",
      "narajangteo_search", "fsc_financial_info",
      "presidential_speeches", "chemical_msds",
    ],
    installCommand: "python -m data_go_mcp",
    envVars: [
      { name: "DATA_GO_KR_API_KEY", description: "공공데이터포털 API 키", required: true },
    ],
  },
  {
    slug: "naver-finance-crawl-mcp",
    name: "naver-finance-crawl-mcp",
    description:
      "네이버 금융에서 한국 주식 시장 데이터를 조회하는 MCP 서버. EUC-KR 인코딩 지원.",
    author: "greatsumini",
    authorUrl: "https://github.com/greatsumini",
    category: "finance",
    tags: ["주식", "KOSPI", "KOSDAQ", "네이버금융"],
    githubUrl: "https://github.com/greatsumini/naver-finance-crawl-mcp",
    isOurs: false,
    tools: ["stock_price", "stock_chart", "market_index"],
    installCommand: "npx naver-finance-crawl-mcp",
  },
  {
    slug: "building-register-mcp",
    name: "building-register-mcp",
    description:
      "건축물대장 조회 MCP 서버. 건축물 표제부, 층별 정보, 용도지역, 주택가격 등 12개 도구 제공.",
    author: "coding-realtor",
    authorUrl: "https://github.com/coding-realtor",
    category: "realestate",
    tags: ["건축물대장", "부동산", "주택가격", "용도지역"],
    githubUrl: "https://github.com/coding-realtor/building-register-mcp",
    isOurs: false,
    tools: [
      "building_title_sheet", "floor_details", "zoning_info",
      "house_price", "unit_info",
    ],
    installCommand: "npx building-register-mcp",
    envVars: [
      { name: "DATA_GO_KR_API_KEY", description: "공공데이터포털 API 키", required: true },
    ],
  },
  {
    slug: "korea-stock-analyzer-mcp",
    name: "korea-stock-analyzer-mcp",
    description:
      "한국 주식 분석 MCP 서버. 버핏, 린치 등 6가지 투자 구루 전략으로 KOSPI/KOSDAQ 종목 분석.",
    author: "Mrbaeksang",
    authorUrl: "https://github.com/Mrbaeksang",
    category: "finance",
    tags: ["주식분석", "투자전략", "KOSPI", "KOSDAQ", "가치투자"],
    githubUrl: "https://github.com/Mrbaeksang/korea-stock-analyzer-mcp",
    isOurs: false,
    tools: ["analyze_stock", "guru_analysis", "financial_data"],
    installCommand: "python -m korea_stock_analyzer",
  },
  {
    slug: "seoul-data-mcp",
    name: "be-node-seoul-data-mcp",
    description: "서울 공공데이터 MCP 서버. 지하철 이용객 수, 문화행사 정보 등.",
    author: "pinnaclesoft-ko",
    authorUrl: "https://github.com/pinnaclesoft-ko",
    category: "public",
    tags: ["서울", "지하철", "문화행사", "공공데이터"],
    githubUrl: "https://github.com/pinnaclesoft-ko/be-node-seoul-data-mcp",
    isOurs: false,
    tools: ["subway_ridership", "cultural_events"],
    installCommand: "npx be-node-seoul-data-mcp",
  },
  {
    slug: "mcp-naver-news",
    name: "mcp-naver-news",
    description: "네이버 뉴스 검색 전용 MCP 서버. 비상업적 용도.",
    author: "ChangooLee",
    authorUrl: "https://github.com/ChangooLee",
    category: "search",
    tags: ["뉴스", "네이버", "검색"],
    githubUrl: "https://github.com/ChangooLee/mcp-naver-news",
    isOurs: false,
    tools: ["naver_news_search"],
    installCommand: "npx mcp-naver-news",
    envVars: [
      { name: "NAVER_CLIENT_ID", description: "네이버 API Client ID", required: true },
      { name: "NAVER_CLIENT_SECRET", description: "네이버 API Client Secret", required: true },
    ],
  },
];

export function getServersByCategory(categoryId: string): McpServerInfo[] {
  return SERVERS.filter((s) => s.category === categoryId);
}

export function getOurServers(): McpServerInfo[] {
  return SERVERS.filter((s) => s.isOurs);
}

export function getCommunityServers(): McpServerInfo[] {
  return SERVERS.filter((s) => !s.isOurs);
}

export function getServerBySlug(slug: string): McpServerInfo | undefined {
  return SERVERS.find((s) => s.slug === slug);
}
