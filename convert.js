const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folder = './src/assets'; // dossier avec tes images

fs.readdirSync(folder).forEach(file => {
  if (/\.(png|jpg|jpeg)$/i.test(file)) {
    sharp(path.join(folder, file))
      .toFormat('webp')
      .webp({ quality: 80 })
      .toFile(path.join(folder, file.replace(/\.(png|jpg|jpeg)/i, '.webp')))
      .then(() => console.log(`${file} converti en WebP`));
  }
});
 