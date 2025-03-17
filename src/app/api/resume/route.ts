import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

// Hardcoded file path inside the S3 bucket
const HARD_CODED_FILE_PATH = "resume/Romit_Backend.pdf";
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME ?? "";

export async function GET(): Promise<Response> {
    console.log("hitted the endpoint");
  try {
    if (!BUCKET_NAME) {
      return new NextResponse(
        JSON.stringify({ error: "Missing AWS_BUCKET_NAME" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: HARD_CODED_FILE_PATH,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log("signed url generated successfully! ", signedUrl);

    return new Response(JSON.stringify({ url: signedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}