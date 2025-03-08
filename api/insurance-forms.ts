import { fetchService } from "@/boot/fetch-service";
import { FormMakerInterface } from "@/components/form-maker";
import { toast } from "sonner";

export async function getForms(): Promise<InsuranceFormOutputInterface> {
  try {
    const response: InsuranceFormOutputInterface["forms"] = await fetchService(
      "insurance/forms"
    );
    return { forms: response };
  } catch (err) {
    console.error(err);
    toast("Something went wrong",
      {
        className: "bg-negative text-negative-foreground",
        position: "top-center"
      })
    return { forms: [] };
  }
}

export async function submitForm(
  body: any
): Promise<FormSubmitOutputInterface | undefined> {
  try {
    const response = await fetchService("insurance/forms/submit", {
      method: "POST",
      body,
    });
    return response;
  } catch (err) {
    console.error(err);
    toast("Something went wrong",
      {
        className: "bg-secondary text-negative-foreground",
        position: "top-center",

      }
    )
    return;
  }
}

export interface InsuranceFormOutputInterface {
  forms: FormMakerInterface["fields"][];
}

export interface FormSubmitOutputInterface {
  success: boolean;
}
