import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ===================== MIDDLEWARES =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== SERVIR FRONTEND COMPILADO =====================
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ===================== RUTA PARA ENVIAR EMAILS =====================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Campos faltantes" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Formulario Web Gruas TJ" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Correo enviado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===================== INICIAR SERVIDOR =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
