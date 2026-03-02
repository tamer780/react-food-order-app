export default function ErrorPage({ title, message }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full bg-white border border-red-100 shadow-lg rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

        <p className="text-sm text-gray-600 bg-red-50 py-2 px-4 rounded-lg mb-6 inline-block">
          {message}
        </p>
      </div>
    </div>
  );
}
