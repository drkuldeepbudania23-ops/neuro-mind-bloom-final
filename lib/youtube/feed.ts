/**
 * Parse a YouTube channel RSS feed (https://www.youtube.com/feeds/videos.xml?channel_id=…).
 * Pure function so it can be unit-tested; fetching happens in lib/youtube/latest.ts.
 */
export type YouTubeVideo = { id: string; title: string; published: string };

function decode(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

export function parseYouTubeFeed(xml: string, limit = 12): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const entry = match[1];
    const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    if (id && title) videos.push({ id, title: decode(title), published });
    if (videos.length >= limit) break;
  }
  return videos;
}
