import { Suspense } from "react";
import Landing from "@/components/Landing";
import { getLandingData } from "@/lib/data";

async function LandingWithData() {
  const data = await getLandingData();
  return <Landing {...data} />;
}

/**
 * Landing page. Rendered on the server with live data from Business Central (verified requests,
 * donors, blood banks, counters), so search engines read real content; the interactive parts
 * (language, search, forms) live in the client component. The data sits inside Suspense so the
 * page shell can be sent at once.
 */
export default function Home() {
  return (
    <Suspense
      fallback={<main className="min-h-screen bg-slate-50" aria-busy="true" />}
    >
      <LandingWithData />
    </Suspense>
  );
}
