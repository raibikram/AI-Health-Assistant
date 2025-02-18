"use client";
import ChatComponent from "@/components/chatComponent";
import { ModeToggle } from "@/components/modetoggle";
import ReportComponent from "@/components/reportComponent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";
import React, { useState } from "react";

export default function HomeComponent() {
  const { toast } = useToast();
  const [reportData, setReportData] = useState("");

  const onReportConfirmation = (data: string) => {
    setReportData(data);
    toast({
      title: "Success",
      description: "Report updated successfully!",
      duration: 500,
    });
  };

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 h-[57px] bg-black flex items-center border-b px-4">
          <h1 className="text-xl font-semibold text-[#D90013] w-full">AI Health Assistant</h1>
          <div className="flex w-full justify-end p-2">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Settings size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh] p-4">
                <DrawerTitle>Upload Report</DrawerTitle>
                <DrawerDescription>
                  Select a report file to extract details.
                </DrawerDescription>
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4  md:grid-cols-2 lg:grid-cols-3">
          <div className="hidden md:flex flex-col lg:flex ">
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </div>

          <div className="lg:col-span-2 ">
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
}
