import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import imageCompression from "browser-image-compression";
import Image from "next/image";

type Props = {
  onReportConfirmation: (data: string) => void;
};

function ReportComponent({ onReportConfirmation }: Props) {
  const { toast } = useToast();
  const [reportSummary, setReportSummary] = useState("");
  const [base64File, setBase64File] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function compressImage(file: File) {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 400,
      initialQuality: 0.3,
      useWebWorker: true,
    };

    try {
      return await imageCompression(file, options);
    } catch {
      toast({
        description: "Image compression failed.",
        variant: "destructive",
        duration: 2000,
      });
      return null;
    }
  }

  function fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleReportSelection(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (file) {
      const validImages = ["image/jpeg", "image/png", "image/webp"];
      const validDocs = ["application/pdf"];

      if (validImages.includes(file.type)) {
        const compressedFile = await compressImage(file);
        if (!compressedFile) return;

        const base64String = await fileToBase64(compressedFile);
        setBase64File(base64String);
        setFileType("image");
        toast({
          description: "Image file compressed & selected.",
          variant: "default",
          duration: 2000,
        });
      } else if (validDocs.includes(file.type)) {
        const base64String = await fileToBase64(file);
        setBase64File(base64String);
        setFileType("pdf");
        toast({
          description: "PDF file selected.",
          variant: "default",
          duration: 2000,
        });
      } else {
        toast({
          description: "Filetype not supported",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  }

  async function extractDetails() {
    if (!base64File) {
      toast({
        description: "Upload a valid report",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/extract-report-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64: base64File,
          type: fileType,
        }),
      });

      if (response.ok) {
        setReportSummary(await response.text());
      } else {
        toast({
          description: "Failed to extract report details",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("❌ Error extracting report details:", error);
      toast({
        description: "Something went wrong. Try again later.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
      <fieldset className="relative grid gap-6 rounded-lg border p-4">
        <legend className="text-sm font-medium">Report</legend>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute z-10 h-full w-full bg-card/90 rounded-lg flex items-center justify-center">
            <span>Extracting...</span>
          </div>
        )}

        <Input
          type="file"
          accept=".jpg,.png,.webp,.pdf"
          onChange={handleReportSelection}
          disabled={isLoading}
        />

        <Button onClick={extractDetails} disabled={isLoading}>
          {isLoading ? "Processing..." : "1. Upload File"}
        </Button>

        <Label>Report Summary</Label>
        <Textarea
          placeholder="Extracted data from the report will appear here..."
          className="min-h-72 resize-none border-0 shadow-none focus-visible:ring-0"
          value={reportSummary}
          onChange={(e) => setReportSummary(e.target.value)}
        />

        <Button
          className="bg-[#D90013]"
          variant="destructive"
          onClick={() => onReportConfirmation(reportSummary)}
          disabled={!reportSummary}
        >
          2. Looks Good
        </Button>

        {/* File Preview & Clear Option */}
        {base64File && (
          <div className="mt-4">
            <h3 className="font-semibold">Selected File Preview:</h3>
            {fileType === "image" ? (
              <Image
                src={base64File}
                alt="Preview"
                className="max-w-[100px] mt-2 rounded-lg"
                width={100}
                height={100}
              />
            ) : (
              <p className="text-sm text-gray-600">
                PDF file uploaded successfully.
              </p>
            )}
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                setBase64File(null);
                setFileType(null);
                toast({ description: "File removed.", variant: "default" });
              }}
            >
              Remove File
            </Button>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default ReportComponent;