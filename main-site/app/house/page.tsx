import Link from "next/link";

export default function HousePage() {
  return (
    <main className="house-arrival">
      <section className="arrival-window" aria-label="House arrival">
        <div className="arrival-threshold">
          <p>Black Gold Entrance Way</p>
          <h1>HOUSE OF GOLD</h1>
          <Link href="/house/entrance">Approach the Door</Link>
        </div>
      </section>
    </main>
  );
}