import Link from "next/link";

export default function Page() {
  return (
    <main className="entry-screen">
      <section className="entry-stack" aria-label="House of Gold entry">
        <p className="entry-kicker">Enter the yard</p>
        <h1>HOUSE OF GOLD</h1>
        <Link className="entry-action" href="/house">
          ENTER
        </Link>
      </section>
    </main>
  );
}
