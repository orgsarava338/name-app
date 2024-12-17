import { Html } from "@elysiajs/html";
import BaseHtml from "../components/BaseHtml";

export default async function HomePage() {
  return (
    <BaseHtml title="Home">
      <section>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of the Name App.</p>
      </section>
    </BaseHtml>
  );
}
