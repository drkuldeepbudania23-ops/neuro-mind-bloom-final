import { test } from "node:test";
import assert from "node:assert/strict";
import { APP_UA_MARKER, isAppUserAgent } from "../lib/appShell";

test("app user-agent marker is recognised", () => {
  const android = `Mozilla/5.0 (Linux; Android 14; Pixel 8; wv) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36 ${APP_UA_MARKER}/1`;
  const iphone = `Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 ${APP_UA_MARKER}/1`;
  assert.equal(isAppUserAgent(android), true);
  assert.equal(isAppUserAgent(iphone), true);
});

test("ordinary browsers and in-app browsers of other apps are not the app", () => {
  assert.equal(isAppUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0 Safari/537.36"), false);
  assert.equal(isAppUserAgent("Mozilla/5.0 (Linux; Android 14; wv) Chrome/130.0 Mobile Safari/537.36 Instagram 300.0"), false);
  assert.equal(isAppUserAgent(null), false);
  assert.equal(isAppUserAgent(""), false);
});

test("capacitor config appends the same marker", async () => {
  const { readFile } = await import("node:fs/promises");
  const config = await readFile(new URL("../capacitor.config.ts", import.meta.url), "utf8");
  assert.match(config, new RegExp(`appendUserAgent:\\s*'${APP_UA_MARKER}/`));
});
