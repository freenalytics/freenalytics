import path from 'path';
import { generateSpecFile, generateSpec } from './data';

const filePath = path.join(process.cwd(), process.argv[2]);
generateSpecFile(generateSpec(), filePath);
