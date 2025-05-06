import { Hono } from "hono";
import type { Bindings } from "./types";
import { Home } from "./views/Home";
import { Result } from "./ui/components/Result";
import { createLink } from "./services/links";

const app = new Hono<{ Bindings: Bindings }>();
app.get("/", (c) => {
  return c.html(`
      ${Home()}
    `);
});

app.post("/shorten", async (c) => {
  const host = c.req.url;
  const baseURl = new URL("/", host);
  const url = (await c.req.formData()).get("url") as string;
  if (!url) {
    return c.html(`
      <p>URL is required</p>
    `);
  }
  try {
    const result = await createLink(url, c);
    if (result) {
      return c.html(`
        ${Result(baseURl + result.short_url)}
      `);
    } else {
      return c.html(`
        <p>Failed to create link</p>
      `);
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return c.html(`
      <p>${errorMessage}</p>
    `);
  }
});
app.get("/urls", async (c) => {
  const host = c.req.url;
  const baseURl = new URL("/", host);
  const urls = await c.env.DB.prepare("SELECT * FROM links").all();
  return c.html(`
    <h1>URLs</h1>
    ${urls.results
      .map((url) => {
        return `
          <p>${baseURl + (url as { short_url: string }).short_url}</p>
        `;
      })
      .join("")}
  `);
});

app.get("/:short_url", async (c) => {
  const short_url = (c.req.param("short_url") as string) || undefined;

  if (!short_url) {
    return c.redirect("/");
  }

  const link = await c.env.DB.prepare(
    "SELECT url FROM links WHERE short_url = ?"
  )
    .bind(short_url)
    .first();
  if (link) {
    await c.env.DB.prepare(
      "UPDATE links SET clicks = clicks + 1 WHERE short_url = ?"
    )
      .bind(short_url)
      .run();
    return c.redirect(link.url as string);
  }
});

export default app;
