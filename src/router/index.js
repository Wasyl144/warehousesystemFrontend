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
            },
            {
                path: '/user/:id',
                name: 'showUser',
                component: Profile
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


router.beforeEach((to, from, next) => {
    if (to.name !== "login" && !store.state.auth.status.loggedIn)
        next({name: "login"});
    else next();
});

export default router;
