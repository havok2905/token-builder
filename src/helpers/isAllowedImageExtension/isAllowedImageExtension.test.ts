import { isAllowedImageExtension } from './isAllowedImageExtension';

describe('isAllowedImageExtension', () => {
  it ('should handle an empty string', () => {
    expect(isAllowedImageExtension('')).toEqual(false);
  });

  it ('should be false without a leading period', () => {
    expect(isAllowedImageExtension('png')).toEqual(false);
  });

  it ('should handle .png', () => {
    expect(isAllowedImageExtension('.png')).toEqual(true);
  });

  it ('should handle .jpg', () => {
    expect(isAllowedImageExtension('.jpg')).toEqual(true);
  });

  it ('should handle .jpeg', () => {
    expect(isAllowedImageExtension('.jpeg')).toEqual(true);
  });

  it ('should handle .webp', () => {
    expect(isAllowedImageExtension('.webp')).toEqual(true);
  });
});
