"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!text) return;
    const url = await QRCode.toDataURL(text);
    setQr(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-1">QRForge</h1>
        <p className="text-gray-500 mb-4">Free QR Code Generator</p>

        <input
          type="text"
          placeholder="Enter text or URL"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={generateQR}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Generate QR
        </button>

        {qr && (
          <img
            src={qr}
            alt="QR Code"
            className="mx-auto mt-6"
          />
        )}
      </div>
    </div>
  );
}
