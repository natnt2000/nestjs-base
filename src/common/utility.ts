import { config } from 'dotenv';
import { createCipheriv, createDecipheriv } from 'crypto';

config();

const iv = Buffer.from(JSON.parse(process.env.CRYPTO_IV));
const key = Buffer.from(JSON.parse(process.env.CRYPTO_KEY));
const algorithm = 'aes-256-cbc';

const encryptPassword = (password: string): string => {
  const cipher = createCipheriv(algorithm, key, iv);

  let encryptedPassword = cipher.update(password, 'utf-8', 'base64');

  encryptedPassword += cipher.final('base64');

  return encryptedPassword;
};

const comparePassword = (
  encryptedPassword: string,
  password: string,
): boolean => {
  const decipher = createDecipheriv(algorithm, key, iv);

  let decryptedData = decipher.update(encryptedPassword, 'base64', 'utf-8');

  decryptedData += decipher.final('utf-8');

  return decryptedData === password;
};

const trimSpecialCharactersWhenSearch = (search: string) => {
  if (!search) {
    return '';
  }

  return search.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export { encryptPassword, comparePassword, trimSpecialCharactersWhenSearch };
