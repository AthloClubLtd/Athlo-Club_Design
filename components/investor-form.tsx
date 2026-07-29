"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function InvestorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      firm: String(data.get("firm") || ""),
      email: String(data.get("email") || ""),
      chequeSize: String(data.get("chequeSize") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-lime/40 bg-navy-800 p-8">
        <p className="text-lg font-bold text-lime">Request received.</p>
        <p className="mt-2 text-grey-400">
          Thanks for your interest in Athlo Club — someone from our team will
          follow up with data room access shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-grey-100">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
        />
      </div>
      <div>
        <label htmlFor="firm" className="block text-sm font-semibold text-grey-100">
          Firm
        </label>
        <input
          id="firm"
          name="firm"
          required
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-grey-100">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
        />
      </div>
      <div>
        <label htmlFor="chequeSize" className="block text-sm font-semibold text-grey-100">
          Typical cheque size
        </label>
        <select
          id="chequeSize"
          name="chequeSize"
          required
          defaultValue=""
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
        >
          <option value="" disabled>
            Select a range
          </option>
          <option value="<50k">Under £50k</option>
          <option value="50k-250k">£50k – £250k</option>
          <option value="250k-1m">£250k – £1m</option>
          <option value="1m+">£1m+</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-grey-100">
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-lime"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request data room access"}
      </button>
    </form>
  );
}
