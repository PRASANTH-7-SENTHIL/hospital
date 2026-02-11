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

        const call = await client.calls.create({
            from: fromNumber,
            to: toNumber,
            url: 'http://twimlets.com/message?Message%5B0%5D=The%20ambulance%20is%20on%20the%20way%20with%20the%20patient.%20Kindly%20prepare%20to%20receive%20the%20patient.',
        });

        console.log(`Call initiated: ${call.sid}`);

        return NextResponse.json({ success: true, sid: call.sid });
    } catch (error: any) {
        console.error('Twilio Call Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to initiate call' }, { status: 500 });
    }
}
