import { Header } from "@/components/Header";
import { InfoContent } from "@/components/InfoContent";

export const metadata = {
  title: "How it works — Bantay Tubig",
  description:
    "How Bantay Tubig monitors water announcements and sends you SMS alerts.",
};

export default function InfoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 py-8">
        <InfoContent backHref="/" backLabel="Back to home" />
      </main>
    </div>
  );
}
