const fs = require("fs"),
  sg = require("any-steganography"),
  prompt = require("prompt");

const file = "./images/1.jpg",
  output = "./images/decoded1.jpg";

const key = "<encryption key with length 128>";

function encodeImage() {
  const buffer = sg.write(file, "message123124152", key);

  prompt.start();
  prompt.get(
    ["inputPath", "outputPath", "filePath"],
    function (err, result) {}
  );

  fs.writeFile(output, buffer, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

function decodeImage() {
  const buffer = fs.readFileSync(output);
  const message = sg.decode(buffer, "jpg", key);
  console.log(message);
}

module.exports = {
  encodeImage,
  decodeImage,
};
