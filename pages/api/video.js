// pages/api/video.js
export default async function handler(req, res) {
  const { brand, model } = req.query;

  const q = encodeURIComponent(`${brand} ${model} demo`);
  const apiKey = process.env.YOUTUBE_API_KEY;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=1&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return res.status(200).json({ videoId });
    } else {
      return res.status(404).json({ error: 'No video found' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching video' });
  }
}
