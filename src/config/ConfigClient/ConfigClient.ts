import dotenv from 'dotenv';

import { iProjectConfiguration } from "../types";

export class ConfigClient {
  static init(): void {
    dotenv.config();
  }

  static getConfig(): iProjectConfiguration {
    const projectConfiguration: iProjectConfiguration = {
      tokenInDir: process.env.TOKEN_IN_DIR ?? '',
      tokenOutDir: process.env.TOKEN_OUT_DIR ?? ''
    }

    return projectConfiguration;
  }
}
