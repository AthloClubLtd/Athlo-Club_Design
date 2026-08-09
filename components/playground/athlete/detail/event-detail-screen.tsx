"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Cloud, Lock, Mail, MapPin, Sun, Zap } from "lucide-react";
import { useEventsStore } from "@/lib/playground/events-store";
import { SPORT_FILTERS, DIFFICULTY_FILTERS } from "@/lib/playground/types";
import { formatClosesIn, formatEventDateLine, formatPrice, formatTimeRange } from "@/lib/playground/format";
import { SPORT_ICONS } from "@/components/playground/athlete/sport-icons";
import { EventDetailHero } from "@/components/playground/athlete/detail/event-detail-hero";
import { DetailSection } from "@/components/playground/athlete/detail/detail-section";
import { PriceRow } from "@/components/playground/athlete/detail/price-row";
import { DivisionRow } from "@/components/playground/athlete/detail/division-row";
import { HostCard } from "@/components/playground/athlete/detail/host-card";
import { MetaStat } from "@/components/playground/athlete/detail/meta-stat";
import { AttendeeAvatars } from "@/components/playground/athlete/detail/attendee-avatars";
import { StickyActionBar } from "@/components/playground/athlete/detail/sticky-action-bar";
import { CollapsibleSection } from "@/components/playground/athlete/detail/collapsible-section";
import { ReadMoreText } from "@/components/playground/athlete/detail/read-more-text";
import { DetailToast } from "@/components/playground/athlete/detail/detail-toast";
import { MoreMenu } from "@/components/playground/athlete/detail/more-menu";

