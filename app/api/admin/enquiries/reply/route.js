import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// You'll need to set up an email service (Resend, SendGrid, etc.)
// This is a template - adjust based on your email provider

export async function POST(request) {
  try {
    const body = await request.json()
    const { enquiryId, reply, emailData } = body
    
    if (!enquiryId || !reply) {
      return NextResponse.json(
        { error: 'Enquiry ID and reply are required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    // First, get the enquiry details
    const { data: enquiry, error: fetchError } = await supabase
      .from('enquiries')
      .select(`
        *,
        products:product_id (
          name,
          slug
        )
      `)
      .eq('id', enquiryId)
      .single()
    
    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message },
        { status: 400 }
      )
    }
    
    // TODO: Send email using your email service
    // Example with Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: enquiry.email,
      subject: `Re: Your enquiry about ${enquiry.products?.name || 'our products'}`,
      html: `
        <h2>Hello ${enquiry.name},</h2>
        <p>Thank you for your enquiry. Here's our response:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          ${reply.replace(/\n/g, '<br>')}
        </div>
        <p>Original message:</p>
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0; color: #6b7280;">
          ${enquiry.message.replace(/\n/g, '<br>')}
        </div>
        <p>Best regards,<br>Your Company Team</p>
      `
    })
    */
    
    // Update enquiry status to replied
    const { data, error: updateError } = await supabase
      .from('enquiries')
      .update({
        status: 'replied',
        updated_at: new Date().toISOString()
      })
      .eq('id', enquiryId)
      .select()
      .single()
    
    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      )
    }
    
    // Store reply in database (optional - if you want to keep history)
    const { error: replyError } = await supabase
      .from('enquiry_replies')
      .insert([{
        enquiry_id: enquiryId,
        reply_text: reply,
        replied_by: emailData?.adminId || 'system' // You can pass admin ID from session
      }])
    
    if (replyError) {
      console.error('Error storing reply:', replyError)
      // Don't fail the request if just storing reply fails
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reply sent successfully',
      enquiry: data
    })
    
  } catch (error) {
    console.error('Reply error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send reply' },
      { status: 500 }
    )
  }
}