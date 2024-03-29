"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddNewCustomer from "../addNewCustomer/add-new-customer.component";
import CustomerList from "../customerList/customer-list.component";

export function TabsParent() {
  return (
    <Tabs
      defaultValue="add_new_customer"
      className="w-[90%] mx-auto sm:min-w-sm  md:min-w-md md:max-w-[80%] lg:min-w-lg lg:max-w-screen-md xl:min-w-xl xl:max-w-screen-md 2xl:min-w-2xl 2xl:max-w-screen-md"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className="cursor-pointer" value="add_new_customer">
          Add New Customer
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="customer_list">
          Customer List
        </TabsTrigger>
      </TabsList>

      <TabsContent value="add_new_customer">
        <AddNewCustomer />
      </TabsContent>

      <TabsContent value="customer_list">
        <CustomerList />
      </TabsContent>
    </Tabs>
  );
}
