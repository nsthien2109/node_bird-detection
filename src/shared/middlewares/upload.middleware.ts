import * as Multer from "multer";

const storage = Multer.memoryStorage();

// combine them to a function upload
const upload = Multer({ storage: storage});
export default upload;