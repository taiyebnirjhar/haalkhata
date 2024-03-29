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
import { CustomerProps, addCustomer } from "@/redux/slices/customers.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  sale_or_return_amount: z.union([z.number(), z.string()]).optional(),
  payment_amount: z.union([z.number(), z.string()]).optional(),
  description: z.string().optional(),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

const FormInputItems = [
  {
    id: "1",
    name: "sale_or_return_amount",
    type: "number",
    placeholder: "amount",
    title: "Sale or Return Amount",
    required: false,
  },
  {
    id: "2",
    name: "payment_amount",
    type: "number",
    placeholder: "amount",
    title: "Payment Amount",
    required: false,
  },
  {
    id: "3",
    name: "description",
    type: "text",
    placeholder: "note goes here",
    title: "Description",
    required: false,
  },
];

export default function TransactionForm({ setOpen }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sale_or_return_amount: "",
      payment_amount: "",
      description: "",
      date: new Date(),
    },
  });

  const dispatch = useDispatch();
  const { customerList } = useAppSelector((state) => state.customers);

  const handleAddCustomer = (newCustomer: CustomerProps) => {
    dispatch(addCustomer(newCustomer));
  };

  const onSubmit = (data) => {
    const { sale_or_return_amount, payment_amount, description } = data;
    // console.log(parseInt(due_balance));
    // const new_customer = {
    //   id: uuid(),
    //   name,
    //   phone,
    //   due_balance: 0,
    //   current_balance: 0,
    // };
    // handleAddCustomer(new_customer);

    form.reset();
    setOpen(false);
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
              name={
                item.name as
                  | "sale_or_return_amount"
                  | "payment_amount"
                  | "description"
              }
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

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Date of Sale/Return</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className=" !w-full">
                    <FormControl className=" w-full">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="!w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      defaultMonth={new Date()}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <CardFooter className="flex justify-start   mt-6  p-0">
          <Button type="submit" className="text-sm px-6" onClick={() => {}}>
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
