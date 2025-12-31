
"use server";

import { z } from "zod";
import { contactFormSchema } from "./schemas";
import type { ContactFormState } from "./schemas";
import nodemailer from "nodemailer";

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      success: false,
      message: firstError || 'Invalid input'
    };
  }

  const { name, email, message } = validatedFields.data;

  // Moved transporter and mailOptions inside the action
  const adminEmail = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailPass || !adminEmail) {
      return {
          success: false,
          message: "Email server is not configured. Please contact the administrator."
      }
  }

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: adminEmail,
          pass: emailPass.replace(/ /g, ''), // Explicitly remove spaces
      },
  });
  
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: adminEmail,
    subject: `New Message from ${name} via Portfolio`,
    text: `You have received a new message from your portfolio contact form.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Message:\n${message}`,
    html: `<p>You have received a new message from your portfolio contact form.</p>` +
          `<ul>` +
          `<li><strong>Name:</strong> ${name}</li>` +
          `<li><strong>Email:</strong> ${email}</li>` +
          `</ul>` +
          `<h3>Message:</h3>` +
          `<p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Your message has been sent successfully!"
    };
  } catch (error) {
    console.error('Error sending email:', error);
    // It's helpful to return a more specific error in development
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      message: `There was an error sending your message: ${errorMessage}`
    };
  }
}
