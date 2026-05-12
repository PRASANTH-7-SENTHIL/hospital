import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'appointments.json');

export async function GET() {
    try {
        const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
        const appointments = JSON.parse(fileContent);
        return NextResponse.json(appointments);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            return NextResponse.json([]);
        }
        console.error('Error reading appointments:', error);
        return NextResponse.json({ error: 'Failed to read appointments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, date, department } = data;

        if (!name || !date || !department) {
            return NextResponse.json({ error: 'Missing necessary fields' }, { status: 400 });
        }

        let appointments = [];
        try {
            const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
            appointments = JSON.parse(fileContent);
        } catch (error: any) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        const newAppointment = {
            id: Date.now().toString(),
            name,
            date,
            department,
            createdAt: new Date().toISOString(),
        };

        appointments.push(newAppointment);

        await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2), 'utf-8');

        return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });
    } catch (error) {
        console.error('Error saving appointment:', error);
        return NextResponse.json({ error: 'Failed to save appointment' }, { status: 500 });
    }
}
