import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center lg:h-[520px]  justify-center bg-dot">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full p-6">
        <Link href="/resume-parser" className="bg-blue-300 p-6 rounded-lg shadow-lg hover:shadow-inner transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Medical</h2>
          <p className="text-gray-600">
          Click here to build medical standard laboratory report
          </p>
        </Link>
        <Link href="/report-builder"  className="bg-blue-300 p-6 rounded-lg shadow-xl hover:shadow-inner transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Laboratory</h2>
          <p className="text-gray-600">
          Click here to build  laboratory report
          </p>
        </Link>
      </div>
    </main>
  );
}