import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: process.env.PREVIEW_CLOUDNAME,
    api_key: process.env.PREVIEW_API_KEY,
    api_secret: process.env.PREVIEW_API_SECRET,
  secure: true
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get("file");

        if (!file || !(file instanceof Blob)) {
            console.log("no hay imagen seleccionada");
            return NextResponse.json({ error: "No se ha subido ninguna imagen" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result as { secure_url: string });
            }).end(buffer);
        });

        console.log(file);

        return NextResponse.json({
            message: "Imagen subida correctamente",
            url: response.secure_url
        });
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
    }
}
