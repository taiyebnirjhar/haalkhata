import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerTable } from "./customer-table.component";
export default function CustomerList() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            Welcome to the Customer List! Here you can view all your registered
            customers and manage their information effortlessly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CustomerTable />
        </CardContent>
      </Card>
    </>
  );
}
