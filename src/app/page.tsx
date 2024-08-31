"use client";  // 将组件标记为客户端组件

import { useEffect, useState } from "react";
import Image from "next/image";
import '../styles/global.css';

import { ArrowBottomLeftIcon, ArrowBottomRightIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, RadiobuttonIcon,
  ArrowTopLeftIcon, ArrowUpIcon, ArrowTopRightIcon
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const folders = ['p111', 'p112', 'p113', 'p121', 'p122', 'p123', 'p131', 'p132', 'p133'];

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);  // 增加加载状态
  const [selectedFolder, setSelectedFolder] = useState('p122');

  useEffect(() => {
    setLoading(true);  // 开始加载新图片时设置为true
    fetch(`/api/images?folder=${selectedFolder}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          setImages([]);
        } else {
          setImages(data);
        }
        setLoading(false);  // 图片加载完成后设置为false
      });
  }, [selectedFolder]);

  return (
    <main className="flex h-screen">
      <div className="w-1/4 p-10 border-r justify-center">
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
              variant={`${selectedFolder === 'p111' ?
                "secondary" : "outline"}`}  >
              <ArrowTopLeftIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p112')}
              variant={`${selectedFolder === 'p112' ?
                "secondary" : "outline"}`}  >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p113')}
              variant={`${selectedFolder === 'p113' ?
                "secondary" : "outline"}`}  >
              <ArrowTopRightIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button size="icon"
              onClick={() => setSelectedFolder('p121')}
              variant={`${selectedFolder === 'p121' ?
                "secondary" : "outline"}`}  >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p122')}
              variant={`${selectedFolder === 'p122' ?
                "secondary" : "outline"}`}  >
              <RadiobuttonIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p123')}
              variant={`${selectedFolder === 'p123' ?
                "secondary" : "outline"}`}  >
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button size="icon"
              onClick={() => setSelectedFolder('p131')}
              variant={`${selectedFolder === 'p131' ?
                "secondary" : "outline"}`}  >
              <ArrowBottomLeftIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p132')}
              variant={`${selectedFolder === 'p132' ?
                "secondary" : "outline"}`}  >
              <ArrowDownIcon className="h-4 w-4" />
            </Button>
            <Button size="icon"
              onClick={() => setSelectedFolder('p133')}
              variant={`${selectedFolder === 'p133' ?
                "secondary" : "outline"}`}  >
              <ArrowBottomRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-3/4 h-full p-4 bg-zinc-50" style={{ overflowY: 'scroll' }}>
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            // 显示占位图
            Array(9).fill(0).map((_, index) => (
              <div key={index} className="relative w-full h-60 bg-zinc-100 animate-pulse rounded-lg"></div>
            ))
          ) : images.length === 0 ? (
            <p>No images available</p>
          ) : (
            images.map((src, index) => (
              <div key={index} className="relative w-full h-60 opacity-0 transition-opacity duration-500" style={{ animation: 'fadeIn 2s forwards' }}>
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
    </main>
  );
}