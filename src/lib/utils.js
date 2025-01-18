import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const trimDoubleQuotes = (str) => {
  return str.replace(/^"(.*)"$/, "$1");
};

// Validates the response from the API to throw user readable errors
export const validateAndSendResponse = async (response, customError) => {
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      JSON.stringify(
        responseData?.error ||
          responseData?.non_field_errors?.[0] ||
          responseData?.name?.[0] ||
          responseData?.department?.[0] ||
          responseData?.position?.[0] ||
          responseData?.email?.[0] ||
          responseData?.parent?.[0] ||
          customError
      )
    );
  }
  return responseData;
};

// Zod schema for form validation (used to add and edit nodes)
export const formSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  department: z.string().nonempty("Department is required"),
  position: z.string().nonempty("Position is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});
