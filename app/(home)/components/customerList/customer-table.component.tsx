import { useAppSelector } from "@/hooks/store.hook";
import {
  CustomerProps,
  deleteCustomer,
  updateCustomerInfo,
} from "@/redux/slices/customers.slice";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowLeftRight, ChevronRight, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddTransaction } from "../addTransaction/add-transaction.component";
import { CustomerEditAlert } from "./customer-edit-alert.component";
import { CustomerRemoveAlert } from "./customer-remove-alert.component";
import { CustomerReportAlert } from "./customer-report-alert.component";

export function CustomerTable() {
  const { customerList } = useAppSelector((state) => state.customers);

  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);

  const dispatch = useDispatch();

  const handleUpdateCustomer = (id: string, updatedCustomer: CustomerProps) => {
    dispatch(updateCustomerInfo({ id, updatedCustomer }));
  };
  const handleDeleteCustomer = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const deleteExistingCustomer = (params) => {
    handleDeleteCustomer(params);
  };

  return (
    <Table>
      <TableCaption>A list of your customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] ">
            <div className="pl-3">User</div>
          </TableHead>
          <TableHead className=""> Transactions</TableHead>
          <TableHead className="">Update</TableHead>
          <TableHead className="text-right">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customerList &&
          customerList.length > 0 &&
          customerList.map((items, index) => {
            return (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-violet-50"
              >
                <TableCell
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenTransactionDialog(true);
                  }}
                >
                  <div className="flex mt-[2px] justify-start gap-x-4 items-center ">
                    <div className="font-medium  w-5 h-5 rounded-full bg-violet-500 text-white flex justify-center items-center uppercase p-5 ">
                      {items?.customer_info?.name.slice(0, 1)}
                    </div>

                    <div className=" text-sm space-y-1">
                      <div className="font-semibold">
                        {items?.customer_info?.name}
                      </div>
                      <div>
                        {items?.customer_info?.due_balance > 0 ? (
                          <div className="text-red-500">
                            ৳ {items?.customer_info?.due_balance}
                          </div>
                        ) : (
                          <div className="text-green-500">
                            ৳ {items?.customer_info?.current_balance}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" text-xs space-y-1 text-violet-500">
                      <ChevronRight size={20} className="ml-2" />
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-middle">
                  <CustomerReportAlert handleReport={() => {}}>
                    <Button
                      variant="outline"
                      className="px-2 py-4  text-blue-500 hover:text-blue-700"
                    >
                      <ArrowLeftRight size={20} className="mr-2" /> Report
                    </Button>
                  </CustomerReportAlert>
                </TableCell>

                <TableCell className="text-middle">
                  <CustomerEditAlert handleEdit={() => {}}>
                    <Button
                      variant="outline"
                      className="px-2 py-4  text-blue-500 hover:text-blue-700"
                    >
                      <SquarePen size={20} className="mr-2" /> Edit
                    </Button>
                  </CustomerEditAlert>
                </TableCell>

                <TableCell className="text-right">
                  <CustomerRemoveAlert
                    handleDelete={() =>
                      deleteExistingCustomer(items?.customer_info?.id)
                    }
                  >
                    <Button
                      variant="outline"
                      className="px-2 py-4  text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} className="mr-2" /> Delete
                    </Button>
                  </CustomerRemoveAlert>
                </TableCell>

                <AddTransaction
                  open={openTransactionDialog}
                  setOpen={setOpenTransactionDialog}
                  customer_info={items?.customer_info}
                />
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
