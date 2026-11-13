// Shared by the server (data for the page) and the browser (search and forms): the address of
// this site as Business Central knows it (the CLIENT address of the company app), the public
// API of the blood-management app, and the mapping from its data to what the page shows.

/** The CLIENT address set in Business Central for this company; it tells the API which club we are. */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://roktolife.localhost:3100";

/** Same-origin path (next.config.ts proxies /api to the backend). */
export const API_PATH = "/api/v1/apps/blood-management/public";

export const BLOOD_GROUP_LABELS = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
} as const;
export type ApiBloodGroup = keyof typeof BLOOD_GROUP_LABELS;

/** "A+" -> "A_POS". */
export const GROUP_FROM_LABEL: Record<string, ApiBloodGroup> =
  Object.fromEntries(
    Object.entries(BLOOD_GROUP_LABELS).map(([group, label]) => [label, group]),
  ) as Record<string, ApiBloodGroup>;

// --- what the public API returns ---
export interface ApiRequest {
  id: string;
  patientName: string;
  hospital: string;
  district: string;
  bloodGroup: ApiBloodGroup;
  units: number;
  urgency: "CRITICAL" | "URGENT" | "MODERATE";
  neededBy: string;
  contactName: string;
  contactPhone: string;
  reason: string | null;
}
export interface ApiDonor {
  id: string;
  fullName: string;
  phone: string;
  bloodGroup: ApiBloodGroup;
  district: string;
  lastDonatedOn: string | null;
}
export interface ApiBank {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string | null;
  notes: string | null;
}
export interface Summary {
  registeredDonors: number;
  fulfilledRequests: number;
  activeRequests: number;
  districtsCovered: number;
}

// --- what the page shows ---
export interface UiRequest {
  id: string;
  patientName: string;
  hospital: string;
  location: string;
  bloodGroup: string;
  urgency: string;
  units: string;
  timeRemaining: string;
  contact: string;
  reason: string;
}
export interface UiDonor {
  id: string;
  name: string;
  group: string;
  district: string;
  lastDonated: string;
  phone: string;
}
export interface UiBank {
  id: string;
  name: string;
  sub: string;
}

// Fixed zone and locale, so the server and the browser print the same text.
const when = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const day = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const mapRequest = (r: ApiRequest): UiRequest => ({
  id: r.id,
  patientName: r.patientName,
  hospital: r.hospital,
  location: r.district,
  bloodGroup: BLOOD_GROUP_LABELS[r.bloodGroup],
  urgency: r.urgency,
  units: `${String(r.units)} ${r.units === 1 ? "Bag" : "Bags"}`,
  timeRemaining: when.format(new Date(r.neededBy)),
  contact: r.contactPhone,
  reason: r.reason ?? "—",
});

export const mapDonor = (d: ApiDonor): UiDonor => ({
  id: d.id,
  name: d.fullName,
  group: BLOOD_GROUP_LABELS[d.bloodGroup],
  district: d.district,
  lastDonated: d.lastDonatedOn
    ? day.format(new Date(`${d.lastDonatedOn}T00:00:00Z`))
    : "Never",
  phone: d.phone,
});

export const mapBank = (b: ApiBank): UiBank => ({
  id: b.id,
  name: b.name,
  sub: [b.address, b.district].filter(Boolean).join(", "),
});

/** What the backend says when a request is refused (the standard error shape). */
export class ApiProblem extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_PATH}${path}`, init);
  const body = (await res.json().catch(() => ({}))) as {
    data?: T;
    error?: { code?: string };
  };
  if (!res.ok || body.data === undefined)
    throw new ApiProblem(res.status, body.error?.code ?? "REQUEST_FAILED");
  return body.data;
}

const post = <T>(path: string, body: object) =>
  call<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin: SITE_ORIGIN, ...body }),
  });

/** Browser: donors who can give now, filtered by blood group label ("A+") and district. */
export async function searchDonors(
  group: string,
  district: string,
): Promise<UiDonor[]> {
  const q = new URLSearchParams({ origin: SITE_ORIGIN, limit: "50" });
  if (group) q.set("bloodGroup", GROUP_FROM_LABEL[group] ?? "");
  if (district) q.set("district", district);
  return (await call<ApiDonor[]>(`/donors?${q.toString()}`)).map(mapDonor);
}

export interface DonorForm {
  name: string;
  phone: string;
  bloodGroup: string;
  district: string;
  lastDate: string;
}

/** Browser: register as a donor; it stays pending until staff verify it. */
export function registerDonor(f: DonorForm): Promise<{ id: string }> {
  return post("/donors", {
    fullName: f.name,
    phone: f.phone,
    bloodGroup: GROUP_FROM_LABEL[f.bloodGroup],
    district: f.district,
    lastDonatedOn: f.lastDate || null,
  });
}

export interface RequestForm {
  patientName: string;
  hospital: string;
  district: string;
  bloodGroup: string;
  units: number;
  urgency: string;
  neededBy: string;
  contactName: string;
  contactPhone: string;
  reason: string;
}

/** Browser: ask for blood; it is shown on the site once staff verify it. */
export function submitRequest(f: RequestForm): Promise<{ id: string }> {
  return post("/requests", {
    ...f,
    bloodGroup: GROUP_FROM_LABEL[f.bloodGroup],
    neededBy: new Date(f.neededBy).toISOString(),
    reason: f.reason || null,
  });
}
