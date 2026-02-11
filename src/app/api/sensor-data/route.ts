import { NextResponse } from 'next/server';

export async function GET() {
    // Simulate sensor data
    const sensorData = {
        sensor_id: "ICU-Monitor-01",
        temperature: (36.5 + Math.random()).toFixed(1), // Random temp between 36.5 and 37.5
        heart_rate: Math.floor(60 + Math.random() * 40), // Random HR between 60 and 100
        oxygen_level: Math.floor(95 + Math.random() * 5), // Random SpO2 between 95 and 100
        status: "Normal",
        timestamp: new Date().toISOString(),
    };

    // Logic to determine status based on random values
    if (parseFloat(sensorData.temperature) > 37.2 || sensorData.heart_rate > 90 || sensorData.oxygen_level < 96) {
        sensorData.status = "Warning";
    }

    return NextResponse.json(sensorData);
}
