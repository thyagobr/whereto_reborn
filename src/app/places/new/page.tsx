"use client"
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";

const PagesNew: NextPage = () => {
  const router = useRouter();
  const [tags, setTags] = useState([]);

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      tags: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const onSubmit = (data) => {
    data.tags = tags;
    console.log(data)
    savePlace(data);
  }
  const currentTag = form.watch("tags");
  // When there is a comma in the tag input, we
  // add the tag to the list of tags
  const checkForCommas = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.includes(",")) {
      addTag();
    }
  }
  const addTag = () => {
    setTags([...tags, { text: currentTag.split(",")[0] }]);
    form.setValue("tags", "");
  };
  const removeTag = (ev) => {
    const tag = ev.target.textContent;
    setTags(tags.filter((t) => t.text !== tag));
  }
  const resetForm = () => {
    form.reset();
    setTags([]);
  }
  const savePlace = async (data) => {
    const place = {
      name: data.name,
      address: data.address,
      tags,
    };
    const response = await fetch("http://localhost:3000/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });
    if (response.ok) {
      const responseData = await response.json();
      router.push(`/places/${responseData.id}`);
    }
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <h1 className="text-2xl mb-4">Place information</h1>
      <Form {...form}>
        <form
          id="event-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Place name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Place name..."
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    id="address"
                    type="text"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Tags (type comma "," to add the tag to the list)</FormLabel>
                <FormControl>
                  <Input
                    id="tags"
                    type="text"
                    disabled={isSubmitting}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      checkForCommas(e)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <ul className="flex flex-row gap-3">
            {tags.map((tag, index) => {
              return (
                <li
                  key={index}
                  className="px-1 py-1 neon_border_purple neon_cyan_text"
                >
                  <Badge onClick={removeTag}>{tag.text}</Badge>
                </li>
              );
            })}
          </ul>
          <Button type="submit">
            Add place
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PagesNew;
