import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;
        const toNumber = process.env.MY_PHONE_NUMBER;

        if (!accountSid || !authToken || !fromNumber || !toNumber) {
            return NextResponse.json({ error: 'Twilio configuration missing' }, { status: 500 });
        }

        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: '🚑 Ambulance is on the way. Please prepare to receive the patient. 🏥\n📍 Location: http://localhost:3000/dashboard',
            from: fromNumber,
            to: toNumber,
        });

        console.log(`Message initiated: ${message.sid}`);

        return NextResponse.json({ success: true, sid: message.sid });
    } catch (error: any) {
        console.error('Twilio Message Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 });
    }
}
