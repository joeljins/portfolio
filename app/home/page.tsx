"use client";
import Image from "next/image";
import { useState, useEffect, useRef} from "react";

// Carousel imports
import {
  Carousel,CarouselContent,
  CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import ImageGallery from "react-image-gallery";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Test() {
    const [langImgs, setLangImages] = useState<GalleryItem[]>([]);
    const [frameImgs, setFrameImages] = useState<string[]>([]);
    

useEffect(() => {
    fetch("/api/images")
        .then((res) => res.json())
        .then((files) => {
            console.log("Received images")

            const frames = setFrameImages(files.languages);
            const languages = files.languages.map((lang: string) => ({
                original: `/languages/${lang}`,
                thumbnail: `/languages/${lang}`,
                thumbnailHeight: `100px`,
                thumbnailWidth: `100px`,
                originalHeight: `100px`,
                originalWidth: `100px`,
 
            }));
            console.log("imgs -> Gallery Items")
            console.log(languages);
            console.log(frames);
            setLangImages(languages);
        });
}, []);

    function renderImages(images: string[], folder: string) {
        return images.map((img) => (
            <Image
                key={img}
                src={`/${folder}/${img}`}
                alt={img}
                width={100}
                height={100}
            />
        ));
    }

function renderCarousel(images: string[], folder: string, size=50) {
  return images.map((item) => (
    <CarouselItem key={item} className="basis-auto pl-1">
      <Tooltip>
        <TooltipTrigger>
          <img
            src={`/${folder}/${item}`}
            width={size}
            height={size}
            alt={item}
            className={`w-[${size}px] h-[${size}px] object-cover rounded-md`}
          />
        </TooltipTrigger>
        <TooltipContent>
          {item}
        </TooltipContent>
      </Tooltip>
    </CarouselItem>
  ));
}
    
    const galleryRef = useRef<ImageGalleryRef>(null);

return (
  <div className="w-[clamp(300px,40%,800px)] mx-auto flex flex-col justify-center
  ">

    <div id="box-1" className="h-[500px] flex flex-col">

      <div id="profile" className="justify-center">
        <p>Hello, I'm Joel</p>

        <Card className="w-fit h-fit m-4 border border-gray-500 p-2 margin-">
          <CardContent>
            <img src="./temp.png" alt="Profile Image" width={200} height={200} />
          </CardContent>
        </Card>

      </div>

      <div id="tab-container" className="flex-2 height-[100px]">
        <Tabs>

          <TabsList>
              <TabsTrigger value="account">Languages</TabsTrigger>
              <TabsTrigger value="account-2">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="account">

            <Card>
              <CardContent className="flex justify-center text-sm text-muted-foreground w-fit h-fit">

              <TooltipProvider>
                  <Carousel
                    className="flex justify-center"
                    plugins={[
                    Autoplay({delay: 2000,}),
                    ]}>

                    <CarouselContent className="-ml-1">
                      {renderCarousel(frameImgs, 'languages', 50)}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>    
              </TooltipProvider>

              </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="account-2">
          </TabsContent>
            
        </Tabs>
      </div>


    </div>

    <div id="box-2">
        
    </div>

  </div>
);
}