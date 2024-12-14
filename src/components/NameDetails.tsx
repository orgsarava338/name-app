import { Html } from "@elysiajs/html";

export default function NameDetails() {
  try {
    return (
      <section
        hx-get="/api/name"
        hx-trigger="load"
        hx-target="#name-cards-container"
        hx-swap="outerHTML"
      >
        <div id="name-cards-container">
          <p>Loading...</p>
        </div>
      </section>
    );
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return <section>{error.message}</section>;
  }
}
