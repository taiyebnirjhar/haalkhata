import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomerForm from "./customer-form.component";

function AddNewCustomer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Customer</CardTitle>
        <CardDescription>
          Please fill in the details below to add a new customer to your
          records.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CustomerForm />
      </CardContent>
    </Card>
  );
}

export default AddNewCustomer;
