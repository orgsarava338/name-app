import { Html } from "@elysiajs/html";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/" hx-get="/" hx-target="body" hx-push-url="true">
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              hx-get="/about"
              hx-target="body"
              hx-push-url="true"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              hx-get="/contact"
              hx-target="body"
              hx-push-url="true"
            >
              Contact
            </a>
          </li>
          <li>
            <a href="/name" hx-get="/name" hx-target="body" hx-push-url="true">
              Names
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
