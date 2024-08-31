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

  if (!folders.includes(folder)) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  const folderPath = path.join(process.cwd(), 'public', folder);
  const imageFiles = fs.readdirSync(folderPath)
    .filter(file => allowedExtensions.includes(path.extname(file).toLowerCase())); // 过滤掉非图片文件

  const images = imageFiles.map(file => `/${folder}/${file}`);

  return NextResponse.json(images);
}
