// src/lib/email.ts
import { AppError } from "@/lib/exceptions"
import { Resend } from "resend"

type SendEmailArgs = {
	to: string
	subject: string
	text: string
	html: string
}

// Lazy loader for Resend instance
const getResend = () => {
	const apiKey = process.env.RESEND_API_KEY
	return apiKey ? new Resend(apiKey) : null
}

export async function sendEmail({ to, subject, text, html }: SendEmailArgs) {
	const from =
		process.env.MAIL_FROM || "Waitlistify <waitlist@mail.voteflow.xyz>"
	const isProduction = process.env.NODE_ENV === "production"
	const resend = getResend()

	// 1. Production Mode: Must use Resend SDK
	if (isProduction) {
		if (!resend) {
			console.error("❌ Production Email Error: RESEND_API_KEY is missing.")
			throw new AppError({
				status: 500,
				error: "TRANSACTIONAL_EMAIL_CONFIG_ERROR",
				toast: "Server misconfiguration: Email provider API key missing.",
			})
		}

		const { data, error } = await resend.emails.send({
			from,
			to,
			subject,
			text,
			html,
		})

		if (error) {
			console.error("❌ Resend Delivery Error:", error)
			throw new AppError({
				status: 500,
				error: "TRANSACTIONAL_EMAIL_DELIVERY_FAILED",
				toast: error.message || "Failed to deliver email via Resend.",
			})
		}

		console.log(`✉️ [PROD] Email dispatched via Resend: ${data?.id}`)
		return data
	}

	// 2. Development Mode: Try Resend if key exists, otherwise use Nodemailer (Mailpit)
	if (resend) {
		const { data, error } = await resend.emails.send({
			from,
			to,
			subject,
			text,
			html,
		})

		if (error) {
			console.error(
				"⚠️ Resend Dev Error (falling back to Mailpit if available):",
				error,
			)
		} else {
			console.log(`✉️ [DEV] Email dispatched via Resend: ${data?.id}`)
			return data
		}
	}

	// 3. Dev Fallback: Dynamic Import Nodemailer (Prevents bundling issues on Edge runtime)
	try {
		const nodemailer = (await import("nodemailer")).default
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST || "localhost",
			port: Number(process.env.MAIL_PORT) || 1025,
			secure: false,
			auth: process.env.MAIL_USER
				? {
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PASS ?? "",
					}
				: undefined,
		})

		const info = await transporter.sendMail({ from, to, subject, text, html })
		console.log(`✉️ [DEV] Local email delivered to Mailpit: ${info.messageId}`)
		return info
	} catch (error) {
		console.error("❌ Dev Local Email Error:", error)
		throw new AppError({
			status: 500,
			error: "TRANSACTIONAL_EMAIL_DELIVERY_FAILED",
			toast:
				error instanceof Error
					? error.message
					: "Something went wrong while dispatching local dev notifications.",
		})
	}
}
