const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (16-char)
  },
});

async function sendGiftCardEmail({ recipientName, recipientEmail, senderName, message, amount, code, expiresAt }) {
  const expiryFormatted = new Date(expiresAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td align="center" style="background:#1a1a1a;padding:36px 40px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:28px;letter-spacing:10px;color:#ffffff;text-transform:uppercase;">Lumière</p>
            <p style="margin:6px 0 0;font-size:9px;letter-spacing:5px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Luxury Boutique</p>
          </td>
        </tr>

        <!-- Gold bar -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#c9a96e,#e8c97a,#c9a96e);"></td></tr>

        <!-- Gift card visual -->
        <tr>
          <td style="background:#ffffff;padding:50px 40px 30px;text-align:center;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:5px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">A Gift for You</p>
            <h1 style="margin:0 0 6px;font-size:36px;color:#1a1a1a;font-family:Georgia,serif;">Dear ${recipientName},</h1>
            <p style="margin:0 0 30px;font-size:14px;color:#666666;font-family:Arial,sans-serif;line-height:1.6;">
              <strong style="color:#1a1a1a;">${senderName}</strong> has sent you a Lumière gift card.
            </p>

            ${message ? `
            <!-- Personal message -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
              <tr>
                <td style="border-left:3px solid #c9a96e;padding:14px 20px;background:#faf9f7;text-align:left;">
                  <p style="margin:0;font-size:15px;color:#444;font-family:Georgia,serif;font-style:italic;line-height:1.7;">"${message}"</p>
                  <p style="margin:10px 0 0;font-size:10px;letter-spacing:3px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">— ${senderName}</p>
                </td>
              </tr>
            </table>` : ''}

            <!-- Card visual -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
              <tr>
                <td style="background:#1a1a1a;border:1px solid #c9a96e;padding:32px 28px;border-radius:2px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0;font-family:Georgia,serif;font-size:20px;letter-spacing:8px;color:#ffffff;text-transform:uppercase;">Lumière</p>
                        <p style="margin:4px 0 0;font-size:8px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Gift Card</p>
                      </td>
                      <td align="right">
                        <p style="margin:0;font-size:10px;letter-spacing:3px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Value</p>
                        <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:32px;color:#ffffff;">$${amount.toLocaleString()}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding-top:24px;">
                        <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Redemption Code</p>
                        <p style="margin:0;font-family:'Courier New',monospace;font-size:22px;color:#ffffff;letter-spacing:4px;">${code}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 30px;font-size:13px;color:#888;font-family:Arial,sans-serif;">
              Valid until <strong style="color:#1a1a1a;">${expiryFormatted}</strong>
            </p>

            <!-- CTA -->
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5174'}/products"
               style="display:inline-block;background:#c9a96e;color:#ffffff;text-decoration:none;font-size:10px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;padding:14px 36px;">
              Shop Now
            </a>
          </td>
        </tr>

        <!-- How to redeem -->
        <tr>
          <td style="background:#faf9f7;padding:30px 40px;border-top:1px solid #ebe8e0;">
            <p style="margin:0 0 16px;font-size:9px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">How to Redeem</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${['Browse our curated collections at lumiere.com', 'Add your favourite pieces to your bag', 'Enter code <strong>' + code + '</strong> at checkout to apply your balance'].map((step, i) => `
              <tr>
                <td width="28" valign="top" style="padding:4px 12px 12px 0;">
                  <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#c9a96e;">${i + 1}.</p>
                </td>
                <td style="padding-bottom:12px;">
                  <p style="margin:0;font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.5;">${step}</p>
                </td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:10px;color:#666;font-family:Arial,sans-serif;">
              © ${new Date().getFullYear()} Lumière Luxury Boutique · 42 Galle Road, Colombo 03, Sri Lanka
            </p>
            <p style="margin:8px 0 0;font-size:10px;color:#555;font-family:Arial,sans-serif;">
              Questions? <a href="mailto:hello@lumiere.com" style="color:#c9a96e;text-decoration:none;">hello@lumiere.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Lumière Luxury Boutique" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: `🎁 You've received a $${amount} Lumière Gift Card from ${senderName}`,
    html,
  });
}

module.exports = { sendGiftCardEmail };
