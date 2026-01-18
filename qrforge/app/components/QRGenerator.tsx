"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { Copy, Download, Link as LinkIcon, RefreshCw, Palette, Check } from "lucide-react";

export default function Home() {
  const [link, setLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrColor, setQrColor] = useState("#000000");

  const generateQRCode = async () => {
    if (!link) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Add https:// if no protocol is specified
      const formattedLink = link.startsWith('http') ? link : `https://${link}`;
      
      const qr = await QRCode.toDataURL(formattedLink, {
        width: 300,
        margin: 2,
        color: {
          dark: qrColor,
          light: bgColor
        }
      });
      setQrCode(qr);
    } catch (err) {
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const linkElement = document.createElement('a');
    linkElement.href = qrCode;
    linkElement.download = 'qr-code.png';
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const copyToClipboard = () => {
    if (!qrCode) return;
    
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLink("");
    setQrCode("");
    setError("");
    setBgColor("#ffffff");
    setQrColor("#000000");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Panel - Input & Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-black p-2 rounded-xl">
              <LinkIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                QRForge
              </h1>
              <p className="text-gray-500 font-medium">Instant QR Code Generator</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter URLgggggg
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com or just example.com"
                  className="w-full border-2 border-gray-200 p-4 pl-12 rounded-xl focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
                />
                <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Color Customization */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  QR Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                  />
                  <input
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="flex-1 border-2 border-gray-200 p-2 rounded-lg font-mono text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Background
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 border-2 border-gray-200 p-2 rounded-lg font-mono text-sm"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={generateQRCode}
                disabled={loading}
                className="bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate QR
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Tip:</span> You can use any URL, website link, or text. Customize colors to match your brand.
            </p>
          </div>
        </div>

        {/* Right Panel - QR Display */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-8 md:p-10 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Your QR Code</h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            {qrCode ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl inline-block mx-auto">
                  <img
                    src={qrCode}
                    alt="Generated QR Code"
                    className="w-64 h-64 mx-auto"
                  />
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-sm text-gray-300 mb-2">Target URL</p>
                  <p className="font-mono text-sm break-all bg-black/30 p-3 rounded-lg">
                    {link.startsWith('http') ? link : `https://${link}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-64 h-64 mx-auto bg-gray-800/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 border-4 border-dashed border-gray-600 rounded-xl flex items-center justify-center">
                      <LinkIcon className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="text-gray-400 font-medium">QR Code Preview</p>
                    <p className="text-gray-500 text-sm mt-2">Enter a URL to generate</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {qrCode && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={downloadQRCode}
                className="bg-white text-black py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>

              <button
                onClick={copyToClipboard}
                className="bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          )}

          {/* Features List */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="font-semibold mb-4">Why QRForge?</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Instant generation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Customizable colors</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>High-resolution downloads</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>No watermarks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}