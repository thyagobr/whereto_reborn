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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

// Define schema for form validation using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = (data: LoginFormValues) => {
    toast.promise(
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: false
      }),
      {
        loading: "Logging in...",
        success: () => {
          window.location.replace("/");
          return "Logged in";
        },
        error: "Failed to log in"
      }
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form
          id="event-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={`text-center ${errors.email ? "text-red-500" : ""}`}>
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
              )}}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={`text-center ${errors.email ? "text-red-500" : ""}`}>
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
              )}}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
