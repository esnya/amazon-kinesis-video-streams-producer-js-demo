import path from 'path';

async function getMediaNode(): Promise<Buffer> {
  const fs = await import('fs');
  return await fs.promises.readFile(path.join(__dirname, '../assets/5s.webm'));
}

async function getMediaBrowser(): Promise<Blob> {
  const { default: url } = await import('../assets/5s.webm');
  return await fetch(url).then(r => r.blob())
}

export default async function getMedia(): Promise<Buffer | Blob> {
  try {
    return await getMediaNode();
  } catch (error) {
    return await getMediaBrowser();
  }
}
