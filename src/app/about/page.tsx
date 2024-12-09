import Link from "next/link";

export default function About() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>About Page</h1>
      <p>This is the About Page.</p>
      <Link href="/">Go back to Home Page</Link>
    </div>
  );
}
