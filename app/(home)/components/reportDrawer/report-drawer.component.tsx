import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAppDispatch } from "@/hooks/store.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ReportTable from "./report-table.component";

const FormSchema = z.object({
  orderTax: z
    .number({
      invalid_type_error: "Order Tax must be a number",
    })
    .optional(),
  discount: z
    .number({
      invalid_type_error: "discount must be a number",
    })
    .optional(),
  shipping: z
    .number({
      invalid_type_error: "shipping must be  number",
    })
    .optional(),
  notes: z
    .string({
      invalid_type_error: "notes must be string",
    })
    .optional(),
});

export default function ReportDrawer({ open, setOpen, details }) {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderTax: 0,
      discount: 0,
      shipping: 0,
      notes: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {};

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-screen">
          <DrawerHeader className="flex justify-between px-12">
            <DrawerTitle className="text-xl lg:text-2xl xl:text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1]">
              {details?.customer_info?.name}&rsquo;s transaction report
            </DrawerTitle>
            <DrawerDescription
              className="cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <X />
            </DrawerDescription>
          </DrawerHeader>

          <main className="px-12 space-y-5 overflow-y-scroll pb-8">
            <div className="mt-2">
              <ReportTable details={details} />
            </div>
            {details && details?.transaction_list.length === 0 && (
              <div className="w-full h-[40vh] flex  justify-center items-center text-xl opacity-60 font-semibold  text-foreground">
                No Transaction Added ..
              </div>
            )}
          </main>
        </DrawerContent>
      </Drawer>
    </>
  );
}
