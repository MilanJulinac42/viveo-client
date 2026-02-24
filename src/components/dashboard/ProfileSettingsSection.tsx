/**
 * @fileoverview Profile settings section for the celebrity dashboard.
 * Allows editing name, bio, tags, price, response time with API save.
 * Includes avatar upload with preview and progress bar.
 */

"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateDashboardProfile, uploadAvatar } from "@/lib/api/dashboard";
import { Card, CardBody } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Celebrity } from "@/lib/types";

interface ProfileSettingsSectionProps {
  /** Celebrity data to initialize form */
  celebrity: Celebrity;
}

/** Shared input className */
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

/**
 * Dashboard section for editing celebrity profile settings.
 */
export default function ProfileSettingsSection({ celebrity }: ProfileSettingsSectionProps) {
  // Form state
  const [name, setName] = useState(celebrity.name);
  const [bio, setBio] = useState(celebrity.bio);
  const [extendedBio, setExtendedBio] = useState(celebrity.extendedBio || "");
  const [price, setPrice] = useState(celebrity.price);
  const [responseTime, setResponseTime] = useState(celebrity.responseTime);
  const [tags, setTags] = useState<string[]>(celebrity.tags || []);
  const [acceptingRequests, setAcceptingRequests] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Avatar upload state
  const [avatarUrl, setAvatarUrl] = useState(celebrity.image || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Dozvoljeni formati: JPEG, PNG, WebP");
      setTimeout(() => setError(null), 4000);
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Maksimalna veličina slike je 5 MB");
      setTimeout(() => setError(null), 4000);
      return;
    }

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setAvatarUploading(true);
    setAvatarProgress(0);
    setError(null);

    try {
      const result = await uploadAvatar(file, (percent) => {
        setAvatarProgress(percent);
      });
      setAvatarUrl(result.imageUrl);
      setAvatarPreview(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setError("Greška pri uploadu slike. Pokušajte ponovo.");
      setAvatarPreview(null);
      setTimeout(() => setError(null), 4000);
    } finally {
      setAvatarUploading(false);
      setAvatarProgress(0);
      // Reset file input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, []);

  const handleAddTag = useCallback(() => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      await updateDashboardProfile({
        name,
        bio,
        extendedBio,
        price,
        responseTime,
        tags,
        acceptingRequests,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setError("Gre\u0161ka pri \u010duvanju profila. Poku\u0161ajte ponovo.");
      setTimeout(() => setError(null), 4000);
    } finally {
      setSaving(false);
    }
  }, [name, bio, extendedBio, price, responseTime, tags, acceptingRequests]);

  const handleReset = useCallback(() => {
    setName(celebrity.name);
    setBio(celebrity.bio);
    setExtendedBio(celebrity.extendedBio || "");
    setPrice(celebrity.price);
    setResponseTime(celebrity.responseTime);
    setTags(celebrity.tags || []);
    setAcceptingRequests(true);
  }, [celebrity]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Pode\u0161avanja profila</h2>
        <p className="mt-1 text-sm text-slate-500">
          Uredite kako vas fanovi vide na platformi
        </p>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-accent-50 border border-accent-200 px-4 py-3 text-sm font-medium text-accent-700"
          >
            &#10003; Promene su uspe\u0161no sa\u010duvane!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Preview + Avatar Upload */}
      <ScrollReveal>
        <Card glass>
          <CardBody className="flex items-center gap-5 py-6">
            {/* Clickable avatar area */}
            <div className="relative group shrink-0">
              <Avatar
                src={avatarPreview || avatarUrl}
                alt={celebrity.name}
                size="2xl"
                verified={celebrity.verified}
              />
              {/* Hover overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/40 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center leading-tight px-1">
                  {avatarUploading ? "Upload..." : "Promeni\nsliku"}
                </span>
              </button>
              {/* Progress ring */}
              {avatarUploading && (
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="46"
                    fill="none"
                    stroke="rgba(108,60,225,0.3)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50" cy="50" r="46"
                    fill="none"
                    stroke="#6C3CE1"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - avatarProgress / 100)}`}
                    className="transition-all duration-300"
                  />
                </svg>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{name}</h3>
              <Badge variant="primary" size="sm">{celebrity.category}</Badge>
              <p className="mt-2 text-sm text-slate-500">
                Kliknite na sliku da promenite avatar
              </p>
            </div>
          </CardBody>
        </Card>
      </ScrollReveal>

      {/* Basic Info */}
      <ScrollReveal delay={0.1}>
        <Card glass>
          <CardBody className="space-y-5 py-6">
            <h3 className="text-lg font-bold text-slate-900">Osnovni podaci</h3>

            {/* Name */}
            <div>
              <label htmlFor="dash-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Ime i prezime
              </label>
              <input
                type="text"
                id="dash-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Short bio */}
            <div>
              <label htmlFor="dash-bio" className="mb-1.5 block text-sm font-medium text-slate-700">
                Kratki bio
              </label>
              <textarea
                id="dash-bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={cn(inputClass, "resize-none")}
              />
              <p className="mt-1 text-xs text-slate-400">{bio.length}/200 karaktera</p>
            </div>

            {/* Extended bio */}
            <div>
              <label htmlFor="dash-extended-bio" className="mb-1.5 block text-sm font-medium text-slate-700">
                Detaljni bio
              </label>
              <textarea
                id="dash-extended-bio"
                rows={6}
                value={extendedBio}
                onChange={(e) => setExtendedBio(e.target.value)}
                className={cn(inputClass, "resize-none")}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tagovi
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="primary" size="sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-primary-400 hover:text-primary-600"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  placeholder="Dodaj tag..."
                  className={cn(inputClass, "flex-1")}
                />
                <Button variant="outline" size="sm" onClick={handleAddTag}>
                  Dodaj
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </ScrollReveal>

      {/* Price & Response Time */}
      <ScrollReveal delay={0.2}>
        <Card glass>
          <CardBody className="space-y-5 py-6">
            <h3 className="text-lg font-bold text-slate-900">Cena i vreme odgovora</h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Price */}
              <div>
                <label htmlFor="dash-price" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Cena po videu (RSD)
                </label>
                <input
                  type="number"
                  id="dash-price"
                  min={500}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className={inputClass}
                />
              </div>

              {/* Response time */}
              <div>
                <label htmlFor="dash-response" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Vreme odgovora
                </label>
                <select
                  id="dash-response"
                  value={responseTime}
                  onChange={(e) => setResponseTime(Number(e.target.value))}
                  className={cn(inputClass, "appearance-none")}
                >
                  <option value={12}>12 sati</option>
                  <option value={24}>24 sata</option>
                  <option value={48}>48 sati</option>
                  <option value={72}>72 sata</option>
                </select>
              </div>
            </div>

            {/* Accepting requests toggle */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Prihvatam zahteve</p>
                <p className="text-xs text-slate-400">Kada je isklju\u010deno, niko ne mo\u017ee da vam po\u0161alje zahtev</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={acceptingRequests}
                onClick={() => setAcceptingRequests(!acceptingRequests)}
                className={cn(
                  "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
                  acceptingRequests ? "bg-accent-500" : "bg-slate-300"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 translate-y-1 rounded-full bg-white shadow-md transition-transform duration-200",
                    acceptingRequests ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </CardBody>
        </Card>
      </ScrollReveal>

      {/* Save / Cancel */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={handleReset} disabled={saving}>
          Poni\u0161ti izmene
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "\u010cuvanje..." : "Sa\u010duvaj promene"}
        </Button>
      </div>
    </div>
  );
}
