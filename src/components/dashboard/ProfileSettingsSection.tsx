/**
 * @fileoverview Profile settings section for the celebrity dashboard.
 * Allows editing name, bio, tags, price, response time, and availability toggle.
 */

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

  const handleSave = useCallback(() => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

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
        <h2 className="text-2xl font-bold text-slate-900">Podešavanja profila</h2>
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
            ✓ Promene su uspešno sačuvane!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Preview */}
      <ScrollReveal>
        <Card glass>
          <CardBody className="flex items-center gap-5 py-6">
            <Avatar
              src={celebrity.image}
              alt={celebrity.name}
              size="2xl"
              verified={celebrity.verified}
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{name}</h3>
              <Badge variant="primary" size="sm">{celebrity.category}</Badge>
              <p className="mt-2 text-sm text-slate-500">
                Promena slike profila — uskoro
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
                      ×
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
                <p className="text-xs text-slate-400">Kada je isključeno, niko ne može da vam pošalje zahtev</p>
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
        <Button variant="ghost" onClick={handleReset}>
          Poništi izmene
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Sačuvaj promene
        </Button>
      </div>
    </div>
  );
}
