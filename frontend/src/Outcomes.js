import { useParams } from "react-router-dom";

export default function Outcomes() {
    let params = useParams();

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Events: {params.sportId} {params.eventId}</h2>
      </main>
    );
  }