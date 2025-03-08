require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Permitir peticiones de diferentes dominios
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Verificar que las variables de entorno se están cargando
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Cargado" : "No cargado");

// Ruta para recibir datos del formulario
app.post("/send", async (req, res) => {
    const { name, apellido, email, numero, mensaje } = req.body;

    // Configurar el servicio de correo (Gmail)
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Nuevo mensaje de contacto de ${name} ${apellido}`,
        text: `Nombre: ${name} ${apellido}\nEmail: ${email}\nNúmero: ${numero}\nMensaje: ${mensaje}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error enviando el correo:", error);
        res.status(500).json({ message: "Error al enviar el correo" });
    }
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente.");
});


// Iniciar el servidor y verificar que está corriendo
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});