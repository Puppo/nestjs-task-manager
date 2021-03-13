import * as bcrypt from 'bcryptjs';

export async function generateSalt(): Promise<string> {
  return await bcrypt.genSalt();
}

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return await bcrypt.hash(password, salt);
}
