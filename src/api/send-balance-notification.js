import { Resend } from "resend";

const resend = new Resend("re_TVfaaKUE_A6VEZ35EoBdbSpAJTMTrCthT");

/**
 * @param {Request} req
 */
export async function POST(req) {
  try {
    const { remainingBalance, remainingPercentage, userEmail } =
      await req.json();

    const emailHtml = `
      <h2>Low Balance Alert</h2>
      <p>Your remaining balance is now <strong>$${remainingBalance.toFixed(
        2
      )}</strong></p>
      <p>This represents <strong>${remainingPercentage.toFixed(
        1
      )}%</strong> of your total income.</p>
      <p>Please review your expenses and consider adjusting your spending.</p>
      <br>
      <p>Best regards,<br>ALE Budget Tracker</p>
    `;

    await resend.emails.send({
      from: "ALE Budget Tracker <onboarding@resend.dev>",
      to: userEmail,
      subject: "Low Balance Alert - ALE Budget Tracker",
      html: emailHtml,
    });

    return new Response(
      JSON.stringify({ message: "Notification sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
