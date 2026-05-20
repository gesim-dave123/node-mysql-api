import { Resend } from 'resend';
import config from '../../config.json';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    const recipient = process.env.RESEND_OVERRIDE_TO || to;
    const { data, error } = await resend.emails.send({
        from: from,
        to: [recipient],
        subject: subject,
        html: html,
    });

    if (error) {
        console.error('Resend Error:', error);
        throw error;
    }

    return data;
}
