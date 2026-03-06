/**
 * 한국 택배사 정보 및 목록
 */

export interface Carrier {
  id: string;
  name: string;
  nameEn: string;
  trackingUrlTemplate: string;
}

export const CARRIERS: Carrier[] = [
  {
    id: "cj",
    name: "CJ대한통운",
    nameEn: "CJ Logistics",
    trackingUrlTemplate: "https://trace.cjlogistics.com/next/tracking.html?wblNo={trackingNumber}",
  },
  {
    id: "hanjin",
    name: "한진택배",
    nameEn: "Hanjin Express",
    trackingUrlTemplate: "https://www.hanjin.com/kor/CMS/DeliveryMg498/receiptView.do?wblnumText2={trackingNumber}",
  },
  {
    id: "lotte",
    name: "롯데택배",
    nameEn: "Lotte Global Logistics",
    trackingUrlTemplate: "https://www.lotteglogis.com/home/reservation/tracking/index?InvNo={trackingNumber}",
  },
  {
    id: "logen",
    name: "로젠택배",
    nameEn: "Logen Logistics",
    trackingUrlTemplate: "https://www.ilogen.com/web/personal/trace/{trackingNumber}",
  },
  {
    id: "post",
    name: "우체국택배",
    nameEn: "Korea Post",
    trackingUrlTemplate: "https://service.epost.go.kr/trace.RetrieveDomRi498.comm?sid1={trackingNumber}",
  },
  {
    id: "cu",
    name: "CU편의점택배",
    nameEn: "CU CVS Delivery",
    trackingUrlTemplate: "https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no={trackingNumber}",
  },
  {
    id: "gs",
    name: "GS편의점택배",
    nameEn: "GS Postbox",
    trackingUrlTemplate: "https://www.cvsnet.co.kr/invoice/tracking.do?invoice_no={trackingNumber}",
  },
  {
    id: "kyungdong",
    name: "경동택배",
    nameEn: "Kyungdong Express",
    trackingUrlTemplate: "https://kdexp.com/basicNew498.kd?barcode={trackingNumber}",
  },
  {
    id: "daesin",
    name: "대신택배",
    nameEn: "Daesin Express",
    trackingUrlTemplate: "https://www.ds3211.co.kr/freight/internalFreightSearch.do?queryType=barcode&billNo={trackingNumber}",
  },
];

export function getCarrierById(id: string): Carrier | undefined {
  return CARRIERS.find((c) => c.id === id);
}

export function getTrackingUrl(carrierId: string, trackingNumber: string): string | null {
  const carrier = getCarrierById(carrierId);
  if (!carrier) return null;
  return carrier.trackingUrlTemplate.replace("{trackingNumber}", trackingNumber);
}
