import { createStore } from "vuex"
import { auth } from "./modules/auth.module";
import { users } from "./modules/users.module";
import { profile } from "./modules/profile.module";
import { alerts } from "./modules/alerts.module";

export default createStore({
    modules: {
        auth,
        users,
        profile,
        alerts
    }
})