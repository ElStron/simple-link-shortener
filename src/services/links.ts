import { Context } from "hono";

export const createLink = async (url: string, c:Context) => {
    try{
        const linkExists = await c.env.DB.prepare('SELECT * FROM links WHERE url = ?').bind(url).first()
        if (linkExists) {
            return {
                short_url: linkExists.short_url
            }
        }
        const generatedId = Math.random().toString(36).substring(2, 7)
        await c.env.DB.prepare('INSERT INTO links (url, short_url) VALUES (?, ?)').bind(url, generatedId).run()

        return { short_url: generatedId }

    }
    catch{
        return null
    }
}