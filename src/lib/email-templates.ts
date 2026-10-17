// src/lib/email-templates.ts
type EmailTemplateProps = {
	title: string
	body: string
	contentHtml: string
	footerNotice?: string
}

/**
 * Base layout wrapper enforcing consistent dark-violet styling
 */
function renderBaseEmailLayout({
	title,
	body,
	contentHtml,
	footerNotice = "Security Notice: This link/code expires shortly. If you did not initiate this request, you can safely ignore this email.",
}: EmailTemplateProps): string {
	return `
		<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #090514; color: #f4f4f5; padding: 32px; border-radius: 16px; max-width: 480px; margin: 0 auto; border: 1px solid rgba(139, 92, 246, 0.2);">
			<h2 style="color: #a78bfa; margin-top: 0; margin-bottom: 8px; font-size: 20px; font-weight: 700; letter-spacing: -0.025em;">
				${title}
			</h2>
			<p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
				${body}
			</p>

			${contentHtml}

			<p style="color: #71717a; font-size: 11px; line-height: 1.4; margin: 24px 0 0 0; border-top: 1px solid #1f192f; padding-top: 16px;">
				${footerNotice}
			</p>
		</div>
	`
}

/**
 * Reset Password Email Component
 */
export function renderResetPasswordEmail(url: string): string {
	const contentHtml = `
		<div style="text-align: center; margin-bottom: 24px;">
			<a href="${url}" style="display: inline-block; background: #7c3aed; color: #ffffff; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
				Reset Account Password
			</a>
		</div>
	`

	return renderBaseEmailLayout({
		title: "Reset Password Request",
		body: "We received a request to update your Waitlistify security credentials. Click the button below to set up a new password.",
		contentHtml,
	})
}

/**
 * OTP Verification Email Component
 */
export function renderOtpVerificationEmail(otp: string, type: string): string {
	const contentHtml = `
		<div style="background: #100b21; border: 1px solid #7c3aed; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 24px;">
			<span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; letter-spacing: 0.25em; color: #a78bfa; padding-left: 0.25em;">${otp}</span>
		</div>
	`

	return renderBaseEmailLayout({
		title: "Verify Your Identity",
		body: `Please enter the following 6-digit security code on your verification screen to proceed with <strong>${type}</strong>.`,
		contentHtml,
	})
}

/**
 * Waitlist Welcome Email Component
 */
export function renderWaitlistWelcomeEmail({
	waitlistName,
	referralCode,
	referralUrl,
}: {
	waitlistName: string
	referralCode: string
	referralUrl?: string
}): string {
	const contentHtml = `
		<div style="background: #100b21; border: 1px solid #7c3aed; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 24px;">
			<p style="color: #a1a1aa; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Your Unique Referral Code</p>
			<span style="font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: 700; letter-spacing: 0.15em; color: #a78bfa;">${referralCode}</span>
		</div>
		${
			referralUrl
				? `
			<div style="text-align: center; margin-bottom: 24px;">
				<a href="${referralUrl}" style="display: inline-block; background: #7c3aed; color: #ffffff; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
					View Leaderboard & Share
				</a>
			</div>
		`
				: ""
		}
	`

	return renderBaseEmailLayout({
		title: `You're on the list for ${waitlistName}!`,
		body: `Thanks for signing up. Share your referral code with friends to climb higher on the waitlist.`,
		contentHtml,
		footerNotice:
			"You received this email because you registered for a waitlist hosted on Waitlistify.",
	})
}
