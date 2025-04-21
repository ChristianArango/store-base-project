export const validarUsername = (username) => {
    // Permitido: letras, números y guiones bajos, pero NO puede empezar con un número.
    const regex = /^[a-zA-Z][a-zA-Z0-9_]{5,59}$/;
    return regex.test(username);
};


export const validarPassword = (password) => {
    // Contraseña mínima de 6 y máxima de 60 caracteres
    if (password.length < 6 || password.length > 60) {
        return false;
    }

    // Validar que contenga al menos una letra mayúscula
    const mayusculaRegex = /[A-Z]/;
    if (!mayusculaRegex.test(password)) {
        return false;
    }

    // Validar que contenga al menos un número o un símbolo
    const numeroOSimboloRegex = /[\d!@#$%^&*(),.?":{}|<>]/;
    if (!numeroOSimboloRegex.test(password)) {
        return false;
    }

    return true;
};