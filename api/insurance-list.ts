import { fetchService } from "@/boot/fetch-service";

export async function getSubmittedApplications(): Promise<ApplicationInterface> {
  try {
    const response = await fetchService('insurance/forms/submissions');
    return response
  }
  catch (err) {
    console.error(err);
    return {
      columns: [],
      data: []
    }
  }
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