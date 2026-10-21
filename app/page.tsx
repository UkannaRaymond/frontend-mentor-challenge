import { Header } from "@/components/card/header";
import { ExtensionList } from "@/components/card/extension-list";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-300 px-4 py-8 md:py-10">
      <h1 className="sr-only">Browser extensions manager</h1>
      <Header />
      <ExtensionList />
    </main>
  );
}
