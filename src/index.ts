#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

import { Cli } from './Cli';
import { TokenGenerator } from './TokenGenerator';
import { generateFileName } from './helpers/generateFileName';
import { getImageFileNames } from './helpers/getImageFiles';

const TOKEN_TEMPLATE_FILE_PATH = './assets/token-template.png';
const TOKEN_TEMPLATE_SIZE = 250;
const INNER_TOKEN_TEMPLATE_SIZE = 240; // account for white space for surrounding template shadow

const main = async ({
  destroyOriginalImages,
  inDir,
  outDir
}: {
  destroyOriginalImages: boolean,
  inDir: string,
  outDir: string
}) => {
  // Account for build dir with .. , remove when bundle is generated at root of project
  const inDirPath = path.join(__dirname, '..', inDir);
  const outDirPath = path.join(__dirname, '..', outDir);
  const tokenTemplatePath = path.join(__dirname, '..', TOKEN_TEMPLATE_FILE_PATH);

  const tokenTemplateBuffer = fs.readFileSync(tokenTemplatePath);

  const inDirFileNames = getImageFileNames(inDirPath);

  inDirFileNames.forEach(async (file) => {
    const originalFilePath = path.join(inDirPath, file);
    const imageToTokenizeBuffer = fs.readFileSync(originalFilePath);

    const tokenBuffer = await TokenGenerator.getToken(
      imageToTokenizeBuffer,
      tokenTemplateBuffer,
      TOKEN_TEMPLATE_SIZE,
      INNER_TOKEN_TEMPLATE_SIZE / 2
    );

    const fileName = path.parse(file).name;
    const newFileName = generateFileName(fileName, TokenGenerator.getExportFileExtension());
    const exportPath = path.join(outDirPath, newFileName);

    fs.writeFileSync(exportPath, tokenBuffer);

    if (destroyOriginalImages) {
      fs.rmSync(originalFilePath);
    }
  });
};

const options = Cli.run();

const inDir = options.in ?? '';
const outDir = options.out ?? '';
const destroyOriginalImages = options.d ?? false;

main({
  destroyOriginalImages,
  inDir,
  outDir
});
