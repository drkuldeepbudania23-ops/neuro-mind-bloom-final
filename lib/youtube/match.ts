import type { YouTubeVideo } from "./feed";

/**
 * Pick the clinic's own videos whose titles mention a topic (English or Hindi
 * keywords). Never invents videos — if nothing matches, the page links to a
 * search of the clinic's channel instead.
 */
export function matchVideos(videos: YouTubeVideo[], keywords: string[], limit = 3): YouTubeVideo[] {
  const keys = keywords.map((k) => k.toLowerCase().trim()).filter((k) => k.length >= 3 || /[ऀ-ॿ]/.test(k));
  if (!keys.length) return [];
  return videos.filter((v) => {
    const title = v.title.toLowerCase();
    return keys.some((k) => title.includes(k));
  }).slice(0, limit);
}

export function channelSearchUrl(channelUrl: string, query: string): string {
  return `${channelUrl.replace(/\/$/, "")}/search?query=${encodeURIComponent(query)}`;
}
