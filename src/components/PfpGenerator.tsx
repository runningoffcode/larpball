"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { removeBackground } from "@imgly/background-removal";

interface CharacterState {
  image: HTMLImageElement | null;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export default function PfpGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [character, setCharacter] = useState<CharacterState>({
    image: null,
    x: 256,
    y: 256,
    scale: 1,
    rotation: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveImageUrl, setSaveImageUrl] = useState("");
  const dragStart = useRef({ x: 0, y: 0 });

  // Load background image on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setBgImage(img);
    img.src = "/pfp-background.avif";
  }, []);

  // Draw canvas whenever state changes
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bgImage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw background
    ctx.clearRect(0, 0, 512, 512);
    ctx.drawImage(bgImage, 0, 0, 512, 512);

    // Draw character if exists
    if (character.image) {
      ctx.save();
      ctx.translate(character.x, character.y);
      ctx.rotate((character.rotation * Math.PI) / 180);
      ctx.scale(character.scale, character.scale);

      const w = character.image.width;
      const h = character.image.height;
      ctx.drawImage(character.image, -w / 2, -h / 2, w, h);

      ctx.restore();
    }
  }, [bgImage, character]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProcessingStatus("Loading image...");

    try {
      // First load the original image to check if it needs bg removal
      const originalUrl = URL.createObjectURL(file);

      setProcessingStatus("Removing background... (this may take a moment)");

      // Remove background
      const blob = await removeBackground(originalUrl, {
        progress: (key, current, total) => {
          if (key === "compute:inference") {
            const percent = Math.round((current / total) * 100);
            setProcessingStatus(`Processing... ${percent}%`);
          }
        },
      });

      // Create image from result
      const resultUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Scale image to fit nicely (max 300px)
        const maxSize = 300;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);

        setCharacter({
          image: img,
          x: 256,
          y: 256,
          scale: scale,
          rotation: 0,
        });
        setIsProcessing(false);
        setProcessingStatus("");
        URL.revokeObjectURL(originalUrl);
      };
      img.src = resultUrl;
    } catch (error) {
      console.error("Error processing image:", error);
      setProcessingStatus("Error processing image. Try a different file.");
      setIsProcessing(false);
    }
  };

  // Mouse handlers for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!character.image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = 512 / rect.width;
    const scaleY = 512 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if click is near character center
    const dist = Math.sqrt((x - character.x) ** 2 + (y - character.y) ** 2);
    if (dist < 150 * character.scale) {
      setIsDragging(true);
      dragStart.current = { x: x - character.x, y: y - character.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !character.image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = 512 / rect.width;
    const scaleY = 512 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setCharacter(prev => ({
      ...prev,
      x: x - dragStart.current.x,
      y: y - dragStart.current.y,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!character.image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = 512 / rect.width;
    const scaleY = 512 / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    const dist = Math.sqrt((x - character.x) ** 2 + (y - character.y) ** 2);
    if (dist < 150 * character.scale) {
      setIsDragging(true);
      dragStart.current = { x: x - character.x, y: y - character.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || !character.image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = 512 / rect.width;
    const scaleY = 512 / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    setCharacter(prev => ({
      ...prev,
      x: x - dragStart.current.x,
      y: y - dragStart.current.y,
    }));
  };

  // Download handler
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "larpball-pfp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Save to photos handler - uses Web Share API on mobile for native save
  const handleSaveToPhotos = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
      });

      // Create file for sharing
      const file = new File([blob], "larpball-pfp.png", { type: "image/png" });

      // Check if Web Share API with files is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My LARPBALL PFP",
        });
      } else {
        // Fallback: show modal for long-press save
        const dataUrl = canvas.toDataURL("image/png");
        setSaveImageUrl(dataUrl);
        setShowSaveModal(true);
      }
    } catch (error) {
      // User cancelled or error - fallback to modal
      if ((error as Error).name !== "AbortError") {
        const dataUrl = canvas.toDataURL("image/png");
        setSaveImageUrl(dataUrl);
        setShowSaveModal(true);
      }
    }
  };

  // Reset character
  const handleReset = () => {
    setCharacter({
      image: null,
      x: 256,
      y: 256,
      scale: 1,
      rotation: 0,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="w-full max-w-[400px] aspect-square rounded-xl border-2 border-white/20 cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        />

        {isProcessing && (
          <div className="absolute inset-0 bg-black/70 rounded-xl flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-white text-sm">{processingStatus}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {character.image && (
        <div className="w-full max-w-[400px] space-y-4">
          {/* Scale slider */}
          <div>
            <label className="text-white/60 text-sm block mb-2">Size</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={character.scale}
              onChange={(e) => setCharacter(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
              className="w-full accent-white"
            />
          </div>

          {/* Rotation slider */}
          <div>
            <label className="text-white/60 text-sm block mb-2">Rotation</label>
            <input
              type="range"
              min="-180"
              max="180"
              step="5"
              value={character.rotation}
              onChange={(e) => setCharacter(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
              className="w-full accent-white"
            />
          </div>
        </div>
      )}

      {/* Upload & Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="btn btn-solid"
        >
          {character.image ? "Change Character" : "Upload Character"}
        </button>

        {character.image && (
          <>
            <button onClick={handleReset} className="btn">
              Reset
            </button>
            <button onClick={handleSaveToPhotos} className="btn btn-danger">
              Save to Photos
            </button>
            <button onClick={handleDownload} className="btn">
              Download File
            </button>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-white/50 text-sm max-w-md">
        <p>Upload any image - the background will be automatically removed.</p>
        <p className="mt-1">Drag to position, use sliders to resize and rotate.</p>
      </div>

      {/* Save to Photos Modal */}
      {showSaveModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setShowSaveModal(false)}
        >
          <p className="text-white text-center mb-4 text-lg font-semibold">
            Long-press the image to save to photos
          </p>
          <img
            src={saveImageUrl}
            alt="Your LARPBALL PFP"
            className="max-w-[90vw] max-h-[70vh] rounded-xl"
          />
          <button
            onClick={() => setShowSaveModal(false)}
            className="btn mt-6"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
