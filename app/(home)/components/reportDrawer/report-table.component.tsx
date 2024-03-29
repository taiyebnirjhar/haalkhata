import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SquarePen, Trash2 } from "lucide-react";

function ReportTable({ details }) {
  console.log(details);
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px] text-start">
            <div className="">Transaction Details</div>
          </TableHead>
          <TableHead className="text-center">Sale/Return</TableHead>
          <TableHead className="text-center">Payment</TableHead>
          <TableHead className="text-center">Update</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {details &&
          details?.transaction_list?.length > 0 &&
          [...details?.transaction_list].reverse().map((items, index) => {
            const date = new Date(items?.date);

            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            console.log(`${formattedDate} at ${formattedTime}`);

            return (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-violet-50"
              >
                <TableCell className="w-[300px]">
                  <div className="flex flex-col mt-[2px] justify-start   gap-y-3">
                    <div className="flex flex-col  justify-start gap-y-1.5  ">
                      <div className="font-semibold">{formattedDate}</div>
                      <div className="text-xs opacity-70">{formattedTime}</div>
                    </div>

                    {items?.description && items?.description.length > 0 && (
                      <div>{items?.description}</div>
                    )}

                    <div className="pt-5">
                      <Badge
                        variant="outline"
                        className="inline-flex gap-x-2 opacity-80"
                      >
                        New Balance:
                        {details?.customer_info?.current_balance < 0 ? (
                          <span className="text-red-500">
                            {details?.customer_info?.current_balance}
                          </span>
                        ) : (
                          <span className="text-green-500">
                            {details?.customer_info?.current_balance}
                          </span>
                        )}
                      </Badge>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center bg-red-50">
                  <div className="font-medium text-red-500 text-sm">
                    ৳ {items?.sale_or_return_amount}
                  </div>
                </TableCell>

                <TableCell className="text-center ">
                  <div className="font-medium text-green-500 text-sm">
                    ৳ {items?.payment_amount}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    className="px-2 py-4  text-blue-500 hover:text-blue-700"
                  >
                    <SquarePen size={20} className="mr-2" /> Edit
                  </Button>
                </TableCell>

                <TableCell className="text-end ">
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

export default ReportTable;
