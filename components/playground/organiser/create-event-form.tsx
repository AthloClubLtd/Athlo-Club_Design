"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useEventsStore } from "@/lib/playground/events-store";
import { DEMO_ORGANISER_CLUB_ID } from "@/lib/playground/organiser-constants";
import { DIFFICULTY_FILTERS, type Difficulty, type Division, type MockEvent, type Sport } from "@/lib/playground/types";
import { formatTimeOfDay } from "@/lib/playground/format";
import { FilterDropdown } from "@/components/playground/athlete/filter-dropdown";
import { SportChipMultiselect } from "@/components/playground/organiser/sport-chip-multiselect";
import { FormField, inputClassName } from "@/components/playground/organiser/form-field";

const LEVEL_OPTIONS = DIFFICULTY_FILTERS.filter((d) => d.value !== "all") as { value: Difficulty; label: string }[];

type EventType = "event" | "competition";

type Errors = Partial<Record<"title" | "sports" | "date" | "price", string>>;

export function CreateEventForm({ onCancel, onPublished }: { onCancel: () => void; onPublished: () => void }) {
  const { addEvent, getClub } = useEventsStore();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<EventType>("event");
  const [sports, setSports] = useState<Set<Sport>>(new Set());
  const [level, setLevel] = useState<Difficulty>("beginner");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isVirtual, setIsVirtual] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [distanceMiles, setDistanceMiles] = useState("1");
  const [priceMode, setPriceMode] = useState<"free" | "paid">("free");
  const [priceAmount, setPriceAmount] = useState("");
  const [about, setAbout] = useState("");
  const [registrationClosesAt, setRegistrationClosesAt] = useState("");
  const [division1Name, setDivision1Name] = useState("");
  const [division1Tag, setDivision1Tag] = useState("Open");
  const [division2Name, setDivision2Name] = useState("");
  const [division2Tag, setDivision2Tag] = useState("Open");
  const [errors, setErrors] = useState<Errors>({});

  const toggleSport = (sport: Sport) => {
    setSports((prev) => {
      const next = new Set(prev);
      if (next.has(sport)) {
        next.delete(sport);
      } else {
        next.add(sport);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Errors = {};
    if (!title.trim()) nextErrors.title = "Enter a title for your event.";
    if (sports.size === 0) nextErrors.sports = "Select at least one sport.";
    if (!date) nextErrors.date = "Choose a date.";
    if (priceMode === "paid" && (!priceAmount || Number(priceAmount) <= 0)) {
      nextErrors.price = "Enter a price, or switch back to Free.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const club = getClub(DEMO_ORGANISER_CLUB_ID);
    if (!club) return;

    const divisions =
      type === "competition"
        ? [
            division1Name.trim()
              ? { name: division1Name.trim(), tag: division1Tag.trim() || "Open", description: "", registeredCount: 0 }
              : null,
            division2Name.trim()
              ? { name: division2Name.trim(), tag: division2Tag.trim() || "Open", description: "", registeredCount: 0 }
              : null,
          ].filter((d): d is Division => d !== null)
        : undefined;

    const newEvent: MockEvent = {
      id: `organiser-${Date.now()}`,
      title: title.trim(),
      clubId: DEMO_ORGANISER_CLUB_ID,
      clubName: club.name,
      isPrivateClub: club.isPrivateClub,
      type,
      sports: Array.from(sports),
      level,
      date,
      time: time ? formatTimeOfDay(time) : undefined,
      location: {
        name: isVirtual ? "Virtual" : locationName.trim() || club.name,
        distanceMiles: isVirtual ? 0 : Number(distanceMiles) || 0,
        isVirtual,
      },
      price: priceMode === "free" ? "free" : Number(priceAmount),
      aboutText: about.trim() || undefined,
      goingCount: type === "event" ? 0 : undefined,
      registeredCount: type === "competition" ? 0 : undefined,
      registrationClosesAt: type === "competition" && registrationClosesAt ? registrationClosesAt : undefined,
      divisions: divisions && divisions.length > 0 ? divisions : undefined,
    };

    addEvent(newEvent);
    onPublished();
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex items-center gap-[var(--space-3)] px-[var(--space-4)] pb-[var(--space-3)]">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel"
          className="flex h-11 w-11 items-center justify-center rounded-athlo-pill border border-athlo-line-strong text-athlo-text-primary"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <h1 className="font-display text-athlo-h3 font-bold text-athlo-text-primary">Create event</h1>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-[var(--space-4)] pb-[var(--space-6)]">
        <div className="flex flex-col gap-[var(--space-5)]">
          <FormField label="Title" htmlFor="ce-title" error={errors.title}>
            <input
              id="ce-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Saturday Barbell Session"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Type" htmlFor="ce-type-event">
            <div className="flex gap-[var(--space-2)]">
              {(["event", "competition"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  id={t === "event" ? "ce-type-event" : undefined}
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={`min-h-[44px] flex-1 rounded-athlo-md border px-[var(--space-3)] font-body font-semibold capitalize transition-colors ${
                    type === t
                      ? "border-athlo-lime bg-athlo-lime text-athlo-text-on-lime"
                      : "border-athlo-line-strong text-athlo-text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Sports" htmlFor="ce-sports" error={errors.sports}>
            <div id="ce-sports">
              <SportChipMultiselect selected={sports} onToggle={toggleSport} />
            </div>
          </FormField>

          <FormField label="Level" htmlFor="ce-level">
            <FilterDropdown id="ce-level" label="Level" options={LEVEL_OPTIONS} value={level} onChange={setLevel} />
          </FormField>

          <div className="grid grid-cols-2 gap-[var(--space-3)]">
            <FormField label="Date" htmlFor="ce-date" error={errors.date}>
              <input
                id="ce-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClassName}
              />
            </FormField>
            <FormField label="Time" htmlFor="ce-time">
              <input
                id="ce-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputClassName}
              />
            </FormField>
          </div>

          <FormField label="Location" htmlFor="ce-location-name">
            <div className="flex flex-col gap-[var(--space-2)]">
              <label className="flex items-center gap-[var(--space-2)] font-body text-athlo-body text-athlo-text-primary">
                <input
                  type="checkbox"
                  checked={isVirtual}
                  onChange={(e) => setIsVirtual(e.target.checked)}
                  className="h-5 w-5 rounded-athlo-sm border-athlo-line-strong accent-athlo-lime"
                />
                Virtual event
              </label>
              {!isVirtual && (
                <>
                  <input
                    id="ce-location-name"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Venue name"
                    className={inputClassName}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    aria-label="Distance in miles"
                    value={distanceMiles}
                    onChange={(e) => setDistanceMiles(e.target.value)}
                    placeholder="Distance (mi)"
                    className={inputClassName}
                  />
                </>
              )}
            </div>
          </FormField>

          <FormField label="Price" htmlFor="ce-price-free" error={errors.price}>
            <div className="flex flex-col gap-[var(--space-2)]">
              <div className="flex gap-[var(--space-2)]">
                {(["free", "paid"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    id={mode === "free" ? "ce-price-free" : undefined}
                    aria-pressed={priceMode === mode}
                    onClick={() => setPriceMode(mode)}
                    className={`min-h-[44px] flex-1 rounded-athlo-md border px-[var(--space-3)] font-body font-semibold capitalize transition-colors ${
                      priceMode === mode
                        ? "border-athlo-lime bg-athlo-lime text-athlo-text-on-lime"
                        : "border-athlo-line-strong text-athlo-text-primary"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              {priceMode === "paid" && (
                <input
                  type="number"
                  min="0"
                  step="1"
                  aria-label="Price in pounds"
                  value={priceAmount}
                  onChange={(e) => setPriceAmount(e.target.value)}
                  placeholder="£ amount"
                  className={inputClassName}
                />
              )}
            </div>
          </FormField>

          <FormField label="About" htmlFor="ce-about">
            <textarea
              id="ce-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              placeholder="What should athletes know before they come?"
              className={`${inputClassName} min-h-[88px] resize-none`}
            />
          </FormField>

          {type === "competition" && (
            <>
              <FormField label="Registration closes" htmlFor="ce-closes">
                <input
                  id="ce-closes"
                  type="date"
                  value={registrationClosesAt}
                  onChange={(e) => setRegistrationClosesAt(e.target.value)}
                  className={inputClassName}
                />
              </FormField>

              <FormField label="Divisions (optional)" htmlFor="ce-division-1-name">
                <div className="flex flex-col gap-[var(--space-3)]">
                  <div className="grid grid-cols-2 gap-[var(--space-2)]">
                    <input
                      id="ce-division-1-name"
                      value={division1Name}
                      onChange={(e) => setDivision1Name(e.target.value)}
                      placeholder="Division 1 name"
                      className={inputClassName}
                    />
                    <input
                      aria-label="Division 1 tag"
                      value={division1Tag}
                      onChange={(e) => setDivision1Tag(e.target.value)}
                      placeholder="Tag, e.g. Open"
                      className={inputClassName}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-[var(--space-2)]">
                    <input
                      aria-label="Division 2 name"
                      value={division2Name}
                      onChange={(e) => setDivision2Name(e.target.value)}
                      placeholder="Division 2 name"
                      className={inputClassName}
                    />
                    <input
                      aria-label="Division 2 tag"
                      value={division2Tag}
                      onChange={(e) => setDivision2Tag(e.target.value)}
                      placeholder="Tag, e.g. Open"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </FormField>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-athlo-line-subtle bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-3)]">
        <button
          type="submit"
          className="min-h-[44px] w-full rounded-athlo-md bg-athlo-lime px-[var(--space-5)] font-body font-semibold text-athlo-text-on-lime transition-all hover:-translate-y-px hover:shadow-athlo-lime"
        >
          Publish event
        </button>
      </div>
    </form>
  );
}
