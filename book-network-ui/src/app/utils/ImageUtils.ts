export class ImageUtils {
  static blobToImage(blob: string) {
    return `data:image/png;base64, ${blob}`;
  }
}
