# @korea-mcp/delivery 📦

한국 택배 배송 조회 MCP 서버

AI 에이전트(Claude, ChatGPT 등)가 한국 택배 배송 상태를 조회할 수 있게 해주는 MCP 서버입니다.

## 지원 택배사

| ID | 택배사 |
|----|--------|
| `cj` | CJ대한통운 |
| `hanjin` | 한진택배 |
| `lotte` | 롯데택배 |
| `logen` | 로젠택배 |
| `post` | 우체국택배 |
| `cu` | CU편의점택배 |
| `gs` | GS편의점택배 |
| `kyungdong` | 경동택배 |
| `daesin` | 대신택배 |

## 설치 방법

### Claude Desktop

`claude_desktop_config.json`에 추가:

```json
{
  "mcpServers": {
    "korea-delivery": {
      "command": "npx",
      "args": ["@korea-mcp/delivery"],
      "env": {
        "SWEET_TRACKER_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add korea-delivery npx @korea-mcp/delivery
```

## 제공 도구 (Tools)

### `list_carriers`
지원하는 택배사 목록을 조회합니다.

### `track_delivery`
택배 배송 상태를 추적합니다.
- `carrierId` (필수): 택배사 ID (예: `cj`, `hanjin`)
- `trackingNumber` (필수): 운송장 번호

### `detect_carrier`
운송장 번호 패턴으로 택배사를 자동 감지합니다.
- `trackingNumber` (필수): 운송장 번호

## 환경변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `SWEET_TRACKER_API_KEY` | 선택 | 스윗트래커 API 키. 없으면 트래킹 URL만 반환 |

API 키 발급: https://tracking.sweettracker.co.kr

## 사용 예시

Claude에게 이렇게 말해보세요:

> "CJ대한통운 운송장 123456789012 배송 상태 확인해줘"

> "내 택배 어디쯤 왔는지 확인해줘. 한진택배 5678901234"

> "운송장 번호 123456789012인데 어느 택배사인지 알아봐줘"

## 라이선스

MIT
