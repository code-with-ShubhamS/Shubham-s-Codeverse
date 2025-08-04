import React from "react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
const ResumeBtn = () => {
  // Handler for PDF download
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "Shubham.pdf"; // PDF file imported in the project
    link.download = "Shubham.pdf"; // The name of the downloaded file
    link.click(); // Programmatically click the link to trigger download
  };
  return (
    <ShimmerButton className="shadow-2xl" onClick={downloadPDF}>
      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
        Download Resume
      </span>
    </ShimmerButton>
  );
};
export default ResumeBtn;