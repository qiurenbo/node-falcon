const fs = require("fs");

const writeStreamToDisk = async (stream, path) => {
  var writeStream = fs.createWriteStream(path, { flags: "w" });

  return new Promise((resolve, reject) => {
    stream.pipe(writeStream);

    writeStream.on("finish", () => {
      resolve();
    });
  });
};

module.exports = { writeStreamToDisk };
