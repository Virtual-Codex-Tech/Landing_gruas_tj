import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

// ===================== MIDDLEWARES =====================
app.use(cors({
  origin: ["http://localhost:5173", "https://gruasjtservice.com"], // tu dominio o frontend
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware global para añadir headers personalizados
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // permite solicitudes desde cualquier origen
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ===================== RUTA DE PRUEBA =====================
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ status: "✅ Servidor SMTP (Gmail) activo en /send-email" });
});

// ===================== RUTA PRINCIPAL =====================
app.post("/send-email", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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
      secure: true, // SSL
      auth: {
        user: "jhonier321becerra@gmail.com", // tu cuenta Gmail
        pass: "elcs yxgb ucuw lrfh", // tu contraseña de aplicación
      },
    });

    // ===================== OPCIONES DEL CORREO =====================
    const mailOptions = {
      from: `"Formulario Web Gruas TJ" <jhonier321becerra@gmail.com>`,
      to: "jhonier321becerra@gmail.com", // destinatario
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email de contacto:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background:#f7f7f7;border-radius:6px;padding:12px;border:1px solid #ddd;">
          ${message}
        </div>
        <hr/>
        <small>Este mensaje fue enviado automáticamente desde el formulario de contacto de Gruas TJ Service.</small>
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
      error: error.message,
    });
  }
});

// ===================== SERVIDOR =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
