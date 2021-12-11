// const multer = require('multer');
// const path = require("path");
// const fs = require("fs");
//
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png',
//     'image/gif' : 'gif'
// };
//
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//        const targetPath = path.join(__dirname, "../client/public/uploads/posts/");
//         callback(null, targetPath);
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         const nameEdit = name.split("." + extension).join("")
//         callback(null, nameEdit + Date.now() + '.' + extension);
//         const fileTest = req.file.path;
//         fs.appendFile(nameEdit,  fileTest, err => {
//             if (err) return handleError(err, res);
//         });
//     }
// });
//
//
//
// module.exports = multer({storage: storage}).single('file');