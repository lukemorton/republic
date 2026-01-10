import { greeting } from "@republic/core";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Republic</h1>
      <p>{greeting("Republic")}</p>
      <p>
        A batteries-included web framework designed for human-led, AI-assisted
        development.
      </p>
    </main>
  );
}
