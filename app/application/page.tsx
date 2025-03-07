import { getForms } from "@/api/insurance-forms";
import FormWrapper from "@/components/form-wrapper";
import Link from "next/link";

export default async function Application() {
  const { forms } = await getData();

  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-8 lg:p-12 flex-wrap gap-8">
      <div className="flex items-center justify-between w-full">
        <h1>Submit New Application</h1>

        <Link
          href={"/application/list"}
          className="text-secondary-foreground bg-secondary p-4 rounded-sm"
        >
          See All Applications
        </Link>
      </div>

      <FormWrapper
        forms={forms}
        className="w-full flex flex-col items-start justify-between gap-16"
      />
    </main>
  );
}

async function getData() {
  const { forms } = await getForms();

  return {
    forms,
  };
}
