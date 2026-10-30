import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Back to your tasks</Link>
      </p>
    </section>
  );
}
