import "server-only";
import { YOUTUBE_CHANNEL_ID } from "../site";
import { parseYouTubeFeed, type YouTubeVideo } from "./feed";

/** Latest uploads from the clinic's YouTube channel, refreshed every 6 hours. Never throws. */
export async function latestVideos(limit = 12): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`, {
      next: { revalidate: 21600 },
    });
    if (!res.ok) return [];
    return parseYouTubeFeed(await res.text(), limit);
  } catch {
    return [];
  }
}
