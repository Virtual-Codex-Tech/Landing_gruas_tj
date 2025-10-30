import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const app = express();

// ===================== MIDDLEWARES =====================
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://gruasjtservice.com",
    "https://tu-frontend.onrender.com" // tu frontend en Render
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== RUTA DE PRUEBA =====================
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "✅ Servidor SMTP (Gmail) activo",
    endpoint: "POST /send-email"
  });
});

// ===================== RUTA DE HEALTH CHECK =====================
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// ===================== RUTA PRINCIPAL =====================
app.post("/send-email", async (req, res) => {
  console.log("📩 Datos recibidos:", req.body);
  const { name, email, message } = req.body;

  // Validación básica
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Faltan campos: name, email o message",
    });
  }

  try {
    // ===================== TRANSPORTADOR SMTP (Gmail) =====================
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ===================== OPCIONES DEL CORREO =====================
    const mailOptions = {
      from: `"Formulario Web Gruas TJ" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${name} - Gruas TJ`,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email de contacto:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background:#f7f7f7;border-radius:6px;padding:12px;border:1px solid #ddd;">
          ${message}
        </div>
        <hr/>
        <small>Enviado desde el formulario de contacto de Gruas TJ Service.</small>
      `,
    };

    // ===================== ENVÍO =====================
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Correo enviado correctamente",
    });

  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// ===================== SERVIDOR =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});