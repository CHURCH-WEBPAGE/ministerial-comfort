import { readFile } from 'fs/promises';
import path from 'path';

export async function readDataJson<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'data', relativePath);
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function readDataText(relativePath: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'data', relativePath);
  return readFile(filePath, 'utf-8');
}
