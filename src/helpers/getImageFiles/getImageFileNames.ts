import fs, { type PathLike } from 'node:fs';
import path from 'node:path';

import { isAllowedImageExtension } from '../isAllowedImageExtension';

export const getImageFileNames = (dir: PathLike) => {
  return fs.readdirSync(dir).filter((item) => {
    const extension = path.extname(item);
    return isAllowedImageExtension(extension);
  });
};
