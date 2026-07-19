"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Impossible de charger le dashboard
      </h2>
      <button
        onClick={() => unstable_retry()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Réessayer
      </button>
    </div>
  );
}
