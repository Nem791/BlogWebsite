var path = require('path');

const fileUploadAsync = async (image) => {
    console.log("image: ", image);
    console.log("__dirname: ", __dirname);
    new Promise((resolve, reject) => {
        return image.mv(path.join(__dirname, '..', '/public/upload/', image.name), (err) => {
            if (err) {
                console.error(err);

                return;
            }
        });
    });
}
module.exports = fileUploadAsync;