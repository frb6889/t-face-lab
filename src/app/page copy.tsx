"use client";  // 将组件标记为客户端组件

import { useEffect, useState, useRef} from "react";
import Image from "next/image";

const folders = ['p111', 'p112', 'p113', 'p121', 'p122', 'p123', 'p131', 'p132', 'p133'];




export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('p122');

  useEffect(() => {
    fetch(`/api/images?folder=${selectedFolder}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          setImages([]);
        } else {
          setImages(data);
        }
      });
  }, [selectedFolder]);

  return (
    <main className="flex h-screen">
      <div className="w-1/4 p-4 border-r">
        <div className="flex flex-col space-y-2">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`p-2 ${selectedFolder === folder ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4 bg-zinc-50" style={{minHeight:'100vh'}}>
      
              
        
        {/* <div className="grid grid-cols-3 gap-4">
          {images.length === 0 ? (
            <p>No images available</p>
          ) : (
            images.map((src, index) => (
              <div key={index} className="relative w-full h-60">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))
          )}
        </div> */}
      </div>
    </main>
  );
}
