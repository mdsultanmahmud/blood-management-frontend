import { cacheLife } from "next/cache";
import {
  SITE_ORIGIN,
  mapBank,
  mapDonor,
  mapRequest,
  type ApiBank,
  type ApiDonor,
  type ApiRequest,
  type Summary,
  type UiBank,
  type UiDonor,
  type UiRequest,
} from "./site";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";
const PUBLIC = `${BACKEND_URL}/api/v1/apps/blood-management/public`;

export interface LandingData {
  summary: Summary;
  requests: UiRequest[];
  donors: UiDonor[];
  banks: UiBank[];
}

const EMPTY: LandingData = {
  summary: {
    registeredDonors: 0,
    fulfilledRequests: 0,
    activeRequests: 0,
    districtsCovered: 0,
  },
  requests: [],
  donors: [],
  banks: [],
};

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${PUBLIC}${path}`);
  if (!res.ok) throw new Error(`${path}: ${String(res.status)}`);
  return ((await res.json()) as { data: T }).data;
}

/**
 * What the landing page shows, read from the Business Central backend on the server so search
 * engines get real content. Cached for a short time; if the backend is down the page still
 * renders, with empty lists.
 */
export async function getLandingData(): Promise<LandingData> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  const o = `origin=${encodeURIComponent(SITE_ORIGIN)}`;
  try {
    const [summary, requests, donors, banks] = await Promise.all([
      get<Summary>(`/summary?${o}`),
      get<ApiRequest[]>(`/requests?${o}&limit=12`),
      get<ApiDonor[]>(`/donors?${o}&limit=12`),
      get<ApiBank[]>(`/blood-banks?${o}`),
    ]);
    return {
      summary,
      requests: requests.map(mapRequest),
      donors: donors.map(mapDonor),
      banks: banks.map(mapBank),
    };
  } catch {
    return EMPTY;
  }
}
