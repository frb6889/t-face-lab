"use client";  // 将组件标记为客户端组件

import { useEffect, useState } from "react";
import Image from "next/image";
import  getImageDimensions from 'next/image';
import '../styles/global.css';

import {
  ArrowBottomLeftIcon, ArrowBottomRightIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, RadiobuttonIcon,
  ArrowTopLeftIcon, ArrowUpIcon, ArrowTopRightIcon, Cross2Icon
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const folders = ['p111', 'p112', 'p113', 'p121', 'p122', 'p123', 'p131', 'p132', 'p133'];

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState('p122');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  

  useEffect(() => {
    setLoading(true);
    fetch(`/api/${selectedFolder}?folder=${selectedFolder}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          setImages([]);
        } else {
          setImages(data);
        }
        setLoading(false);
      });
  }, [selectedFolder]);

  /* async function getImageSize(src) {
    const { width, height } = await getImageDimensions(src);
    console.log(`图像宽度：${width}px`);
    console.log(`图像高度：${height}px`);
    console.log('say sth');
  } */

  const handleImageClick = (src: string) => {
    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      
      setSelectedImage(src);
    };
    // getImageSize(src);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  // const isHeightGreater = imageDimensions.height > imageDimensions.width;

  return (
    <main className="flex h-screen">

      {/* 左侧 */}
      <div className="w-1/4 p-10 border-r justify-center" style={{minWidth:'180px'}}>
        <h2 className="mt-4 scroll-m-20 pb-0 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          TFL v1.0.0
        </h2>
        <p className="text-sm text-muted-foreground pb-4">
          TM25 Face Lab
        </p>
        <p className="text-sm text-muted-foreground py-4">
          本网站基于九个头部朝向范围，对互联网上部分现存的托马斯·穆勒照片做了分类。
        </p>
        <p className="text-sm text-muted-foreground py-4">
          点击下方任一按钮，即可选择按钮所指示的特定头部朝向范围的照片。
        </p>
        <div className="flex flex-col space-y-2 justify-between items-center pb-4">
          <div className="flex space-x-2">
            <Button size="icon"
              onClick={() => setSelectedFolder('p111')}
              variant={`${selectedFolder === 'p111' ? "secondary" : "outline"}`}  >
              <ArrowTopLeftIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p112')}
              variant={`${selectedFolder === 'p112' ? "secondary" : "outline"}`}  >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p113')}
              variant={`${selectedFolder === 'p113' ? "secondary" : "outline"}`}  >
              <ArrowTopRightIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button size="icon"
              onClick={() => setSelectedFolder('p121')}
              variant={`${selectedFolder === 'p121' ? "secondary" : "outline"}`}  >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p122')}
              variant={`${selectedFolder === 'p122' ? "secondary" : "outline"}`}  >
              <RadiobuttonIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p123')}
              variant={`${selectedFolder === 'p123' ? "secondary" : "outline"}`}  >
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button size="icon"
              onClick={() => setSelectedFolder('p131')}
              variant={`${selectedFolder === 'p131' ? "secondary" : "outline"}`}  >
              <ArrowBottomLeftIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p132')}
              variant={`${selectedFolder === 'p132' ? "secondary" : "outline"}`}  >
              <ArrowDownIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p133')}
              variant={`${selectedFolder === 'p133' ? "secondary" : "outline"}`}  >
              <ArrowBottomRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 右侧 */}
      
      <div className="w-3/4 h-full" style={{ overflowY: 'scroll' }}>
      <header className="flex justify-between items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            style={{
              position: 'fixed', borderBottom: '0.4px solid #dddddd',
              width: '90%', padding: 10, paddingLeft: 40, paddingRight: 40, zIndex: 40
            }}>
            <div className="flex items-center text-slate-700 font-semibold">
                <p>Gallery</p>
            </div>
            <div className="flex gap-8">

              
            </div>
          </header>
        <div className="p-4 pt-14 bg-zinc-50">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {loading ? (
            Array(9).fill(0).map((_, index) => (
              <div key={index} className="relative w-full h-60 bg-zinc-100 animate-pulse rounded-lg"></div>
            ))
          ) : images.length === 0 ? (
            <p>No images available</p>
          ) : (
            images.map((src, index) => (
              <div key={index} className="relative w-full h-60 opacity-0 transition-opacity duration-500" style={{ animation: 'fadeIn 2s forwards', cursor: 'pointer' }}
                onClick={() => handleImageClick(src)}>
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))
          )}
        </div>
        </div>
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleClose}
          >
            <Button
                
                onClick={handleClose}
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 rounded-full"
              >
            <Cross2Icon className="w-4 h-4" />
            </Button>
            <div className="relative px-20 py-20">
              <Image
                src={selectedImage}
                alt="Selected Image"
               
                height={500}
                width={500}
                className="m-4"
              />
              
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
