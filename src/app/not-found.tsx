import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 · Page not found</span>
      <h1>Looks like this page wandered off.</h1>
      <p>The page you were looking for isn’t here. Let’s get you back to the portfolio.</p>
      <Link className="button button-primary" href="/">
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
