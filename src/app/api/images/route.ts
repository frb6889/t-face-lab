import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 定义所有文件夹的名称
const folders = ['p111', 'p112', 'p113', 'p121', 'p122', 'p123', 'p131', 'p132', 'p133'];

// 允许的图片文件扩展名
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp','.heic'];

export async function GET(request: Request) {
    const url = new URL(request.url);
    const folder = url.searchParams.get('folder') || 'p122';  // 默认文件夹
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
  
    if (!folders.includes(folder)) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }
  
    const folderPath = path.join(process.cwd(), 'public', folder);
    const imageFiles = fs.readdirSync(folderPath)
      .filter(file => allowedExtensions.includes(path.extname(file).toLowerCase())); 
  
    const paginatedImages = imageFiles.slice((page - 1) * pageSize, page * pageSize)
      .map(file => `/${folder}/${file}`);
  
    return NextResponse.json(paginatedImages);
  }
  
