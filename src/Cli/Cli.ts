import { Command } from 'commander';

export interface CliOptions {
  d: boolean;
  in: string;
  out: string;
}

export class Cli {
  static run(): CliOptions {
    const program = new Command();

    program
      .name('token-builder')
      .description('CLI to generate TTRPG tokens from images')
      .version('1.0.1');

    program
      .description('build tokens from images, either from a single image or a directory of images')
      .requiredOption('--in <string>', 'path to directory of images to convert or file to convert')
      .requiredOption('--out <string>', 'path to directory to save images to')
      .option('-d', 'will remove the images used to make the tokens after tokens have been saved');

    program.parse();

    const options = program.opts() as CliOptions;

    return options;
  }
}
