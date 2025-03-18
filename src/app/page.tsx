'use client'
import axios from "axios";
import Resume from "./components/Resume";
import { useEffect, useState } from "react";

export default function Home() {
  console.log("rendering the component")
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    console.log("hitted the endpoint");
    async function fetchPdfUrl() {
      axios.get("/api/resume").then((res) => {
        setPdfUrl(res.data.url);
      });
    }
    fetchPdfUrl();

  }, []);

  if(!pdfUrl) {
    return <div>Loading...</div>;
  }


  return (
    
    <div>
      <Resume url={pdfUrl} />
    </div>
  );
}

