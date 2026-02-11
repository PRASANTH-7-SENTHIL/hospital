import { useState, useEffect } from 'react';
import axios from 'axios';

interface AmbulanceData {
    latitude: number | null;
    longitude: number | null;
    lastUpdated: string | null;
    isLive: boolean;
}

export const useAmbulance = () => {
    const [data, setData] = useState<AmbulanceData>({
        latitude: null,
        longitude: null,
        lastUpdated: null,
        isLive: false,
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/ambulance');
                const feed = response.data;

                // ThingSpeak "last.json" returns schema like:
                // { "created_at": "TIME", "entry_id": N, "field7": "LAT", "field8": "LNG" }

                if (feed && feed.field7 && feed.field8) {
                    setData({
                        latitude: parseFloat(feed.field7),
                        longitude: parseFloat(feed.field8),
                        lastUpdated: new Date(feed.created_at).toLocaleTimeString(),
                        isLive: true,
                    });
                    setError(null);
                } else {
                    // Data might be empty or invalid
                    setData(prev => ({ ...prev, isLive: false }));
                }
            } catch (err) {
                console.error("Polling Error", err);
                setError("Failed to fetch data");
                setData(prev => ({ ...prev, isLive: false }));
            }
        };

        // Initial Fetch
        fetchData();

        // Poll every 15 seconds
        const interval = setInterval(fetchData, 15000);

        return () => clearInterval(interval);
    }, []);

    return { ...data, error };
};
