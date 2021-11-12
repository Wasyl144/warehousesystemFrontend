import {createRouter, createWebHashHistory} from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/Profile.vue";
import UserProfile from "../views/UserProfile";
import Tables from "../views/Tables.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import store from '@/store/index.js';
import EditProfile from "../views/EditProfile";

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: DashboardLayout,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                components: {default: Dashboard},
            },
            {
                path: "/icons",
                name: "icons",
                components: {default: Icons},
                // eslint-disable-next-line no-unused-vars
                meta: {
                    permission: "auth.register"
                },
            },
            {
                path: "/maps",
                name: "maps",
                components: {default: Maps},
            },
            {
                path: "/profile",
                name: "profile",
                components: {default: UserProfile},
            },
            {
                path: "/tables",
                name: "tables",
                components: {default: Tables},
                meta: {
                    permission: 'user.index'
                }
            },
            {
                path: '/user/:id',
                name: 'showUser',
                component: Profile,
                meta: {
                    permission: "user.show"
                }
            },
            {
                path: '/user/edit/:id',
                name: 'editUser',
                component: EditProfile,
            },
        ],
    },
    {
        path: "/",
        redirect: "login",
        component: AuthLayout,
        children: [
            {
                path: "/login",
                name: "login",
                components: {default: Login},
            },
            {
                path: "/register",
                name: "register",
                components: {default: Register},
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/dashboard"
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    routes,
});


router.beforeEach(async (to, from, next) => {
    const can = store.getters["profile/permissionCan"]
    if (to.name !== "login" && !store.state.auth.status.loggedIn)
        next({name: "login"});
    else {
        if (to.meta.permission) {
            if (await can(to.meta.permission)) {
                next();
            } else {
                next({name: "dashboard"});
            }
        } else {
            next();
        }
    }
});


export default router;
