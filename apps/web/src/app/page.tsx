"use client";

import { useEffect, useState } from "react";
import type { User } from "@repo/contracts";

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  service: string;
  contractIntegrationTest: {
    dummyUser: Partial<User>;
  };
}

export default function Home() {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/health")
      .then((res) => res.json())
      .then((data: HealthCheckResponse) => setHealth(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Entrepreneur–Investor Platform</h1>
      <h2>Health Check (Typed via @repo/contracts)</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {health ? (
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
          {JSON.stringify(health, null, 2)}
        </pre>
      ) : (
        !error && <p>Loading health check…</p>
      )}
    </main>
  );
}
