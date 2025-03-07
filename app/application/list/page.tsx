import Link from "next/link";

export default function ApplicationList() {
  return (
    <main className="min-h-screen min-w-screen flex flex-col p-4 md:p-8 lg:p-12 gap-4 flex-wrap">
      <div className="flex items-center justify-between w-full">
        <h1>See Applications</h1>
        <Link
          href={"/application"}
          className="text-secondary-foreground bg-secondary p-4 rounded-sm"
        >
          Submit New Applications
        </Link>
      </div>
    </main>
  );
}
