import CardView from "./CardView";
import { getContent } from "@/lib/content";

// Always render the latest saved content.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <CardView content={content} />;
}
