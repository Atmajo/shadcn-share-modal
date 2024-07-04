"use client";

import ShareComp from "@/components/share-component";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState(false);
  return (
    <main className="flex flex-col justify-center items-center px-4 md:px-28 lg:px-44 py-20">
      <div className="relative flex flex-col justify-center items-center max-w-2xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
          Shadcn Share Modal
        </h1>
        <p className="text-base md:text-lg text-center opacity-80 font-normal mt-2">
          Beautifully designed, customizable share modal for web built on top of
          shadcn-ui and tailwind-css using react-share!
        </p>
        <div className="flex items-center gap-x-4 mt-10">
          <Button onClick={() => setCode(false)}>Live Demo</Button>
          <Button variant="secondary" onClick={() => setCode(true)}>
            Code
          </Button>
        </div>
      </div>
      <div className="mt-14">
        <ShareComp link="https://atmajo.tech" />
      </div>
      <div className="relative flex flex-col justify-center items-end max-w-2xl">
        <p className="text-sm text-center opacity-80 font-normal mt-32">
          Built by{" "}
          <Link href="https://github.com/atmajo">
            <span className="underline">Atmajo!</span>
          </Link>
        </p>
      </div>
    </main>
  );
}
