export const isAllowedImageExtension = (extension: string) => {
  return (
    extension === '.png' || 
    extension === '.jpg' ||
    extension === '.jpeg' ||
    extension === '.webp'
  );
};
