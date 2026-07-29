"use client";

import { useState } from "react";

export default function PremiumUpgradeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/premium-checkout", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      setError(json.error ?? "Premium checkout isn't configured yet.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600 disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Upgrade to Premium — £9.99/mo"}
      </button>
      {error && <p className="mt-3 text-sm text-grey-400">{error}</p>}
    </div>
  );
}
