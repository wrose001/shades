import Cookies from 'js-cookie';

class AuthManager {

    constructor() {}

    handleAuthentication = () => {
        // this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    isAuthenticated = () => {
        const jwt =  Cookies.get('jwt');
        return jwt != null && jwt !== "";
        //new Date().getTime() < this.expiresAt;
    }

    logOut = () => {
        Cookies.remove('jwt')
    }
}

const authClient = new AuthManager();
export default authClient;