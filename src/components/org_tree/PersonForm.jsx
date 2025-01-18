"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn, formSchema } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

// Form component used for adding and editing nodes
const PersonForm = ({
  handleFormSubmit,
  error,
  parents,
  selectedParent,
  selectedNode,
}) => {
  // Initializing the form by setting zod validation and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedNode ? selectedNode.data.name : "",
      department: selectedNode ? selectedNode.data.department : "",
      email: selectedNode ? selectedNode.data.email : "",
      position: selectedNode ? selectedNode.data.position : "",
    },
  });

  const [parent, setParent] = useState(selectedParent ? selectedParent : null); // Handling parent property separately

  const onSubmit = (values) => {
    const dataToSubmit = { ...values, parent };
    handleFormSubmit(dataToSubmit);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div
          className={cn(
            "flex justify-between gap-3",
            selectedNode && "flex-col"
          )}
        >
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Department field */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Enter department name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          className={cn(
            "flex justify-between gap-3",
            selectedNode && "flex-col"
          )}
        >
          {/* Position field */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Enter current role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Select field for parent property */}
        <FormField
          name="parent"
          render={() => (
            <FormItem>
              <FormLabel>
                {selectedNode ? "Parent person" : "Add under"}
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={parent?.toString()}
                  onValueChange={(value) => setParent(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select parent person" />
                  </SelectTrigger>
                  <SelectContent>
                    {parents &&
                      parents.map((parent) => (
                        <SelectItem
                          key={parent.id}
                          value={parent.id.toString()}
                        >
                          {parent.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="self-end text-sm text-destructive">{error}</p>}
        <Button className="mt-4 text-foreground" type="submit">
          {selectedNode ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default PersonForm;
