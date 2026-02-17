/**
 * @fileoverview Modal for stars to upload a completed video for a request.
 * Features drag-and-drop, file validation, upload progress, and success state.
 */

"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { uploadVideo } from "@/lib/api/dashboard";
import Button from "@/components/ui/Button";

interface VideoUploadModalProps {
  requestId: string;
  buyerName: string;
  recipientName: string;
  onClose: () => void;
  onUploaded: () => void;
}

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VideoUploadModal({
  requestId,
  buyerName,
  recipientName,
  onClose,
  onUploaded,
}: VideoUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((f: File): string | null => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      return "Dozvoljeni formati: MP4, WebM, MOV";
    }
    if (f.size > MAX_SIZE) {
      return `Fajl je prevelik (${formatFileSize(f.size)}). Maksimum je 100 MB.`;
    }
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (f: File) => {
      const err = validateFile(f);
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setFile(f);
    },
    [validateFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFileSelect(f);
    },
    [handleFileSelect]
  );

  const handleUpload = useCallback(async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      await uploadVideo(requestId, file, setProgress);
      setSuccess(true);
      setTimeout(onUploaded, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Greška pri uploadu. Pokušajte ponovo."
      );
    } finally {
      setUploading(false);
    }
  }, [file, requestId, onUploaded]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && !uploading) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl"
        >
          {/* Success state */}
          {success ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
                <svg
                  className="h-8 w-8 text-accent-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Video je uspešno otpremljen!
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {buyerName} će biti obavešten/a da je video spreman.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Otpremi video
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Video za <span className="font-medium">{recipientName}</span>{" "}
                  (naručio/la {buyerName})
                </p>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
                  dragOver
                    ? "border-primary-400 bg-primary-50"
                    : file
                      ? "border-accent-300 bg-accent-50"
                      : "border-slate-200 bg-slate-50 hover:border-primary-300 hover:bg-primary-50/50"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileSelect(f);
                  }}
                />

                {file ? (
                  <>
                    <svg
                      className="h-10 w-10 text-accent-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatFileSize(file.size)}
                    </p>
                    <p className="mt-2 text-xs text-primary-500">
                      Kliknite da promenite fajl
                    </p>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-10 w-10 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      Prevucite video ovde
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      ili kliknite da izaberete &bull; MP4, WebM, MOV &bull; max
                      100 MB
                    </p>
                  </>
                )}
              </div>

              {/* Progress bar */}
              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Otpremanje...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  disabled={uploading}
                >
                  Otkaži
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                >
                  {uploading ? "Otpremanje..." : "Otpremi video"}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
