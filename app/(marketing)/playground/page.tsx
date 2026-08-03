import type { Metadata } from "next";
import { PlaygroundShell } from "@/components/playground/playground-shell";

export const metadata: Metadata = {
  title: "Playground — Athlo Club",
  description:
    "An interactive demo of Athlo Club — see the athlete and organiser experience side by side, with seeded sample data. No sign-up required.",
};

export default function PlaygroundPage() {
  return <PlaygroundShell />;
}
