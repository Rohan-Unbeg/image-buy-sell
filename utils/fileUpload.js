import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "content");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".mp4",
    ".mkv",
    ".mov",
    ".wmv",
    ".flv",
];
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "video/mp4",
    "video/x-matroska",
    "video/quicktime",
    "video/x-ms-wmv",
    "video/x-flv",
];

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = file.mimetype;
        if (
            allowedExtensions.includes(ext) &&
            allowedMimeTypes.includes(mime)
        ) {
            return cb(null, true);
        }
        cb(
            "Only image and video files are supported (jpg, png, gif, bmp, webp, mp4, mkv, mov, wmv, flv)"
        );
    },
}).single("content");

export { upload };
