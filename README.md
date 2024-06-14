# Token Builder

Project to replace my Photoshop token template, taking in an image and generating a 250px x 250px bordered image for D&D.

## Development Environment

- Node: v22.3.0
- NPM: v10.8.1

## Setup

- Install: `npm i`
- Compile: `npm run build`
- Start: `npm start` will take arguments from dotenv and generate tokens

## CLI

- `token-builder`
  - Flags
    - `-h`: displays help
    - `-V`: displays version
    - `-d`: will remove the images used to make the tokens after tokens have been saved
  - Arguments
    - Required: `--in <PATH_TO_IMAGES_DIR_TO_CONVERT>`: path to directory of images to convert
    - Required: `--out "<PATH_TO_IMAGES_DIR_TO_SAVE>`: directory to save tokens to

### Example

`token-builder --in ./ --out ../tokens -d`: Takes all of the images in the current directory, deletes the source images, and saves tokenized versions of those images to the `tokens` directory in the parent directory.

## Testing

`npm test`

### Babel

The babel dependency is entirely for jest to make use of Typescript. This is not for production facing code.