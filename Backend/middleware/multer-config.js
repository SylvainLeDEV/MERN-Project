// const multer = require('multer');
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
//         callback(null, '../client/public/upload/profil');
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         const nameEdit = name.split("." + extension).join("")
//         callback(null, nameEdit + Date.now() + '.' + extension);
//     }
// });
//
// module.exports = multer({storage: storage}).single('file');