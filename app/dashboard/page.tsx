"use client";

import { useState } from "react";
import KeywordFinder from "./keyword-finder/page";

import DashboardSidebar from "../../components/DashboardSidebar";

export default function DashboardPage() {
  const [selectedModule, setSelectedModule] = useState("keyword-finder");

  const renderModule = () => {
    switch (selectedModule) {
      case "keyword-finder":
        return <KeywordFinder />;
      default:
        return <KeywordFinder />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-4 bg-gray-50">{renderModule()}</div>
    </div>
  );
}
