import fs from 'fs';
import path from 'path';

const cachePath = path.join(process.cwd(), 'data', 'video-cache.json');

function loadCache() {
  try {
    const raw = fs.readFileSync(cachePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

export default async function handler(req, res) {
  const { brand = '', model = '' } = req.query;
  const q = `${brand} ${model} demo`.trim().toLowerCase();

  if (!brand || !model) {
    return res.status(400).json({ error: 'Missing brand or model' });
  }

  const cache = loadCache();
  if (cache[q]) {
    console.log(`[cache] ${q}`);
    return res.status(200).json({ videoId: cache[q].videoId, meta: cache[q].meta });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const search = encodeURIComponent(q);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=1&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.items?.length > 0) {
      const item = data.items[0];
      const videoId = item.id.videoId;
      const meta = {
        title: item.snippet.title,
        channel: item.snippet.channelTitle
      };

      cache[q] = { videoId, meta };
      saveCache(cache);
      console.log(`[yt] ✅ ${q} → ${videoId}`);
      return res.status(200).json({ videoId, meta });
    } else {
      console.warn(`[yt] ❌ No video for ${q}`);
      return res.status(404).json({ error: 'No video found' });
    }
  } catch (err) {
    console.error(`[yt] 🛑 Error for ${q}:`, err);

    if (cache[q]) {
      console.log(`[fallback] Using cached value for ${q}`);
      return res.status(200).json({ videoId: cache[q].videoId, meta: cache[q].meta });
    }

    return res.status(500).json({ error: 'Error fetching video' });
  }
}
