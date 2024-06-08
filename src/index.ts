import fs from 'node:fs';
import path from 'node:path';

import { ConfigClient } from './config';
import { TokenGenerator } from './image';

const main = async () => {
  ConfigClient.init();

  const config = ConfigClient.getConfig();
  
  const tokenTemplateSize = 250;
  const innerTokenTemplateSize = 240; // account for white space for surrounding template shadow

  const files = fs.readdirSync(config.tokenInDir).filter((item) => {
    const extension = path.extname(item);

    return (
      extension === '.png' || 
      extension === '.jpg' ||
      extension === '.webp'
    );
  });

  const tokenTemplateFilePath = path.join(__dirname, '..', 'assets', 'token-template.png');
  const tokenTemplateBuffer = fs.readFileSync(tokenTemplateFilePath);

  files.forEach(async (file) => {
    const imageToTokenizeFilePath = path.join(config.tokenInDir, file);
    const imageToTokenizeBuffer = fs.readFileSync(imageToTokenizeFilePath);

    const tokenBuffer = await TokenGenerator.getToken(
      imageToTokenizeBuffer,
      tokenTemplateBuffer,
      tokenTemplateSize,
      innerTokenTemplateSize / 2
    );

    const fileName = path.parse(file).name;
    const newFileName = `${fileName}-token${TokenGenerator.getExportFileExtension()}`;

    const exportPath = path.join(config.tokenOutDir, newFileName);

    fs.writeFileSync(exportPath, tokenBuffer);
  });
};

main();
