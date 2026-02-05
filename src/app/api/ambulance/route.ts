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

    const url = `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${apiKey}`;

    const response = await axios.get(url);
    
    // ThingSpeak returns exactly what we need in the body
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('ThingSpeak Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
