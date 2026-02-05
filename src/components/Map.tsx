'use client';

import React, { useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const defaultCenter = {
    lat: 20.5937, // India Center
    lng: 78.9629
};

interface MapProps {
    lat: number | null;
    lng: number | null;
}

const MapComponent = ({ lat, lng }: MapProps) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || ''
    });

    const center = useMemo(() => {
        if (lat && lng) return { lat, lng };
        return defaultCenter;
    }, [lat, lng]);

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
            zoom={lat ? 15 : 5}
        >
            {lat && lng && (
                <Marker
                    position={{ lat, lng }}
                    title="Ambulance Live"
                    animation={google.maps.Animation.DROP}
                />
            )}
        </GoogleMap>
    );
};

export default React.memo(MapComponent);
