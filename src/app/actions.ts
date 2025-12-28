
"use server";

import { z } from "zod";
import { contactFormSchema } from "./schemas";
import type { ContactFormState } from "./schemas";


export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.name?.[0] || validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.message?.[0] || 'Invalid input'
    };
  }
  
  // In a real application, you would handle the form submission,
  // e.g., send an email or save to a database.
  console.log('New message received:', validatedFields.data);

  return { 
    success: true,
    message: "Your message has been sent successfully!" 
  };
}
