import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest){
    const data = request.formData();
    const file: File | null = (await data).get('file') as unknown as File;
    if(!file){
        return NextResponse.json({success: false});
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName: string = 'test' + '.' + file.name.split(".")[1]
    const path = join('/','tmp',fileName);
    writeFile(path, buffer);
    console.log(`${path}`);
    return NextResponse.json({success: true});
}