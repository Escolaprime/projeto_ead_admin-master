import storage from "./storage";

export default {
    
    get_user({ user }) {
        return user;
    },

    token_exists({ token }) {
        return !!token;
    }
}