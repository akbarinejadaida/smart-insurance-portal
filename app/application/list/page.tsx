import { getSubmittedApplications } from "@/api/insurance-list";
import TableContainer from "@/components/table-container";
import Link from "next/link";

export default async function ApplicationList() {
  const { data } = await getData();

  return (
    <main className="min-h-[calc(100vh-40px)] w-full flex flex-col p-4 md:p-8 lg:p-12 flex-wrap gap-8">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full">
        <h1>See Applications</h1>
        <Link
          href={"/application"}
          className="text-secondary-foreground bg-secondary p-4 rounded-sm"
        >
          Submit New Applications
        </Link>
      </div>

      <TableContainer rows={data.data} columns={data.columns} />
    </main>
  );
}

async function getData() {
  const data = await getSubmittedApplications();
  return { data };
}
