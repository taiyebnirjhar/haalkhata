"use client";

import { TabsParent } from "./components/parentTabs/tabs-parent.component";

export default function Home() {
  return (
    <div className="h-screen w-full bg-violet-500 flex justify-center items-center">
      <TabsParent />
    </div>
  );
}
