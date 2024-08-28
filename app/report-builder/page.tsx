"use client";

import { FlexboxSpacer } from "../components/FlexboxSpacer"; // Make sure this import is necessary

export default function ImportResume() {
  // Define the links for each item
  const links = {
    Hematology: "/hematology",
    Serology: "/serology",
    Urinalysis: "/urinalysis",
    Chemistry: "/chemistry",
    Rarasitology: "/rarasitology",
    microbiology: "/microbiology",
    Hormon: "/hormon",
    Electrolyte: "/electrolyte",
  };

  return (
    <main className="flex flex-col items-center lg:h-[520px] lg:justify-center">
      <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl text-center">
        LAB TESTS
      </h1>
      
      <div className="mx-auto mt-4 max-w-3xl rounded-md border border-gray-200 px-10 py-10 text-start shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(links).map(([title, href]) => (
            <a
              key={title}
              href={href}
              className="block p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-colors"
            >
              <h1 className="font-semibold text-gray-900">{title}</h1>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
