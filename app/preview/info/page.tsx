import { PreviewHeader } from "@/components/PreviewHeader";
import { InfoContent } from "@/components/InfoContent";

export default function PreviewInfoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <PreviewHeader />
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 py-8">
        <InfoContent backHref="/preview" backLabel="Back to home" />
      </main>
    </div>
  );
}
