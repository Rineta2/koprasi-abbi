import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { NextRequest } from "next/server";

interface EmailPayload {
    to: string;
    subject: string;
    message: string;
    originalMessage: string;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    try {
        await transporter.verify();
        console.log("SMTP connection verified");

        const { to, subject, message, originalMessage }: EmailPayload = await request.json();

        const mailOptions = {
            from: `"Koprasi Abbi" <${process.env.GMAIL_USER}>`,
            to: to,
            subject: subject,
            text: `${message}\n\n-------------------\nPesan Asli:\n${originalMessage}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p style="margin-bottom: 20px;">${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <div style="color: #666;">
            <p><strong>Pesan Asli:</strong></p>
            <p>${originalMessage.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent:", info.messageId);

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to send email",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}