import { fetchService } from "@/boot/fetch-service";
import { FormWrapperInterface } from "@/components/form-wrapper";

export async function getForms(): Promise<InsuranceFormOutputInterface> {
  try {
    const response: InsuranceFormOutputInterface['forms'] = await fetchService('insurance/forms');
    return { forms: response }
  }
  catch (err) {
    console.error(err);
    return { forms: [] }
  }
}

export async function submitForm(body: any): Promise<FormSubmitOutputInterface | undefined> {
  try {
    const response = await fetchService('insurance/forms/submit', {
      method: 'POST',
      body
    });
    return response
  }
  catch (err) {
    console.error(err);
    return
  }
}

export async function getSubmittedApplications(): Promise<ApplicationInterface | undefined> {
  try {
    const response = await fetchService('insurance/forms/submissions');
    return response
  }
  catch (err) {
    console.error(err);
    return
  }
}

export interface InsuranceFormOutputInterface {
  forms: FormWrapperInterface['forms']
}

export interface FormSubmitOutputInterface {

}

export interface ApplicationInterface {
  columns: string[];
  data: {
    id: string;
    "Full Name": string;
    Age: string;
    "Insurance Type": string;
    City: string;
    Status: string;
  }[];
}