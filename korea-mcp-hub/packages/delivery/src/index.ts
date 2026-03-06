#!/usr/bin/env node

/**
 * @korea-mcp/delivery - 한국 택배 조회 MCP 서버
 *
 * AI 에이전트가 한국 택배 배송 상태를 조회할 수 있게 해주는 MCP 서버입니다.
 * 지원 택배사: CJ대한통운, 한진, 롯데, 로젠, 우체국, CU, GS, 경동, 대신
 *
 * 환경변수:
 *   SWEET_TRACKER_API_KEY - 스윗트래커 API 키 (선택, 없으면 트래킹 URL만 반환)
 *
 * 사용법:
 *   npx @korea-mcp/delivery
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { CARRIERS } from "./tools/carriers.js";
import { trackDelivery } from "./tools/track.js";

const server = new McpServer({
  name: "@korea-mcp/delivery",
  version: "0.1.0",
});

/**
 * Tool: list_carriers - 지원하는 택배사 목록 조회
 */
server.tool(
  "list_carriers",
  "한국 택배사 목록을 조회합니다. 배송 추적 시 carrierId가 필요합니다.",
  {},
  async () => {
    const carrierList = CARRIERS.map((c) => ({
      id: c.id,
      name: c.name,
      nameEn: c.nameEn,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              totalCount: carrierList.length,
              carriers: carrierList,
              usage: "track_delivery 도구에서 carrierId 파라미터에 id 값을 사용하세요.",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

/**
 * Tool: track_delivery - 택배 배송 추적
 */
server.tool(
  "track_delivery",
  "한국 택배 배송 상태를 추적합니다. 택배사 ID와 운송장 번호가 필요합니다.",
  {
    carrierId: z
      .string()
      .describe(
        `택배사 ID. 가능한 값: ${CARRIERS.map((c) => `${c.id}(${c.name})`).join(", ")}`
      ),
    trackingNumber: z
      .string()
      .describe("운송장 번호 (숫자만 입력)"),
  },
  async ({ carrierId, trackingNumber }) => {
    const cleanNumber = trackingNumber.replace(/[\s-]/g, "");
    const result = await trackDelivery(carrierId, cleanNumber);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

/**
 * Tool: detect_carrier - 운송장 번호로 택배사 자동 감지
 */
server.tool(
  "detect_carrier",
  "운송장 번호의 패턴을 분석하여 가능한 택배사를 추천합니다.",
  {
    trackingNumber: z.string().describe("운송장 번호"),
  },
  async ({ trackingNumber }) => {
    const cleanNumber = trackingNumber.replace(/[\s-]/g, "");
    const len = cleanNumber.length;

    const candidates: Array<{ id: string; name: string; confidence: string }> = [];

    // 운송장 번호 길이/패턴 기반 택배사 추정
    if (len === 10) {
      candidates.push({ id: "hanjin", name: "한진택배", confidence: "높음" });
    }
    if (len === 11 || len === 12) {
      candidates.push({ id: "cj", name: "CJ대한통운", confidence: "높음" });
    }
    if (len === 12) {
      candidates.push({ id: "lotte", name: "롯데택배", confidence: "중간" });
      candidates.push({ id: "logen", name: "로젠택배", confidence: "중간" });
    }
    if (len === 13) {
      candidates.push({ id: "post", name: "우체국택배", confidence: "높음" });
    }
    if (len === 10 || len === 12) {
      candidates.push({ id: "kyungdong", name: "경동택배", confidence: "낮음" });
    }

    if (candidates.length === 0) {
      candidates.push(
        ...CARRIERS.slice(0, 5).map((c) => ({
          id: c.id,
          name: c.name,
          confidence: "추정불가" as const,
        }))
      );
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              trackingNumber: cleanNumber,
              digitCount: len,
              candidates,
              suggestion:
                candidates.length === 1
                  ? `${candidates[0].name}(${candidates[0].id})일 가능성이 높습니다.`
                  : "정확한 택배사를 확인하려면 list_carriers로 택배사 목록을 확인하세요.",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stderr로 로깅 (stdout은 MCP 프로토콜 통신에 사용)
  console.error("@korea-mcp/delivery server started");
}

main().catch((error) => {
  console.error("서버 시작 실패:", error);
  process.exit(1);
});
