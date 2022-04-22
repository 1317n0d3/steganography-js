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
      prompt.start();
      prompt.get(
        ["inputImagePath", "outputImagePath", "secretFilePath"],
        function (err, result) {
          sg.encodeImage(result.inputImagePath, result.outputImagePath, result.secretFilePath);
        }
      );
      break;
    case 2:
      prompt.start();
      prompt.get(["imagePath", "key"],
        function (err, result){
          sg.decodeImage(result.key, result.imagePath);
        });
      break;
    default:
      return;
  }
});
