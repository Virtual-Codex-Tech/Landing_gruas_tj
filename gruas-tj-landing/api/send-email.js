import nodemailer from 'nodemailer';
import process from 'process'

export default async function handler(req, res) {
  // Configurar CORS manualmente para Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  // Validación
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Faltan campos: name, email o message'
    });
  }

  try {
    // Configuración Gmail para Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Gruas TJ Service" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `📧 Nuevo mensaje de ${name} - Gruas TJ`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #2563eb;">Nuevo mensaje desde la web</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 6px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    return res.status(200).json({
      success: true,
      message: 'Correo enviado correctamente',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al enviar el correo: ' + error.message
    });
  }
}