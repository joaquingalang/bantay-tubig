import type { Metadata } from "next";
import { DotGrid } from "@/components/ui/DotGrid";

export const metadata: Metadata = {
  title: "About | Bantay Tubig",
  description: "Learn about Bantay Tubig and how it keeps residents informed about water interruptions.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Page header with dot grid */}
      <div className="relative overflow-hidden border-b border-gray-800 px-4 py-12">
        <DotGrid />
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">About Bantay Tubig</h1>
          <p className="text-gray-400 text-sm">BantayTubig — keeping residents informed.</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-10">

      <div className="flex flex-col gap-8 text-sm text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-base mb-2">The problem</h2>
          <p>
            Residents in our province experience frequent water service interruptions.
            Announcements are posted on a local Facebook page, but most people miss
            them — you have to check manually and hope you catch it in time. This
            leads to residents being caught off guard without stored water.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">What Bantay Tubig does</h2>
          <p>
            Bantay Tubig automatically monitors the local water service Facebook page
            every 30 minutes. When a water interruption announcement is detected,
            it immediately sends an SMS alert to all registered residents — no app
            to open, no feed to check. Just a text message when it matters.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">How it works</h2>
          <ol className="list-decimal list-inside flex flex-col gap-2 text-gray-400">
            <li>An automated workflow checks the Facebook page every 30 minutes.</li>
            <li>Each post is analyzed to detect water interruption language.</li>
            <li>When an alert is found, SMS messages are sent to all registered numbers via Semaphore.</li>
            <li>The alert is also saved so you can review it on your dashboard.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Your data & privacy</h2>
          <p>
            Your mobile numbers are stored securely and are only used to send water
            interruption alerts. They are never shared with third parties. You can
            remove your numbers or delete your account at any time from your profile page.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Technology</h2>
          <p className="text-gray-400">
            Bantay Tubig is built with Next.js, Firebase, and Tailwind CSS. The
            monitoring workflow runs on n8n. SMS delivery is handled by Semaphore,
            a Philippine SMS gateway.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Credits</h2>
          <p className="text-gray-400">
            Built as a community tool to help residents stay informed and prepared.
          </p>
        </section>
      </div>
    </div>
    </div>
  );
}
