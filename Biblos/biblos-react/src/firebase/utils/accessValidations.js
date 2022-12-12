import {auth} from '../context/context';
import {} from 'firebase/auth'

// label Constants
const WEAK_PASSWORD_MSG = 'Contraseña debil. Debe tener mas de 8 caracteres.';
const EMAIL_IN_USE_MSG = 'Correo ya en uso. Use otro.';
const USER_NOT_FOUND_MSG = 'Este usuario no existe.';
const WRONG_PASSWORD_MSG = 'Contraseña incorrecta.';
const INTERNAL_ERROR_MSG = 'El servidor no esta disponible.\nDisculpe los inconvenientes.';
//For authentication
/**Show an alert notifying to the user the authentication error.
 * @param e the error object caught at the moment.*/
export const showErrorAuth = (e) => {
    let messageAlert;

    switch (e.code) {
        case 'auth/email-already-in-use':
            messageAlert = EMAIL_IN_USE_MSG;
            break;

        case 'auth/user-not-found':
            messageAlert = USER_NOT_FOUND_MSG;
            break;

        case 'auth/wrong-password':
            messageAlert = WRONG_PASSWORD_MSG;
            break;

        case 'auth/weak-password':
            messageAlert = WEAK_PASSWORD_MSG;
            break;

        case 'auth/internal-error':
            messageAlert = WEAK_PASSWORD_MSG;
            break;

        default:
            console.log(e.message);
            messageAlert = INTERNAL_ERROR_MSG;
            return;
    }
    alert(messageAlert);
}