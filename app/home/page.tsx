"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Carousel imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import ImageGallery from "react-image-gallery";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Test() {
  const [langImgs, setLangImages] = useState<GalleryItem[]>([]);
  const [frameImgs, setFrameImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((files) => {
        setFrameImages(files.languages);
        const languages = files.languages.map((lang: string) => ({
          original: `/languages/${lang}`,
          thumbnail: `/languages/${lang}`,
          thumbnailHeight: `100px`,
          thumbnailWidth: `100px`,
          originalHeight: `100px`,
          originalWidth: `100px`,
        }));
        setLangImages(languages);
      });
  }, []);

  // Each language icon sits in its own soft tile so the carousel reads as
  // a row of cards rather than bare floating logos.
  function renderCarousel(images: string[], folder: string, size = 44) {
    return images.map((item) => (
      <CarouselItem key={item} className="basis-auto pl-3 first:pl-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex items-center justify-center rounded-xl border border-border/60
                         bg-background/80 shadow-sm transition-transform duration-200
                         hover:-translate-y-0.5 hover:shadow-md"
              style={{ width: size + 24, height: size + 24 }}
            >
              <img
                src={`/${folder}/${item}`}
                width={size}
                height={size}
                alt={item.replace(/\.[^/.]+$/, "")}
                className="object-contain"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className="capitalize">{item.replace(/\.[^/.]+$/, "")}</span>
          </TooltipContent>
        </Tooltip>
      </CarouselItem>
    ));
  }

  const galleryRef = useRef<ImageGalleryRef>(null);

  return (
    <div
      className="w-[clamp(320px,40%,800px)] mx-auto flex flex-col gap-8
                 px-4 py-10"
    >
      {/* Profile */}
      <section
        id="profile"
        className="flex flex-col items-center text-center gap-3"
      >
        <div
          className="relative h-28 w-28 overflow-hidden rounded-full
                     ring-2 ring-border shadow-sm"
        >
          <Image
            src="/temp.png"
            alt="Profile photo"
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Hello, I&apos;m Joel
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Building things with code, one tab at a time.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section id="tab-container" className="flex flex-col gap-4">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Languages</TabsTrigger>
            <TabsTrigger value="account-2">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-4">
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Languages &amp; tools</CardTitle>

              </CardHeader>

              <CardContent className="pt-2 h-fit">
                <TooltipProvider delayDuration={150}>
                  <div className="flex justify-center">
                    <Carousel
                      className="w-fit max-w-full h-fit"
                      opts={{ align: "start", loop: true }}
                      plugins={[Autoplay({ delay: 2000 })]}
                    >
                      <CarouselContent className="-ml-3 py-1">
                        {renderCarousel(frameImgs, "languages", 44)}
                      </CarouselContent>

                      <div className="flex justify-center gap-2 mt-3">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                      </div>
                    </Carousel>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account-2" className="mt-4">
            <Card className="border-border/60 shadow-sm">
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Nothing here yet.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
