import React, { useState } from "react";
import "./Convert.css";
import { FaPaperPlane } from "react-icons/fa";

const Convert = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fileIsConverting = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const onButton = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://babystep.onrender.com/genai", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSummary(data.result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-messages">
          {summary && <div className="chat-message bot">{summary}</div>}
        </div>
        <div className="chat-input-container">
          <input
            type="file"
            accept="application/pdf"
            onChange={fileIsConverting}
            className="file-input"
          />
          <button className="send-btn" onClick={onButton} disabled={loading}>
            {loading ? "Processing..." : <FaPaperPlane />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Convert;
