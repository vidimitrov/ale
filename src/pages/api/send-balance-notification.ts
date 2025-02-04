import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface RequestBody {
  remainingBalance: number;
  remainingPercentage: number;
  userEmail: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { remainingBalance, remainingPercentage, userEmail } = req.body as RequestBody;

    const emailHtml = `
      <h2>Low Balance Alert</h2>
      <p>Your remaining balance is now <strong>$${remainingBalance.toFixed(2)}</strong></p>
      <p>This represents <strong>${remainingPercentage.toFixed(1)}%</strong> of your total income.</p>
      <p>Please review your expenses and consider adjusting your spending.</p>
      <br>
      <p>Best regards,<br>ALE Budget Tracker</p>
    `;

    await resend.emails.send({
      from: 'ALE Budget Tracker <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Low Balance Alert - ALE Budget Tracker',
      html: emailHtml,
    });

    return res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
