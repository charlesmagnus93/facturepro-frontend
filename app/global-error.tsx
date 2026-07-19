"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="fr">
      <body className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Une erreur est survenue
          </h2>
          <p className="text-gray-600 mb-6">
            Quelque chose s&apos;est mal passé. Veuillez réessayer.
          </p>
          <button
            onClick={() => unstable_retry()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
