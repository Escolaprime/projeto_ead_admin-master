import store from "@/store/index";
import storage from "@/store/modules/auth/storage";

export default async (to,from,next) => {

    if(to.name !== 'login' && !store.getters['auth/token_exists']) {

        try {
            await store.dispatch('auth/check_token');
            next({ path: to.path });
        } catch(error) {
            next({ name: 'login' });
        }

    } else {

        const token = storage.get("token");
        if(to.name === 'login' && token) {

            next({ path: '/Home/' });

        } else {

            next();
        }
    }
}