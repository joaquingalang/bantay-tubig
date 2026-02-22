import { Header } from "@/components/Header";
import { DashboardSummary, AlertsBadge } from "@/components/DashboardSummary";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              Subscription Settings
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage your water service alert zones and the mobile numbers where
              you receive SMS notifications.
            </p>
          </div>
          <AlertsBadge />
        </div>
        <DashboardSummary />
      </main>
    </div>
  );
}
