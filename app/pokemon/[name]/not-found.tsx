import Link from "next/link";

function NotFound() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-700">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4 text-gray-500">
          The Pokemon you&apos;re looking for doesn&apos;t exist or there&apos;s
          a typo in the name 😿
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-black px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
