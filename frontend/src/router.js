import {createRouter, createWebHistory} from 'vue-router';
import MainView from "@/views/MainView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import RecoveryView from "@/views/RecoveryView.vue";
import PostsView from "@/views/PostsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingsPersonalView from "@/views/Settings/SettingsPersonalView.vue";
import SettingsDocumentsView from "@/views/Settings/SettingsDocumentsView.vue";
import SettingsNotificationsView from "@/views/Settings/SettingsNotificationsView.vue";
import SettingsAuthView from "@/views/Settings/SettingsAuthView.vue";
import UserView from "@/views/UserView.vue";
import FavouriteView from "@/views/FavouriteView.vue";
import NotificationView from "@/views/NotificationView.vue";
import VerifyView from "@/views/VerifyView.vue";
import StoreView from "@/views/StoreView.vue";
import ShowView from "@/views/ShowView.vue";
import ShowNotificationView from "@/views/ShowNotificationView.vue";
import EventsView from "@/views/EventsView.vue";
import UpdateView from "@/views/UpdateView.vue";
import MyRatingsView from "@/views/MyRatingsView.vue";
import MySubscriptions from "@/views/MySubscriptions.vue";
import MyFavourites from "@/views/MyFavourites.vue";
import ChatsView from "@/views/ChatsView.vue";


const routes = [
    {
        path: "/",
        component: MainView,
    },
    {
        path: "/login",
        component: LoginView,
    },
    {
        path: "/registration",
        component: RegistrationView,
    },
    {
        path: "/recovery",
        component: RecoveryView,
    },

    {
        path: "/post",
        component: PostsView,
    },
    {
        path: "/service",
        component: PostsView,
    },
    {
        path: "/event",
        component: EventsView,
    },

    {
        path: "/store",
        component: StoreView,
    },
    {
        path: "/update/:type/:id",
        component: UpdateView,
    },
    {
        path: "/show/:type/:id",
        component: ShowView,
    },

    {
        path: "/profile",
        component: ProfileView,
    },
    {
        path: "/verify/:code",
        component: VerifyView,
    },
    {
        path: "/favourite/:catchAll(.*)*",
        component: FavouriteView,
    },
    {
        path: "/ratings",
        component: MyRatingsView,
    },
    {
        path: "/subscriptions",
        component: MySubscriptions,
    },
    {
        path: "/favourites",
        component: MyFavourites,
    },
    {
        path: "/chats",
        component: ChatsView,
    },
    {
        path: "/notifications",
        component: NotificationView,
    },
    {
        path: "/notifications/:id",
        component: ShowNotificationView,
    },

    {
        path: '/settings',
        component: SettingsPersonalView,
    },
    {
        path: '/settings/personal',
        component: SettingsPersonalView,
    },
    {
        path: '/settings/documents',
        component: SettingsDocumentsView,
    },
    {
        path: '/settings/notifications',
        component: SettingsNotificationsView,
    },
    {
        path: '/settings/auth',
        component: SettingsAuthView,
    },

    {
        path: '/user/:id',
        component: UserView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;