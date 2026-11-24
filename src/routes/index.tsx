import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manager Software Dashboard" },
      {
        name: "description",
        content:
          "A business dashboard for purchasing, sales, inventory, finance, and workforce tasks.",
      },
      { property: "og:title", content: "Manager Software Dashboard" },
      {
        property: "og:description",
        content:
          "A business dashboard for purchasing, sales, inventory, finance, and workforce tasks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-background">
      <iframe
        className="block h-full w-full border-0"
        src="/manager/index.html"
        title="Manager Software Dashboard"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </main>
  );
}
