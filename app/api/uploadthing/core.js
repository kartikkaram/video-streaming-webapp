import { createUploadthing} from "uploadthing/next";
import { authService} from "@/lib/auth-service";
import { connect } from "@/db_connection/db_connection";
import { Stream } from "@/models/stream.model";
 
const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ 
    image: { 
      maxFileSize: "4MB", 
      maxFileCount: 1 
    } 
  })
    .middleware(async () => {
      const self = await authService();
 if (!self) throw new Error("Unauthorized");
 
      return { user:self }
    })
    .onUploadComplete(async ({ metadata, file }) => {
       try {
    await connect();

    if (!metadata?.user?._id) {
      throw new Error("Missing user ID");
    }

    await Stream.findOneAndUpdate(
      { ownerid: metadata.user._id },
      { thumbnail: file.ufsUrl }
    );

    return { fileUrl: file.ufsUrl };
  } catch (err) {
    console.error("UploadThing onUploadComplete error:", err);
    throw err;
  }
    })
} ;
 
