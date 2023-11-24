const User = require('./User');
const login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        if (!user.verify) {
            return res.status(401).json({ message: 'El usuario no está verificado. Verifica tu cuenta antes de iniciar sesión.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
const reVerification = async (req, res) => {
    const { verificationToken } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { verificationToken },
            { $set: { verify: true, verificationToken: null } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Token de verificación no válido.' });
        }

        res.status(200).json({ message: 'Verificación exitosa.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = {
    login,
     reVerification,
};



