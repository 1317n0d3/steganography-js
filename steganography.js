const fs = require("fs"),
  sg = require("any-steganography"),
  http = require('http'),
  open = require('open');

function generateRandomKey() {
  let key = '';
  while(key.length < 32) {
    key += Math.random().toString(36).substring(2,6);
  }
  return key
}

function encodeImage(inputImg, outputImg, secretFile) {
  let secretData = fs.readFileSync(secretFile, "utf8");

  const key = generateRandomKey();

  const buffer = sg.write(inputImg, secretData, key);

  console.log(`Save this key to decode image:\n ${key}`)

  fs.writeFile(outputImg, buffer, (err) => {
    if (err) throw err

    fs.readFile(outputImg, function(err, data) {
      if (err) throw err
      http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data)
      }).listen(8124)
      console.log('Server running at http://localhost:8124/')
      open('http://localhost:8124/')
    })
  });
}

function decodeImage(key, imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const secretData = sg.decode(buffer, "jpg", key);
  console.log(secretData);
}

module.exports = {
  encodeImage,
  decodeImage,
};
