import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const dirName = dirname(fileURLToPath(import.meta.url));
