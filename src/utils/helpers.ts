export const getFileExtension = (uri: string): string => {
  const extension = uri.split(".").pop();
  return extension === "jpg" || extension === "jpeg" ? ".jpg" : `.${extension}`;
};
