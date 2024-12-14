import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[100svh] flex flex-col justify-center items-center gap-8">
        <h1 className="text-3xl font-medium">Copy Primary</h1>
        <h1 className="text-copy-secondary text-3xl font-medium">Copy Secondary</h1>
        <h1 className="text-copy-tertiary text-3xl font-medium">Copy Tertiary</h1>
    </main>
  );
}
