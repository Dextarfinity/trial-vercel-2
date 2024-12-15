import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import LandingPage from "@/components/LandingPage.vue";
import AboutPage from "@/components/AboutPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import ProfilePage from "@/components/ProfilePage.vue";
import { supabase } from "@/supabase";

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
    },
    {
        path: "/home",
        name: "HomePage",
        component: HomePage,
        meta: { requiresAuth: true }, // Add metadata to protect this route
    },
    {
        path: "/about",
        name: "AboutPage",
        component: AboutPage,
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage,
    },
    {
        path: "/profile",
        name: "ProfilePage",
        component: ProfilePage,
        meta: { requiresAuth: true }, // Add metadata to protect this route
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { data: { user } } = await supabase.auth.getUser(); // Check if user is logged in

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Route requires authentication
        if (!user) {
            console.log("Redirecting to /login (authentication required)");
            return next("/login");
        }
    } else {
        // Routes accessible without authentication
        if (user && ["/", "/about", "/login", "/register"].includes(to.path)) {
            console.log("Redirecting to /home (user is logged in)");
            return next("/home");
        } else if (!user && to.path === "/butnotregisteredpath") {
            console.log("Redirecting to / (unauthenticated user on restricted path)");
            return next("/");
        }
    }

    next(); // Proceed to the requested route
});


export default router;
