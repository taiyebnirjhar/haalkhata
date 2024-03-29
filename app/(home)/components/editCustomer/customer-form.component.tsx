import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAppSelector } from "@/hooks/store.hook";
import {
  CustomerProps,
  addCustomer,
  updateCustomerInfo,
} from "@/redux/slices/customers.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Customer name is required",
      invalid_type_error: "Customer name must be a string",
    })
    .min(3, {
      message: "Customer name must be at least 3 characters.",
    }),

  phone: z.string().optional(),
  due_balance: z.union([z.number(), z.string()]).optional(),
});

const FormInputItems = [
  {
    id: "1",
    name: "name",
    type: "text",
    placeholder: "name ...",
    title: "Name",
    required: true,
  },
  {
    id: "2",
    name: "phone",
    type: "tel",
    placeholder: "phone ",
    title: "Phone",
    required: false,
  },
  {
    id: "3",
    name: "due_balance",
    type: "number",
    placeholder: "number ",
    title: "Due Balance",
    required: false,
  },
];

export default function CustomerForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      due_balance: 0,
    },
  });

  const dispatch = useDispatch();
  const { customerList } = useAppSelector((state) => state.customers);

  const handleAddCustomer = (newCustomer: CustomerProps) => {
    dispatch(addCustomer(newCustomer));
  };

  const updateExistingCustomer = () => {
    // handleUpdateCustomer("1", {
    //   id: "1",
    //   name: "Updated Name",
    //   // phone: "9876543210",
    //   // initial_balance: "20.00",
    // });
  };

  const handleUpdateCustomer = (id: string, updatedCustomer: CustomerProps) => {
    dispatch(updateCustomerInfo({ id, updatedCustomer }));
  };

  const onSubmit = (data) => {
    const { name, phone, due_balance } = data;
    console.log(parseInt(due_balance));
    const new_customer = {
      id: (customerList.length + 1).toString(),
      name,
      phone,
      due_balance: parseInt(due_balance),
      advanced_balance: 0,
    };
    // handleAddCustomer(new_customer);

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid grid-cols-1 gap-5">
          {/* Dynamic form field */}
          {FormInputItems.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={item.name as "name" | "phone" | "due_balance"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {item.title}:{" "}
                    {item.required && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={item.placeholder}
                      type={item.type}
                      disabled={isLoading}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (item.type === "number") {
                          console.log(parseInt(value));
                          field.onChange(parseInt(value));
                        }
                        field.onChange(value);
                      }}
                      defaultValue={undefined}
                      value={field.value}
                      min={item.type === "number" ? 0 : undefined}
                      className="text-sm rounded-md border border-border no-focus"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <CardFooter className="flex justify-start   mt-6  p-0">
          <Button type="submit" className="text-sm px-6">
            Save
          </Button>

          <Button
            variant={"outline"}
            className="text-sm px-6"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
