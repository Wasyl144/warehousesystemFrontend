import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/Profile.vue";
import UserProfile from "../views/Users/UserProfile";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import store from "@/store/index.js";
import EditProfile from "../views/Users/EditProfile";
import QrScanner from "../views/QrScanner";
import UsersTable from "../views/Users/UsersTable";
import RolesTable from "../views/Roles/RolesTable";
import AddRole from "../views/Roles/AddRole";
import EditRole from "../views/Roles/EditRole";
import AddProfile from "../views/Users/AddProfile";
import AddCategory from "../views/Categories/AddCategory";
import EditCategory from "../views/Categories/EditCategory";
import CategoryTable from "../views/Categories/CategoryTable";
import Permissions from "../views/Roles/Permissions";
import ItemsTable from "../views/Items/ItemsTable";
import AddItems from "../views/Items/AddItems";
import EditItems from "../views/Items/EditItems";
import ShowItem from "../views/Items/ShowItem";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/icons",
        name: "icons",
        components: { default: Icons },
        // eslint-disable-next-line no-unused-vars
        meta: {
          permission: "auth.register",
        },
      },
      {
        path: "/maps",
        name: "maps",
        components: { default: Maps },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: UserProfile },
      },
      {
        path: "/users",
        name: "users",
        components: { default: UsersTable },
        meta: {
          permission: "user.index",
        },
      },
      {
        path: "/user/:id",
        name: "showUser",
        component: Profile,
        meta: {
          permission: "user.show",
        },
      },
      {
        path: "/user/edit/:id",
        name: "editUser",
        component: EditProfile,
        meta: {
          permission: "user.update",
        },
      },
      {
        path: "/user/create",
        name: "createUser",
        component: AddProfile,
        meta: {
          permission: "user.store",
        },
      },
      {
        path: "/qrscanner",
        name: "qrscanner",
        component: QrScanner,
      },
      {
        path: "/roles",
        name: "indexRoles",
        component: RolesTable,
        meta: {
          permission: "role.index",
        },
      },
      {
        path: "/roles/create",
        name: "createRoles",
        component: AddRole,
        meta: {
          permission: "role.store",
        },
      },
      {
        path: "/roles/edit/:id",
        name: "editRoles",
        component: EditRole,
        meta: {
          permission: "role.update",
        },
      },
      {
        path: "/roles/permissions/:id",
        name: "editPermissions",
        component: Permissions,
        meta: {
          permission: "role.update",
        },
      },
      {
        path: "/categories",
        name: "indexCategories",
        component: CategoryTable,
        meta: {
          permission: "categories.index",
        },
      },
      {
        path: "/categories/create",
        name: "createCategories",
        component: AddCategory,
        meta: {
          permission: "categories.store",
        },
      },
      {
        path: "/categories/edit/:id",
        name: "editCategories",
        component: EditCategory,
        meta: {
          permission: "categories.update",
        },
      },
      {
        path: "/items",
        name: "indexItems",
        component: ItemsTable,
        meta: {
          permission: "items.index",
        },
      },
      {
        path: "/items/create",
        name: "createItems",
        component: AddItems,
        meta: {
          permission: "items.store",
        },
      },
      {
        path: "/items/edit/:id",
        name: "editItems",
        component: EditItems,
        meta: {
          permission: "items.update",
        },
      },
      {
        path: "/items/show/:id",
        name: "showItems",
        component: ShowItem,
        meta: {
          permission: "items.show",
        },
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
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach(async (to, from, next) => {
  const can = store.getters["profile/permissionCan"];
  if (to.name !== "login" && !store.state.auth.status.loggedIn)
    next({ name: "login" });
  else {
    if (to.meta.permission) {
      if (await can(to.meta.permission)) {
        next();
      } else {
        next({ name: "dashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;
