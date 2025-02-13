
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import timeTrakTemplate from '@/components/timetraktemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const emails = ['test-ywz9n2h6n@srv1.mail-tester.com', 'nirujan1324@gmail.com']

    const emailPromises = [... new Set(emails)]
    .map((recipientsEmail) => {
      return resend.emails.send({
        from: 'TimeTrak <nirujan@timetrak.fyi>',
        to: recipientsEmail,
        bcc: ['nirujan12@hotmail.ca', 'nirujan1324@gmail.com'],
        subject: 'multiple email test',
        react: timeTrakTemplate({ firstName: 'John' }),
      });
    })


    const responses = await Promise.all(emailPromises);

    return NextResponse.json({
      status: 200,
      responses
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
