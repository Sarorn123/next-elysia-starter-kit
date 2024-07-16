"use server"

import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3"
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from "./env";

const Bucket = env.R2_BUCKET

export async function uploadFile(file: File) {
    const ex = file.name.split(".")[1]
    const orgName = file.name.split(".")[0]
    const Key = `images/${orgName.replaceAll(" ", "-") + Date.now().toString()}.${ex}`
    const params = {
        Bucket,
        Key,
        Body: file,
    };
    const parallelUploads3 = new Upload({
        client: s3,
        params
    });
    parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
    });

    return parallelUploads3.done().then(async () => {
        return await getSignedUrl(s3, new GetObjectCommand({ Bucket, Key }))
    })
}

export async function deleteFile(url: string) {
    const Key = "/images" + url.split("/images")[1]
    await s3.send(new DeleteObjectCommand({ Bucket, Key })).then(() => console.log("delete success")).catch((err) => console.log("delete error", err))
}