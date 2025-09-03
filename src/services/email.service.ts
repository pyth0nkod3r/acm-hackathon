import axios, { AxiosError } from 'axios';
import type { HackathonForm } from '@/nServices/apiType';
import { type PartnerRegistrationData } from '@/pages/PartnerRegistration';
import type { ContactFormData } from '../lib/validations';

// Response type definitions
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface EmailResponse {
  status: string;
  message: string;
}

// Email data interface
interface EmailData {
  recipient_email: string;
  message: string;
  subject: string;
  fromName: string;
}

// API service functions
const emailService = {
  sendHackathonConfirmation: async (
    hackathonData: HackathonForm
  ): Promise<ApiResponse<EmailResponse>> => {
    try {
      // Create personalized message
      const subject = `Welcome to ACM 2025 Hackathon - Team "${hackathonData.teamName}" Registration Confirmed! 🚀`;

      const htmlMessage = `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>ACM 2025 Hackathon | Registration Confirmation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8fafc;
      margin: 0;
      padding: 20px;
      color: #1a202c;
      min-height: 100vh;
      line-height: 1.6;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header h1 {
      color: white;
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .header .tagline {
      color: rgba(255,255,255,0.95);
      font-size: 16px;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      background: white;
    }
    .welcome-section {
      text-align: center;
      margin-bottom: 35px;
    }
    .welcome-title {
      font-size: 28px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 15px;
    }
    .content p {
      line-height: 1.7;
      margin-bottom: 18px;
      color: #374151;
      font-size: 16px;
    }
    .highlight-box {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin: 30px 0;
      text-align: center;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
    }
    .highlight-box h3 {
      margin-bottom: 15px;
      font-size: 22px;
      font-weight: 700;
      color: white;
    }
    .highlight-box p {
      color: rgba(255, 255, 255, 0.95);
      font-size: 16px;
      margin-bottom: 0;
    }
    .status-badge {
      display: inline-block;
      background: rgba(255,255,255,0.25);
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 15px;
      color: white;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }
    .info-card {
      background: #f8fafc;
      padding: 25px;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    .info-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: #2563eb;
    }
    .info-card h3 {
      color: #2563eb;
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 700;
    }
    .info-card p {
      color: #4b5563;
      font-size: 15px;
      margin-bottom: 0;
    }
    .contact-info {
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin: 30px 0;
    }
    .contact-info h3 {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
    .contact-item {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
    }
    .contact-item span {
      font-size: 18px;
    }
    .contact-item a {
      color: #f3f4f6;
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
    }
    .contact-item a:hover {
      color: white;
      text-decoration: underline;
    }
    .cta-section {
      text-align: center;
      margin: 35px 0;
      padding: 30px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 12px;
      color: white;
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
    }
    .cta-section h3 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 10px;
      color: white;
    }
    .cta-section p {
      color: rgba(255, 255, 255, 0.95);
      font-size: 16px;
      margin-bottom: 0;
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      border-top: 2px solid #e5e7eb;
    }
    .footer strong {
      color: #374151;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 12px;
      }
      .header {
        padding: 30px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .content {
        padding: 30px 20px;
      }
      .welcome-title {
        font-size: 24px;
      }
      .info-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  </style>
</head>
<body>
  <div class='email-container'>
    <div class='header'>
      <div class='header-content'>
        <h1>ACM 2025 Hackathon</h1>
        <div class='tagline'>Code • Create • Innovate</div>
      </div>
    </div>
    
    <div class='content'>
      <div class='welcome-section'>
        <h2 class='welcome-title'>Welcome ${hackathonData.teamName}! 🎉</h2>
        <p>Thank you for registering for the <strong>ACM 2025 Hackathon</strong>! We're thrilled to have you join us for this incredible event.</p>
        
        <p>We'll keep you updated with key details, including the event schedule and participation guidelines.</p>
        
        <p>If you/your team are selected to participate, you'll be notified directly with next steps.</p>
        
        <p>We look forward to seeing your creativity in action!</p>
      </div>
      
      <div class='contact-info'>
        <h3>🛟 Need Assistance?</h3>
        <div class='contact-item'>
          <span>📧</span>
          <a href='mailto:info@acmhackathon.com'>info@acmhackathon.com</a>
        </div>
        <div class='contact-item'>
          <span>📞</span>
          <a href='tel:+2349167667376'>+234 916 766 7376</a>
        </div>
        <div class='contact-item'>
          <span>🌐</span>
          <a href='https://www.acmhackathon.com'>www.acmhackathon.com</a>
        </div>
      </div>
      
      <div class='cta-section'>
        <h3>🔥 We can't wait to welcome you to the event!</h3>
        <p style='margin-bottom: 0;'><strong>Best regards,</strong><br>
        The ACM 2025 Hackathon Team</p>
      </div>
    </div>
    
    <div class='footer'>
      <p><strong>ACM 2025 Hackathon</strong><br>
      This email was sent to ${hackathonData.teamLeaderEmail}<br>
      For support, contact us at <a href='mailto:info@acmhackathon.com'>info@acmhackathon.com</a></p>
    </div>
  </div>
</body>
</html>`;

      // Email data payload
      const emailData: EmailData = {
        recipient_email: hackathonData.teamLeaderEmail,
        message: htmlMessage,
        subject: subject,
        fromName: 'ACM 2025 Hackathon',
      };

      // Send the email
      const response = await axios.post(
        'https://acmhackathon.com/sender/',
        emailData
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error:
          (axiosError.response?.data as string) ||
          'Failed to send confirmation email',
      };
    }
  },

  sendPartnershipConfirmation: async (
    partnerData: PartnerRegistrationData
  ): Promise<ApiResponse<EmailResponse>> => {
    try {
      // Create personalized message
      const subject = 'Partnership Inquiry Received - ACM 2025 Hackathon';

      const htmlMessage = `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>ACM 2025 Hackathon | Partnership Registration</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8fafc;
      margin: 0;
      padding: 20px;
      color: #1a202c;
      min-height: 100vh;
      line-height: 1.6;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header h1 {
      color: white;
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .header .tagline {
      color: rgba(255,255,255,0.95);
      font-size: 16px;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      background: white;
    }
    .welcome-section {
      margin-bottom: 35px;
    }
    .welcome-title {
      font-size: 28px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 20px;
    }
    .content p {
      line-height: 1.7;
      margin-bottom: 18px;
      color: #374151;
      font-size: 16px;
    }
    .vision-section {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 30px;
      border-radius: 15px;
      margin: 25px 0;
      border-left: 5px solid #3b82f6;
    }
    .vision-section h3 {
      color: black;
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .inquiry-section {
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      margin: 30px 0;
      position: relative;
      overflow: hidden;
    }
    .inquiry-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      animation: shimmer 4s infinite;
    }
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    .inquiry-section h3 {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
    }Ï
         .inquiry-section p{
         color: white
         }
    .timeline-section {
      background: #f1f5f9;
      padding: 25px;
      border-radius: 15px;
      margin: 25px 0;
      border: 2px solid #e2e8f0;
    }
    .timeline-section h3 {
      color: #1e40af;
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .timeline-item {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin: 10px 0;
      border-left: 4px solid #3b82f6;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .contact-section {
      background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
      color: white;
      padding: 30px;
      border-radius: 15px;
      margin: 30px 0;
    }
    .contact-section h3 {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      color: white;
      gap: 10px;
    }
    .contact-item {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      backdrop-filter: blur(10px);
    }
    .contact-item strong {
      min-width: 60px;
    }
    .contact-item a {
      color: white;
      text-decoration: none;
      font-weight: 500;
    }
    .contact-item a:hover {
      text-decoration: underline;
    }
    .partnership-badge {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    .footer {
      background: #f8fafc;
      padding: 25px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 15px;
      }
      .header {
        padding: 30px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .content {
        padding: 30px 20px;
      }
      .welcome-title {
        font-size: 24px;
      }
      .contact-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
    }
  </style>
</head>
<body>
  <div class='email-container'>
    <div class='header'>
      <div class='header-content'>
        <h1>ACM 2025 Hackathon</h1>
        <div class='tagline'>Partnership Opportunities</div>
      </div>
    </div>
    
    <div class='content'>
      <div class='welcome-section'>
        <h2 class='welcome-title'>Dear ${partnerData.fullName},</h2>
        <p>Thank you for your interest in partnering with <strong>ACM 2025 Hackathon</strong>!</p>
      </div>
      
      <div class='vision-section'>
        <h3>🤝 Partnership Vision</h3>
        <p>We appreciate your commitment to fostering creativity, innovation, and impact across the continent and beyond.</p>
      </div>
      
      <div class='inquiry-section'>
        <h3>📋 Your Partnership Inquiry</h3>
        <p>Our team has received your submission and will review your partnership proposal carefully.</p>
        <div class='partnership-badge'>Partnership Inquiry Received</div>
      </div>
      
      <div class='timeline-section'>
        <h3>⏱️ Response Timeline</h3>
        <div class='timeline-item'>
          <strong>Response Time:</strong> We will get back to you within <strong>48 hours</strong> with detailed information about partnership opportunities and next steps.
        </div>
      </div>
      
      <div class='contact-section'>
        <h3>🚀 Need Immediate Assistance?</h3>
        <div class='contact-item'>
          <span>📧</span>
          <div><strong>Email:</strong> <a href='mailto:info@acmhackathon.com'>info@acmhackathon.com</a></div>
        </div>
        <div class='contact-item'>
          <span>📞</span>
          <div><strong>Phone:</strong> <a href='tel:+2349167667376'>+234 916 766 7376</a></div>
        </div>
      </div>
    </div>
    
    <div class='footer'>
      <p><strong>ACM 2025 Hackathon Partnership Team</strong><br>
      This email was sent to ${partnerData.emailAddress}<br>
      For partnership inquiries, contact us at <a href='mailto:info@acmhackathon.com'>info@acmhackathon.com</a></p>
    </div>
  </div>
</body>
</html>`;

      // Email data payload
      const emailData: EmailData = {
        recipient_email: partnerData.emailAddress,
        message: htmlMessage,
        subject: subject,
        fromName: 'ACM 2025 Hackathon Partnership Team',
      };

      // Send the email
      const response = await axios.post(
        'https://acmhackathon.com/sender/',
        emailData
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error:
          (axiosError.response?.data as string) ||
          'Failed to send partnership confirmation email',
      };
    }
  },

  sendInquiryResponse: async (
    contactData: ContactFormData
  ): Promise<ApiResponse<EmailResponse>> => {
    try {
      // Create personalized message
      const subject = `Re: ${contactData.subject} - ACM 2025 Hackathon`;

      const htmlMessage = `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>ACM 2025 Hackathon | Inquiry Response</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8fafc;
      margin: 0;
      padding: 20px;
      color: #1a202c;
      min-height: 100vh;
      line-height: 1.6;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header h1 {
      color: white;
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .header .tagline {
      color: rgba(255,255,255,0.95);
      font-size: 16px;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      background: white;
    }
    .greeting-section {
      margin-bottom: 30px;
    }
    .greeting-title {
      font-size: 28px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 20px;
    }
    .content p {
      line-height: 1.7;
      margin-bottom: 18px;
      color: #374151;
      font-size: 16px;
    }
    .acknowledgment-section {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      padding: 25px;
      border-radius: 15px;
      margin: 25px 0;
      border-left: 5px solid #6366f1;
    }
    .acknowledgment-section h3 {
      color: black;
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 600;
    }
    .response-timeline {
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      margin: 30px 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .response-timeline::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      animation: slide 3s infinite;
    }
    @keyframes slide {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    .response-timeline h3 {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
    }
      .response-timeline p {
      color: white;
      }
    .timeline-badge {
      background: rgba(255,255,255,0.2);
      padding: 10px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 15px;
      display: inline-block;
      backdrop-filter: blur(10px);
    }
    .contact-section {
      background: #f1f5f9;
      padding: 30px;
      border-radius: 12px;
      margin: 25px 0;
      border: 2px solid #cbd5e1;
    }
    .contact-section h3 {
      color: #1e40af;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .contact-item {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
    }
    .contact-item strong {
      min-width: 60px;
      color: #1e40af;
      font-weight: 600;
    }
    .contact-item a {
      color: #1e40af;
      text-decoration: none;
      font-weight: 600;
    }
    .contact-item a:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
    .social-section {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      margin: 30px 0;
      text-align: center;
    }
    .social-section h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
      color: white;
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 15px;
    }
    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 15px;
      background: rgba(255,255,255,0.1);
      border-radius: 25px;
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    .social-link:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }
    .closing-section {
      text-align: center;
      margin: 35px 0;
      padding: 25px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 15px;
      color: white;
    }
    .footer {
      background: #f8fafc;
      padding: 25px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 15px;
      }
      .header {
        padding: 30px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .content {
        padding: 30px 20px;
      }
      .greeting-title {
        font-size: 24px;
      }
      .social-links {
        gap: 15px;
      }
      .social-link {
        padding: 8px 12px;
        font-size: 14px;
      }
      .contact-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
    }
  </style>
</head>
<body>
  <div class='email-container'>
    <div class='header'>
      <div class='header-content'>
        <h1>ACM 2025 Hackathon</h1>
        <div class='tagline'>Inquiry Response</div>
      </div>
    </div>
    
    <div class='content'>
      <div class='greeting-section'>
        <h2 class='greeting-title'>Hi ${contactData.name},</h2>
        <p>Thank you for reaching out to the <strong>ACM 2025 Hackathon</strong> team. We have received your inquiry and appreciate your interest in our event.</p>
      </div>
      
      <div class='acknowledgment-section'>
        <h3>📋 Your Inquiry</h3>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p style="margin-top: 10px; font-size: 14px; color: #4b5563;">We've received your message and our team will review it carefully.</p>
      </div>
      
      <div class='response-timeline'>
        <h3>⏰ Response Timeline</h3>
        <p>Your inquiry will be reviewed and responded to within <strong>48 hours</strong>.</p>
        <div class='timeline-badge'>Inquiry Received & Under Review</div>
      </div>
      
      <div class='contact-section'>
        <h3>🚀 Need Immediate Assistance?</h3>
        <div class='contact-item'>
          <span>📧</span>
          <div><strong>Email:</strong> <a href='mailto:info@acmhackathon.com'>info@acmhackathon.com</a></div>
        </div>
        <div class='contact-item'>
          <span>📞</span>
          <div><strong>Phone:</strong> <a href='tel:+2349167667376'>+234 916 766 7376</a></div>
        </div>
      </div>
      
      <div class='social-section'>
        <h3>Stay connected with us on social media for the latest updates and event highlights:</h3>
        <div class='social-links'>
          <a href='#' class='social-link'>📱 Instagram</a>
          <a href='#' class='social-link'>📘 Facebook</a>
          <a href='#' class='social-link'>🐦 X (Twitter)</a>
          <a href='#' class='social-link'>💼 LinkedIn</a>
        </div>
      </div>
      
      <div class='closing-section'>
        <h3>🎉 We can't wait to welcome you to the event!</h3>
        <p style='margin-bottom: 0;'><strong>Best regards,</strong><br>
        The ACM 2025 Hackathon Team</p>
      </div>
    </div>
    
    <div class='footer'>
      <p><strong>ACM 2025 Hackathon</strong><br>
      This email was sent to ${contactData.email}<br>
      For support, contact us at <a href='mailto:info@acmhackathon.com'>info@acmhackathon.com</a></p>
    </div>
  </div>
</body>
</html>`;

      // Email data payload
      const emailData: EmailData = {
        recipient_email: contactData.email,
        message: htmlMessage,
        subject: subject,
        fromName: 'ACM 2025 Hackathon Team',
      };

      // Send the email
      const response = await axios.post(
        'https://acmhackathon.com/sender/',
        emailData
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error:
          (axiosError.response?.data as string) ||
          'Failed to send inquiry response email',
      };
    }
  },
};

export default emailService;
export type { ApiResponse, EmailData };
