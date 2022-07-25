import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const storage = new GridFsStorage({
  url: `mongodb://localhost:27017/blogwebsite`, // 1st argument
  options: { useNewUrlParser: true }, //2nd argument
  file: (request, file) => {
    const match = ["/image/png", "image/jpg"]; // it means we are storing only teo types of image .png and .jpg
    if (match.indexOf(file.memeType) === -1) {
      // memeType is used for exotension extraction
      return `${Date.now()}-blog-${file.originalname}`; // Date.now()used for avoid the duplicate of image name
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  }, //3rd argument
}); // our file/image is stored in storage variable using multer gridfs storage

// Now we will upload the file to the database using multer
export default multer({ storage });
