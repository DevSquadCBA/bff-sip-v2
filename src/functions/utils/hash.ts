import bcrypt from 'bcryptjs'
export async function hash(str: string): Promise<string> {
    return await bcrypt.hash(str,10);
}

export async function compare(str: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(str, hash);
}