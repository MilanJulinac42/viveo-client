"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.subject || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Molimo popunite sva polja.");
      return;
    }

    if (form.message.trim().length < 10) {
      setStatus("error");
      setErrorMsg("Poruka mora imati najmanje 10 karaktera.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Greška pri slanju poruke.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Greška pri slanju poruke.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-3xl">
          ✅
        </div>
        <h3 className="text-xl font-bold text-slate-900">Poruka je poslata!</h3>
        <p className="mt-2 text-slate-600">
          Hvala vam na poruci. Odgovorićemo vam u najkraćem roku.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-primary-500 px-6 py-2.5 text-sm font-semibold text-primary-500 transition-colors hover:bg-primary-50"
        >
          Pošalji novu poruku
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900">Pošaljite poruku</h2>
      <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Ime i prezime
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Vaše ime"
            className={INPUT_CLASS}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email adresa
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="vas@email.com"
            className={INPUT_CLASS}
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700">
            Tema
          </label>
          <select
            id="subject"
            value={form.subject}
            onChange={handleChange}
            className={`${INPUT_CLASS} appearance-none`}
            required
          >
            <option value="">Izaberite temu</option>
            <option value="general">Opšte pitanje</option>
            <option value="order">Pitanje o narudžbini</option>
            <option value="talent">Želim da postanem zvezda</option>
            <option value="business">Poslovna saradnja</option>
            <option value="other">Ostalo</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
            Poruka
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Opišite vaše pitanje ili sugestiju..."
            className={`${INPUT_CLASS} resize-none`}
            required
          />
        </div>

        {/* Error message */}
        {status === "error" && errorMsg && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-600 hover:shadow-lg active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Šalje se...
            </>
          ) : (
            "Pošalji poruku"
          )}
        </button>
      </form>
    </div>
  );
}
