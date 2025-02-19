import { Context } from "hono";
import { generateCryptoId } from "../utils/randomId";
export const createLink = async (url: string, c: Context) => {
    try {
        const cleanUrl = url.trim();

        const linkExists = await c.env.DB.prepare(
            'SELECT short_url FROM links WHERE url = ?'
        ).bind(cleanUrl).first();

        if (linkExists) {
            return { short_url: linkExists.short_url };
        }

        const generatedId = generateCryptoId(5, 7);

        try {
            await c.env.DB.prepare(
                'INSERT INTO links (url, short_url) VALUES (?, ?)'
            ).bind(cleanUrl, generatedId).run();

            return { short_url: generatedId };
        } catch (error) {
            const existingLink = await c.env.DB.prepare(
                'SELECT short_url FROM links WHERE url = ?'
            ).bind(cleanUrl).first();

            if (existingLink) {
                return { short_url: existingLink.short_url };
            }

            throw error; 
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
