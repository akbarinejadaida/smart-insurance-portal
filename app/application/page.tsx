import { getForms } from "@/api/insurance-forms";
import FormMaker from "@/components/form-maker";
import Link from "next/link";

export default async function Application() {
  const { forms } = await getData();

  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-8 lg:p-12 flex-wrap gap-8">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full">
        <h1>Submit New Application</h1>

        <Link
          href={"/application/list"}
          className="text-secondary-foreground bg-secondary p-4 rounded-sm"
        >
          See All Applications
        </Link>
      </div>

      <div className="w-full flex flex-col gap-12">
        {forms.map((formFields) => (
          <FormMaker
            fields={formFields}
            key={formFields.formId}
            className="w-full flex flex-col gap-8 border rounded-sm p-6"
          />
        ))}
      </div>
    </main>
  );
}

async function getData() {
  const { forms } = await getForms();

  return {
    forms,
  };
}
