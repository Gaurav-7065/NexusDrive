import { Resend } from 'resend'
import { ENV } from '../lib/env.js';



const resend = new Resend(ENV.RESEND_API_KEY);

/**
* Sends a targeted job notification email to a list of eligible students.
* @param {Array} emailList - Array of student email strings
* @param {Object} jobDetails - The newly created job object from the database
*/

export const sendJobAlertEmail = async (emailList, jobDetails) => {
    try {
        // Generate the dynamic application link pointing to your frontend URL
        const frontendUrl = ENV.FRONTEND_URL;
        const jobLink = `${frontendUrl}/jobs/${jobDetails._id}`;

        const emailSubject = `New Job Opportunity: ${jobDetails.role} at ${jobDetails.companyName}`

        // Render the clean HTML template
        const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c;">
        <h2 style="color: #4f46e5; margin-bottom: 4px;">New Job Alert!</h2>
        <p style="font-size: 16px; color: #4a5568; margin-top: 0;">A position matching your eligibility criteria has just been posted.</p>
        
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;" />
        
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #2d3748;">${jobDetails.role}</h3>
          <p style="margin: 4px 0;"><strong>Company:</strong> ${jobDetails.companyName}</p>
          <p style="margin: 4px 0;"><strong>Minimum CGPA Required:</strong> ${jobDetails.minCgpa || 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Eligible Batches:</strong> ${Array.isArray(jobDetails.allowedYears) ? jobDetails.allowedYears.join(', ') : 'All'}</p>
        </div>

        <p style="color: #718096; font-size: 14px; line-height: 1.5;">
          ${jobDetails.description ? jobDetails.description.substring(0, 150) + '...' : ''}
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${jobLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
            View Details & Apply
          </a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 25px 0;" />
        <p style="font-size: 12px; color: #a0aec0; text-align: center;">
          This is an automated notification from your Placement Portal. Please do not reply directly to this email.
        </p>
      </div>
    `;

        const response = await resend.emails.send({
            from: 'Placement Portal <onboarding@resend.dev>',
            to: 'jhagaurav214@gmail.com',
            // bcc: emailList,
            subject: emailSubject,
            html: emailHtml
        });

        if (response.error) {
            console.error("❌ Resend API Refused Delivery:", response.error.message);
            return { success: false, error: response.error.message };
        }

        console.log(`✉️ Email job dispatch initiated successfully! Resend ID: ${response.data?.id}`)
        return { success: true, id: response.data?.id };
    }
    catch (error) {
        // Prevent the server from crashing if Resend fails (Sandbox Safety Mode)
        console.error("❌ FULL CRASH OBJECT:", error);
        return { success: false, error: error.message };
    }

}