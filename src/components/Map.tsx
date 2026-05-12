'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    flex: 1,
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

// ✅ Default location — hardcoded fallback
const DEFAULT_LAT = 11.476642;
const DEFAULT_LNG = 78.000155;

interface MapProps {
    lat: number | null;
    lng: number | null;
}

const MapComponent = ({ lat, lng }: MapProps) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || ''
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    // Use live coordinates if available, otherwise fall back to hardcoded default
    const center = useMemo(() => {
        const resolvedLat = (lat !== null && !isNaN(lat)) ? lat : DEFAULT_LAT;
        const resolvedLng = (lng !== null && !isNaN(lng)) ? lng : DEFAULT_LNG;
        return { lat: resolvedLat, lng: resolvedLng };
    }, [lat, lng]);

    // Force map to pan to the correct location whenever center changes
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.panTo(center);
        }
    }, [center]);

    if (loadError) {
        return (
            <div style={{ ...containerStyle, background: '#f8d7da', color: '#721c24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Map failed to load. Check API Key.
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div style={{ ...containerStyle, background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Loading Map...
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={(map) => { mapRef.current = map; }}
        >
            <Marker
                position={center}
                title={(lat !== null && lng !== null) ? "Ambulance Live" : "Default Location"}
                animation={google.maps.Animation.DROP}
            />
        </GoogleMap>
    );
};

export default React.memo(MapComponent);