export function EventDetailScreen({ eventId, onBack }: { eventId: string; onBack: () => void }) {
  const { getEvent, toggleReservation, reservedEventIds } = useEventsStore();
  const event = getEvent(eventId);
  const [toast, setToast] = useState<string | null>(null);
  const leaderboardsRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  };

  if (!event) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-[var(--space-3)] px-[var(--space-4)] pb-[var(--space-3)]">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-11 w-11 items-center justify-center rounded-athlo-pill border border-athlo-line-strong text-athlo-text-primary"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-[var(--space-3)] px-[var(--space-6)] text-center">
          <p className="font-display text-athlo-body-lg font-semibold text-athlo-text-primary">Event not found</p>
          <p className="font-body text-athlo-body text-athlo-text-secondary">
            This might have been removed or the link is out of date.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-[var(--space-2)] min-h-[44px] rounded-athlo-md bg-athlo-lime px-[var(--space-5)] font-body font-semibold text-athlo-text-on-lime"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  const isCompetition = event.type === "competition";
  const isReserved = reservedEventIds.has(event.id);
  const levelLabel = DIFFICULTY_FILTERS.find((d) => d.value === event.level)?.label ?? event.level;
  const timeLine = formatTimeRange(event.time, event.endTime, event.timezoneLabel);
  const WeatherIcon = event.weatherIcon === "sun" ? Sun : Cloud;

  const mailHref = event.organiser
    ? `mailto:${event.organiser.email}?subject=${encodeURIComponent(event.title)}`
    : undefined;

  const handleReserve = () => {
    toggleReservation(event.id);
    if (isReserved) {
      showToast(isCompetition ? "Registration cancelled" : "Reservation cancelled");
    } else {
      showToast(isCompetition ? "You're registered!" : "You're going!");
    }
  };

  const handleMoreSelect = (item: string) => showToast(`${item} — demo only`);
  const handleTicketTap = () => showToast("Demo only");
  const handleClubRowTap = () => showToast("Club pages — coming soon");
  const handleScrollToLeaderboards = () => leaderboardsRef.current?.scrollIntoView({ block: "start" });

  return (
    <div className="relative flex h-full flex-col">
      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <EventDetailHero
          event={event}
          onBack={onBack}
          onShowLeaderboards={isCompetition ? handleScrollToLeaderboards : undefined}
          onShare={isCompetition ? () => showToast("Share — demo only") : undefined}
        />

        {/* Tag row — display only (filters live on Discover), reusing the
            same chip visual language. */}
        <div className="flex flex-wrap gap-[var(--space-2)] px-[var(--space-4)] pt-[var(--space-4)]">
          {event.sports.map((sport) => {
            const Icon = SPORT_ICONS[sport];
            const label = SPORT_FILTERS.find((s) => s.value === sport)?.label ?? sport;
            return (
              <span
                key={sport}
                className="flex items-center gap-[var(--space-2)] rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-4)] py-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-text-secondary"
              >
                <Icon size={14} />
                {label}
              </span>
            );
          })}
          <span className="rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-4)] py-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-text-secondary">
            {levelLabel}
          </span>
        </div>

        <h1 className="px-[var(--space-4)] pt-[var(--space-4)] font-display text-athlo-h3 font-bold text-athlo-text-primary">
          {event.title}
        </h1>

        <button
          type="button"
          onClick={handleClubRowTap}
          className="flex w-full items-center gap-[var(--space-3)] px-[var(--space-4)] pt-[var(--space-4)] text-left"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-athlo-pill bg-athlo-bg-overlay font-display text-athlo-label font-semibold text-athlo-text-secondary"
          >
            {event.clubName
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 truncate font-body text-athlo-body font-semibold text-athlo-text-primary">
            {event.clubName}
          </span>
          <ChevronRight size={16} aria-hidden="true" className="shrink-0 text-athlo-text-secondary" />
        </button>

        <div className="px-[var(--space-4)] pt-[var(--space-4)]">
          <p className="font-display text-athlo-body-lg font-semibold text-athlo-text-primary">
            {formatEventDateLine(event.date)}
          </p>
          {timeLine && <p className="mt-[var(--space-1)] font-body text-athlo-body text-athlo-text-secondary">{timeLine}</p>}
        </div>

        {isCompetition && event.registrationClosesAt && (
          <div className="mx-[var(--space-4)] mt-[var(--space-4)] flex items-center gap-[var(--space-3)] rounded-athlo-lg border border-athlo-warning/30 bg-athlo-warning/10 px-[var(--space-4)] py-[var(--space-3)]">
            <Zap size={18} aria-hidden="true" className="shrink-0 text-athlo-warning" />
            <div>
              <p className="font-body font-semibold text-athlo-warning">
                Registration {formatClosesIn(event.registrationClosesAt).toLowerCase()}
              </p>
              <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
                Closes {formatEventDateLine(event.registrationClosesAt)} · {event.registeredCount ?? 0} registered so far
              </p>
            </div>
          </div>
        )}

        {/* min-w-0 on every flex-1 item here is load-bearing, not
            decorative: none of these three buttons had it, so each one's
            icon+text content set its own automatic minimum width (CSS
            default for a flex item with visible overflow), and the three
            minimums combined (~313px) didn't fit the row's actual width
            (~301px on a 375px-wide phone). With nothing able to shrink,
            the row silently overflowed its own container and the
            rightmost button (More) spilled ~28px past the phone screen's
            clipped edge — confirmed by direct measurement. min-w-0 lets
            the flex algorithm actually shrink them to their fair share;
            none of the labels use whitespace-nowrap, so if a share ever
            gets tight the text wraps to a second line instead of
            overflowing or truncating unreadably. */}
        <div className="flex gap-[var(--space-2)] px-[var(--space-4)] pt-[var(--space-4)]">
          <button
            type="button"
            onClick={handleReserve}
            className={`flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-[var(--space-2)] rounded-athlo-md px-[var(--space-3)] font-body font-semibold transition-all ${
              isReserved
                ? "border border-athlo-line-strong bg-athlo-bg-overlay text-athlo-text-primary"
                : "bg-athlo-lime text-athlo-text-on-lime hover:-translate-y-px hover:shadow-athlo-lime"
            }`}
          >
            {isReserved ? "Reserved" : isCompetition ? "Register" : "Reserve"}
          </button>
          <a
            href={mailHref}
            aria-label={`Contact ${event.organiser?.name ?? event.clubName}`}
            className="flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-[var(--space-2)] rounded-athlo-md border border-athlo-line-strong bg-athlo-bg-overlay px-[var(--space-3)] font-body font-semibold text-athlo-text-primary transition-colors hover:border-athlo-text-secondary"
          >
            <Mail size={16} aria-hidden="true" />
            Contact
          </a>
          <MoreMenu onSelect={handleMoreSelect} />
        </div>

        <div className="mt-[var(--space-5)] flex items-center justify-between border-y border-athlo-line-subtle bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-4)]">
          <div className="flex items-center gap-[var(--space-3)]">
            <AttendeeAvatars count={isCompetition ? event.registeredCount ?? 0 : event.goingCount ?? 0} />
            <div>
              <p className="font-body font-semibold text-athlo-text-primary">
                {isCompetition ? `${event.registeredCount ?? 0} registered` : `${event.goingCount ?? 0} going`}
              </p>
              <p className="font-body text-athlo-label text-athlo-text-secondary">
                {isCompetition
                  ? `Capacity ${event.capacity ?? "—"}`
                  : `${event.goingFromFollowedCount ?? 0} from clubs you follow`}
              </p>
            </div>
          </div>
          <MetaStat icon={Zap} label={levelLabel} />
        </div>

        <DetailSection label="Location" className="pt-[var(--space-6)]">
          {event.location.isVirtual ? (
            <p className="font-body text-athlo-body text-athlo-text-body">
              This is a virtual event — join details are shared after you reserve your spot.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-between gap-[var(--space-4)]">
                <div className="min-w-0">
                  <p className="font-display text-athlo-body font-semibold text-athlo-text-primary">{event.location.name}</p>
                  {event.location.address && (
                    <p className="mt-[var(--space-1)] font-body text-athlo-body text-athlo-text-body">{event.location.address}</p>
                  )}
                  <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-disabled">
                    {event.location.distanceMiles} mi away
                  </p>
                </div>
                {event.weatherTempC !== undefined && (
                  <span className="flex shrink-0 items-center gap-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-text-secondary">
                    <WeatherIcon size={16} aria-hidden="true" />
                    {event.weatherTempC}°
                  </span>
                )}
              </div>
              <div
                aria-hidden="true"
                className="mt-[var(--space-3)] flex h-32 items-center justify-center rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised"
              >
                <MapPin size={24} className="text-athlo-lime" />
              </div>
            </>
          )}
        </DetailSection>

        <DetailSection label="About" className="pt-[var(--space-6)]">
          {event.aboutText ? (
            isCompetition ? (
              <ReadMoreText text={event.aboutText} />
            ) : (
              <p className="font-body text-athlo-body text-athlo-text-body">{event.aboutText}</p>
            )
          ) : (
            <p className="font-body text-athlo-body text-athlo-text-secondary">No description yet.</p>
          )}
        </DetailSection>

        {!isCompetition && event.tickets && event.tickets.length > 0 && (
          <DetailSection label="Tickets" className="pt-[var(--space-6)]">
            <div className="flex flex-col gap-[var(--space-3)]">
              {event.tickets.map((ticket) => (
                <PriceRow key={ticket.name} ticket={ticket} onTap={handleTicketTap} />
              ))}
            </div>
          </DetailSection>
        )}

        {isCompetition && event.divisions && event.divisions.length > 0 && (
          <DetailSection label="Divisions & Eligibility" className="pt-[var(--space-6)]">
            <CollapsibleSection label="View divisions">
              {event.divisions.map((division) => (
                <DivisionRow key={division.name} division={division} />
              ))}
            </CollapsibleSection>
          </DetailSection>
        )}

        {isCompetition && event.leaderboard && (
          <DetailSection label="Leaderboards" className="pt-[var(--space-6)]">
            <div ref={leaderboardsRef} className="flex items-center gap-[var(--space-3)] rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-4)]">
              {event.leaderboard.locked && (
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-athlo-pill bg-athlo-bg-overlay text-athlo-text-secondary"
                >
                  <Lock size={16} />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-display text-athlo-body font-semibold text-athlo-text-primary">Live leaderboard</p>
                <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
                  {event.leaderboard.unlocksLabel}
                </p>
              </div>
              <span className="shrink-0 rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-3)] py-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-text-secondary">
                {formatEventDateLine(event.leaderboard.unlocksAt)}
              </span>
            </div>
          </DetailSection>
        )}

        {isCompetition && event.tickets && event.tickets.length > 0 && (
          <DetailSection label="Entry Fees" className="pt-[var(--space-6)]">
            <div className="flex flex-col gap-[var(--space-3)]">
              {event.tickets.map((ticket) => (
                <PriceRow key={ticket.name} ticket={ticket} onTap={handleTicketTap} />
              ))}
            </div>
            <p className="mt-[var(--space-3)] font-body text-athlo-label text-athlo-text-disabled">
              Fee is per athlete, per division entered. Includes competition entry, warm-up area access and an official
              results certificate.
            </p>
          </DetailSection>
        )}

        {(event.organiser || (event.partners && event.partners.length > 0)) && (
          <DetailSection label="Hosted By" className="py-[var(--space-6)]">
            <div className="flex flex-col gap-[var(--space-3)]">
              {event.organiser && <HostCard host={event.organiser} clubId={event.clubId} />}
              {event.partners?.map((partner) => <HostCard key={partner.name} host={partner} />)}
            </div>
          </DetailSection>
        )}
      </div>

      <StickyActionBar
        priceLabel={formatPrice(event.price)}
        priceSubLabel={isCompetition ? "Entry fee · per athlete" : "Spot reservation"}
        ctaLabel={isCompetition ? "Register" : "Reserve spot"}
        ctaActiveLabel={isCompetition ? "Registered" : "Reserved"}
        ctaActive={isReserved}
        onCta={handleReserve}
      />

      <DetailToast message={toast} />
    </div>
  );
}
