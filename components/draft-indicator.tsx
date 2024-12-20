import { draftMode } from "next/headers";

export default async function DraftIndicator() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return;

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4">
      <div className="rounded border bg-background/50 p-2 backdrop-blur">
        <p className="flex gap-1 text-copy-tertiary">
          <span className="text-orange-400">•</span>
          Draft Mode Active
        </p>
      </div>
    </div>
  );
}
