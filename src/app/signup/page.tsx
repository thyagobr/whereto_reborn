"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateUser } from "@/hooks/users/useCreateUser";

// Define schema for form validation using Zod
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const { trigger } = useCreateUser();

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Form submitted", data);
    toast.promise(trigger(data), {
      loading: "Creating account...",
      success: () => {
        window.location.replace("/");
        return "Account created";
      },
      error: (errors) => {
        // Server returns errors in the format:
        // { field_name: "error message" }
        // TODO: this is not changing the form error messages
        Object.keys(errors).forEach((key) => {
          console.log("Setting error", key, errors[key]);
          setError(key, { message: errors[key][0] });
        });

        return "Failed to create account"; // General error message for toast
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto max-w-[450px]">
      <Form {...form}>
        <form
          id="event-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={`text-center ${
                      errors.name ? "text-red-500" : ""
                    }`}
                  >
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className="text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={`text-center ${
                      errors.email ? "text-red-500" : ""
                    }`}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="email@example.com"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className="text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={`text-center ${
                      errors.email ? "text-red-500" : ""
                    }`}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="password"
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className="text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={`text-center ${
                      errors.passwordConfirmation ? "text-red-500" : ""
                    }`}
                  >
                    Password confirmation
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="passwordConfirmation"
                      placeholder="confirm your password"
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isSubmitting}
                      className="text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Create account
          </Button>
        </form>
      </Form>
    </div>
  );
}
