import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TransactionForm from "./transaction-form.component";

export function AddTransaction({ open, setOpen, customer_info }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Add New Transaction</DialogTitle>
          <DialogDescription className="text-xs flex border-y justify-between py-1.5 ">
            <div className="inline-flex gap-x-2">
              {customer_info?.due_balance > 0 ? (
                <div>Due</div>
              ) : (
                <div>Balance</div>
              )}

              {customer_info?.due_balance > 0 ? (
                <div className="text-red-500">
                  ৳ {customer_info?.due_balance}
                </div>
              ) : (
                <div className="text-green-500">
                  ৳ {customer_info?.current_balance}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <TransactionForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
