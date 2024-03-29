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

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ArrowLeftRight,
  ChevronRight,
  Phone,
  SquarePen,
  Trash2,
} from "lucide-react";

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
          </main>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ReportTable({ details }) {
  console.log(details);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-start">
            <div className="">Transactions</div>
          </TableHead>
          <TableHead className="text-center">Sale/Return</TableHead>
          <TableHead className="text-center">Payment</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {details &&
          details?.transaction_list?.length > 0 &&
          details?.transaction_list.map((items, index) => {
            return (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-violet-50"
              >
                <TableCell
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // setOpenTransactionDialog(true);
                  }}
                >
                  <div className="flex mt-[2px] justify-start gap-x-4 items-center ">
                    <div className="font-medium  w-5 h-5 rounded-full bg-violet-500 text-white flex justify-center items-center uppercase p-5 ">
                      {details?.customer_info?.name.slice(0, 1)}
                    </div>

                    <div className=" text-sm space-y-1">
                      <div className="font-semibold">
                        {details?.customer_info?.name}
                      </div>
                      {details?.customer_info?.phone && (
                        <div className="inline-flex gap-x-[6px] text-xs pt-1">
                          <Phone
                            strokeWidth={2}
                            size={14}
                            className="text-blue-500 "
                          />{" "}
                          {details?.customer_info?.phone}
                        </div>
                      )}
                    </div>

                    <div className=" text-xs space-y-1 text-violet-500">
                      <ChevronRight size={20} className="ml-2" />
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="text-sm space-y-1">
                    <div>
                      {details?.customer_info?.due_balance > 0 ? (
                        <div className="text-red-500">
                          ৳ {details?.customer_info?.due_balance}
                        </div>
                      ) : (
                        <div className="text-green-500">
                          ৳ {details?.customer_info?.current_balance}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    className="px-2 py-4  text-blue-500 hover:text-blue-700"
                  >
                    <ArrowLeftRight size={20} className="mr-2" /> Report
                  </Button>
                </TableCell>

                <TableCell className="text-right flex gap-x-3">
                  <Button
                    variant="outline"
                    className="px-2 py-4  text-blue-500 hover:text-blue-700"
                  >
                    <SquarePen size={20} className="mr-2" /> Edit
                  </Button>

                  <Button
                    variant="outline"
                    className="px-2 py-4  text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} className="mr-2" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
