"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

interface ImageProps {
  folder: string;
  names: string[];
}

function renderImages(images: string[], folder: string) {
  return images.map((img) => (
    <Image
      key={img}
      src={`/${folder}/${img}`}
      alt={img}
      width={150}
      height={150}
    />
  ));
}

export default function ImageScroller({ folder, names }: ImageProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reachedEnd =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    if (reachedEnd) {
      el.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <h2>Infinite Horizontal Scroll</h2>

      <div
        ref={scrollerRef}
        className="
          flex
          w-screen
          overflow-x-auto
          overscroll-contain
          [scrollbar-width:none]
          [-ms-overflow-style:none]
        "
      >
        <div className="flex gap-4">
          {renderImages(names, folder)}
        </div>
      </div>
    </div>
  );
}