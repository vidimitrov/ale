import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0"
import { Resend } from "npm:resend@2.0.0"

// Deno namespace declaration
declare global {
  const Deno: {
    env: {
      get(key: string): string | undefined;
    };
  };
}

interface Expense {
  amount: number;
  category: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!serviceRoleKey) {
      console.log('Service role key is required for admin access')
      throw new Error('Service role key is required for admin access');
    }

    const supabaseClient = createClient(
      'https://hyftgtdxgkjldcndvoon.supabase.co',
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    console.log('Supabase admin client is created')
    // Get current date in user's timezone (UTC+2)
    const now = new Date()
    now.setHours(now.getHours() + 2) // Adjust for UTC+2
    const today = now.toISOString().split('T')[0]
    console.log('today: ', today)
    
    // Get first day of current month
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]

    // Get all users using auth admin API
    const { data: users, error: usersError } = await supabaseClient
      .auth.admin.listUsers()

    console.log('users: ', users)

    if (usersError) {
      console.log('Error getting users: ', usersError)
      throw usersError
    }

    // Process each user
    if (users?.users) {
      for (const user of users.users) {
        try {
          // Check if user has any expenses today
          const { data: todayExpenses } = await supabaseClient
            .from('expenses')
            .select('id')
            .eq('user_id', user.id)
            .eq('date', today)
            .limit(1);

          // If user has no expenses today, prepare and send notification
          if (!todayExpenses?.length) {
            // Get monthly overview
            const { data: monthExpenses } = await supabaseClient
              .from('expenses')
              .select('amount, category')
              .eq('user_id', user.id)
              .gte('date', firstDayOfMonth)
              .lte('date', today);

            const monthlyOverview = {
              totalExpenses: monthExpenses?.reduce((sum: number, exp: Expense) => sum + Number(exp.amount), 0) || 0,
              categories: Array.from(new Set(monthExpenses?.map((exp: Expense) => exp.category) || []))
            };

            // Send email notification directly using Resend
            const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
            
            const emailHtml = `
              <h2>Daily Expense Tracking Reminder</h2>
              <p>We noticed you haven't tracked any expenses today. Keeping your expenses up to date helps you stay on top of your financial goals!</p>
              
              <h3>Your Monthly Overview</h3>
              <p>Total expenses this month: <strong>$${monthlyOverview.totalExpenses.toFixed(2)}</strong></p>
              <p>Expense categories: ${monthlyOverview.categories.join(', ') || 'No categories yet'}</p>
              
              <div style="margin: 30px 0;">
                <a href="${Deno.env.get('APP_URL')}/expenses" 
                   style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                  Track Your Expenses
                </a>
              </div>
              
              <p>Best regards,<br>ALE Budget Tracker</p>
            `;

            try {
              await resend.emails.send({
                from: 'ALE Budget Tracker <onboarding@resend.dev>',
                to: user.email,
                subject: 'Daily Expense Tracking Reminder - ALE Budget Tracker',
                html: emailHtml,
              });
            } catch (emailError) {
              console.error(`Failed to send notification to ${user.email}:`, emailError);
            }
          }
        } catch (error) {
          console.error(`Error processing user ${user.email}:`, error);
        }
      }
    }

    return new Response(
      JSON.stringify({ message: 'Inactivity check completed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
