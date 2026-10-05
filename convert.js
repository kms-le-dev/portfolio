const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'src', 'assets');
const outputFolder = path.join(folder, 'optimized');
const technologyFolder = path.join(folder, 'technologies');
const optimizedTechnologyFolder = path.join(outputFolder, 'technologies');

fs.mkdirSync(outputFolder, { recursive: true });
fs.mkdirSync(optimizedTechnologyFolder, { recursive: true });

async function convertImages() {
  const files = fs.readdirSync(folder).filter(file => /\.(png|jpe?g|webp)$/i.test(file));
  const technologyFiles = fs.readdirSync(technologyFolder).filter(file => /\.(png|jpe?g|webp)$/i.test(file));

  await Promise.all([
    ...files.map(async file => {
      const parsedFile = path.parse(file);
      const outputName = `${parsedFile.name}-${parsedFile.ext.slice(1).toLowerCase()}.webp`;
      await sharp(path.join(folder, file))
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 75, effort: 4 })
        .toFile(path.join(outputFolder, outputName));
      console.log(`${file} -> optimized/${outputName}`);
    }),
    ...technologyFiles.map(async file => {
      const parsedFile = path.parse(file);
      const outputName = `${parsedFile.name}.webp`;
      await sharp(path.join(technologyFolder, file))
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 75, effort: 4 })
        .toFile(path.join(optimizedTechnologyFolder, outputName));
      console.log(`technologies/${file} -> optimized/technologies/${outputName}`);
    }),
  ]);
}

convertImages().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
 