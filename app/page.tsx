import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-40px)] w-full flex items-center justify-center gap-4 flex-wrap">
      <Link
        href={"/application"}
        className="text-primary-foreground bg-primary p-4 rounded-sm"
      >
        Submit Application
      </Link>

      <Link
        href={"/application/list"}
        className="text-secondary-foreground bg-secondary p-4 rounded-sm"
      >
        See Applications
      </Link>
    </main>
  );
}
