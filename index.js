const prompt = require("prompt"),
  sg = require("./steganography");

console.log(`
    1.Encode image
    2.Decode image
    `);

prompt.start();

prompt.get(["mode"], function (err, result) {
  switch (+result.mode) {
    case 1:
      sg.encodeImage();
      break;
    case 2:
      sg.decodeImage();
      break;
    default:
      return;
  }
});
