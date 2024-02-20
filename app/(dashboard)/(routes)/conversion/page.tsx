"use client";
import * as z from "zod";
import Heading from "@/components/ui/heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ChatCompletion,
  CreateChatCompletionRequestMessage,
} from "openai/resources/index.mjs";
const Page = () => {
  const router = useRouter();
  const [message, setmessage] = useState<CreateChatCompletionRequestMessage[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const userMessage: CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      // Append the user's message to the existing messages
      const newMessage = [...message, userMessage];

      // Send the updated messages array to the backend API
      const response = await axios.post("/api/conversion", {
        messages: newMessage, // Ensure you're sending 'messages' instead of 'message'
      });

      // Update the local state with the response data
      setmessage((current) => [...current, ...response.data]);

      // Reset the form after submission
      form.reset();
    } catch (error) {
      console.log(error);
      // Handle errors appropriately, such as displaying an error message to the user
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div className="">
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="border-0 outline-none focus:outline-white focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={loading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 " disabled={loading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {message.map((msg: any) => (
              <div key={msg.content}>{msg.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
