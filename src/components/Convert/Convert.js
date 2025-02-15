import React, { useState } from "react";
import "./Convert.css";

const Convert = () => {
  const [pdfConverter, setPdfConvert] = useState(null);
  const [file, setFile] = useState(null);

  const fileIsConverting = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfConvert(file);
    } else {
      alert("Upload a PDF file");
    }
    setFile(file);
  };

  const onButton = () => {
    const formData = new FormData();
    formData.append("file", file);
    // console.log(formData);

    const response = fetch("http://localhost:4000/genai", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <div className="pdf-body">
      <div className="pdf-container">
        <p className="pdf-description"> Learn more about your pdf </p>
        <div>
          <input
            className="pdf-input"
            type="file"
            accept="application/pdf"
            onChange={fileIsConverting}
          />
          {pdfConverter && <p>Uploaded : {pdfConverter.name}</p>}
          <button className="gen-btn" onClick={onButton}>
            Generate Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Convert;
