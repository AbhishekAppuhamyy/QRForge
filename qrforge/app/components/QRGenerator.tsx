"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function Home() {
  const [link, setLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const generateQRCode = async () => {
    if (!link) {
      setError("Please enter a valid link");
      return;
    }

    try {
      const qr = await QRCode.toDataURL(link, {
        width: 300,
        margin: 2,
      });
      setQrCode(qr);
      setError("");
    } catch (err) {
      setError("Failed to generate QR code");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">QRForge</h1>
        <p className="text-gray-500 mb-6">Free QR Code Generator</p>

        <input
          type="url"
          placeholder="Enter your link here"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          onClick={generateQRCode}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Generate QR Code
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        {qrCode && (
          <div className="mt-6">
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </main>
  );
}
