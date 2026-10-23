import assert from "node:assert/strict";
import test from "node:test";
import { parseYouTubeFeed } from "../lib/youtube/feed";

const XML = `<?xml version="1.0"?><feed xmlns:yt="http://www.youtube.com/xml/schemas/2015">
<title>Neuro Mind Bloom</title>
<entry><id>yt:video:abcDEF12345</id><yt:videoId>abcDEF12345</yt:videoId><title>Depression ke lakshan &amp; ilaj | डिप्रेशन</title><published>2026-09-01T10:00:00+00:00</published></entry>
<entry><yt:videoId>bad</yt:videoId><title>Broken</title></entry>
<entry><yt:videoId>XYZ_-123456</yt:videoId><title>Nasha mukti</title><published>2026-08-01T10:00:00+00:00</published></entry>
</feed>`;

test("parses YouTube RSS entries and skips malformed ones", () => {
  const v = parseYouTubeFeed(XML);
  assert.equal(v.length, 2);
  assert.deepEqual(v[0], { id: "abcDEF12345", title: "Depression ke lakshan & ilaj | डिप्रेशन", published: "2026-09-01T10:00:00+00:00" });
  assert.equal(v[1].id, "XYZ_-123456");
  assert.equal(parseYouTubeFeed(XML, 1).length, 1);
  assert.deepEqual(parseYouTubeFeed("not xml"), []);
});
