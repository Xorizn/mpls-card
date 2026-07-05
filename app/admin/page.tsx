import Editor from "./Editor";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();
  return <Editor initial={content} />;
}
