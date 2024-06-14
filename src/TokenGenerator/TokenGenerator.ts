import sharp from 'sharp';

export class TokenGenerator {
  static getExportFileExtension() {
    return '.png';
  }

  static async getToken(
    fileBuffer: Buffer,
    tokenTemplateBuffer: Buffer,
    tokenSize: number,
    innerTokenRadius: number
  ): Promise<Buffer> {
    const circleShape = Buffer.from(
      `<svg><circle cx="${innerTokenRadius}" cy="${innerTokenRadius}" r="${innerTokenRadius}" /></svg>`
    );

    const reshaped = await sharp(fileBuffer)
      .resize(
        tokenSize,
        tokenSize,
        {
          fit: 'cover',
          position: 'top'
        }
      )
      .composite([{
        input: circleShape,
        blend: 'dest-in'
      }])
      .png()
      .toBuffer();

    const composite = await sharp(reshaped)
      .composite([
        { input: tokenTemplateBuffer }
      ])
      .png()
      .toBuffer();

    return composite;
  }
}
