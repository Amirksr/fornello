/** @jest-environment node */
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const run = (path: string, lang?: string) =>
  proxy(new NextRequest(`http://localhost${path}`, { headers: lang ? { "accept-language": lang } : {} }));

describe("proxy", () => {
  it("redirects the root to the negotiated locale", () => {
    const res = run("/", "en-US,en;q=0.9");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost/en");
  });

  it("defaults to Persian and keeps the rest of the path", () => {
    expect(run("/menu").headers.get("location")).toBe("http://localhost/fa/menu");
  });

  it("lets localized paths through", () => {
    const res = run("/en");
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });
});
