import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface RequestBody {
  userEmail: string;
  monthlyOverview: {
    totalExpenses: number;
    categories: string[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userEmail, monthlyOverview } = req.body as RequestBody;

    // Validate required fields
    if (!userEmail) {
      return res.status(400).json({ error: 'User email is required' });
    }

    if (!monthlyOverview) {
      return res.status(400).json({ error: 'Monthly overview data is required' });
    }

    const emailHtml = `
      <h2>Daily Expense Tracking Reminder</h2>
      <p>We noticed you haven't tracked any expenses today. Keeping your expenses up to date helps you stay on top of your financial goals!</p>
      
      <h3>Your Monthly Overview</h3>
      <p>Total expenses this month: <strong>$${monthlyOverview.totalExpenses.toFixed(2)}</strong></p>
      <p>Expense categories: ${monthlyOverview.categories.join(', ') || 'No categories yet'}</p>
      
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/expenses" 
           style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Track Your Expenses
        </a>
      </div>
      
      <p>Best regards,<br>ALE Budget Tracker</p>
    `;

    await resend.emails.send({
      from: 'ALE Budget Tracker <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Daily Expense Tracking Reminder - ALE Budget Tracker',
      html: emailHtml,
    });

    return res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
