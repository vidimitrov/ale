import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  remainingBalance: number;
  remainingPercentage: number;
  userEmail: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("Missing Resend API key");
    }

    const { remainingBalance, remainingPercentage, userEmail } =
      (await req.json()) as RequestBody;

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

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ALE Budget Tracker <onboarding@resend.dev>",
        to: userEmail,
        subject: "Low Balance Alert - ALE Budget Tracker",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({ message: "Notification sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
