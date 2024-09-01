import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 允许的图片文件扩展名
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'];

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);

    const folderPath = path.join(process.cwd(), 'public', 'p122');
    const imageFiles = fs.readdirSync(folderPath)
        .filter(file => allowedExtensions.includes(path.extname(file).toLowerCase())); 

    const paginatedImages = imageFiles.slice((page - 1) * pageSize, page * pageSize)
        .map(file => `/p122/${file}`);

    return NextResponse.json(paginatedImages);
}
