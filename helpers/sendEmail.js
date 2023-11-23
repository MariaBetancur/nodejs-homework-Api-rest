const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {

    if (!data.to || !data.subject || !data.text) {
        throw new Error("Datos de entrada incompletos. Se requieren destinatario, asunto y texto.");
    }

    const email = { ...data, from: "mabo6241@gmail.com" };

    try {

        console.log("Enviando correo electrónico...");

        await sgMail.send(email);

        console.log("Correo electrónico enviado con éxito.");

        return true;
    } catch (error) {
 
        console.error("Error al enviar el correo electrónico:", error.message);
        throw error;
    }
};

module.exports = sendEmail;