//Constants
const EMAIL_FORMAT = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// Error Messages
/**Array of values to specify is not contain values*/
export const MESSAGE_NO_VALUES = (...values) => {
    return values.join(',').concat(' debe contener valores.');
}

export const isEquals = (a, b) => {
    return a === b;
}

export const isNotEquals = (a, b) => {
    return !isEquals(a, b);
}

export const isValidEmail = (email) => {
    const match = email.match(EMAIL_FORMAT);
    if (!match) {
        alert("El formato del correo no es valido.");
    }
    return match;
}