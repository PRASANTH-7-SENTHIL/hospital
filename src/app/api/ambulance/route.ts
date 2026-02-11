import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic'; // Prevent caching so we get live data

export async function GET() {
  try {
    const channelId = process.env.THINGSPEAK_CHANNEL_ID;
    const apiKey = process.env.THINGSPEAK_API_KEY;

    if (!channelId || !apiKey) {
      return NextResponse.json({ error: 'Configuration missing' }, { status: 500 });
    }

    // Fetch last 5 entries to handle cases where the very last entry might have null GPS data
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=5`;

    const response = await axios.get(url);
    const data = response.data;

    // Find the latest feed that has valid field7 (lat) and field8 (lng)
    let validFeed = null;
    if (data.feeds && Array.isArray(data.feeds)) {
      // Loop backwards from the last entry
      for (let i = data.feeds.length - 1; i >= 0; i--) {
        const feed = data.feeds[i];
        if (feed.field7 && feed.field8 && feed.field7 !== 'nan' && feed.field8 !== 'nan') {
          validFeed = feed;
          break;
        }
      }
    }

    // Default to the very last feed if no valid coordinate feed is found
    const resultFeed = validFeed || (data.feeds && data.feeds.length > 0 ? data.feeds[data.feeds.length - 1] : null);

    if (!resultFeed) {
      return NextResponse.json({ error: 'No data available' }, { status: 404 });
    }

    return NextResponse.json(resultFeed);
  } catch (error) {
    console.error('ThingSpeak Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
