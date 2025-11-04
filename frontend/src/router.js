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
import PolicyView from "@/views/PolicyView.vue";
import TermsView from "@/views/TermsView.vue";


const routes = [
    {
        path: "/",
        component: MainView,
        meta: {
            title: 'Верное чутье',
            description: 'Удобная площадка для покупки и продажи щенков и взрослых охотничьих собак. Объявления, услуги по дрессировке и содержанию, профили собак с фото и родословными, общение, мероприятия и выставки ― всё для владельцев и профессионалов.'
        }
    },
    {
        path: "/login",
        component: LoginView,
        meta: {
            title: 'Вход — Верное чутье',
            description: 'Войдите в личный кабинет на платформе «Верное чутье»: доступ к объявлениям, профилям собак и общению с владельцами и профессионалами.'
        }
    },
    {
        path: "/registration",
        component: RegistrationView,
        meta: {
            title: 'Регистрация — Верное чутье',
            description: 'Создайте аккаунт на площадке «Верное чутье» — участвуйте в сделках, размещайте объявления, общайтесь и пользуйтесь всеми функциями.'
        }
    },
    {
        path: "/recovery",
        component: RecoveryView,
        meta: {
            title: 'Восстановление пароля — Верное чутье',
            description: 'Удобное и быстрое восстановление пароля для вашего аккаунта охотничьих собак на платформе «Верное чутье».'
        }
    },
    {
        path: "/post",
        component: PostsView,
        meta: {
            title: 'Объявления — покупка и продажа | Верное чутье',
            description: 'Просмотр объявлений о продаже и покупке щенков и взрослых охотничьих собак. Детальные профили, контакты владельцев, фото и родословные.'
        }
    },
    {
        path: "/service",
        component: PostsView,
        meta: {
            title: 'Услуги для собак | Верное чутье',
            description: 'Каталог услуг: дрессировка, натаска, содержание, вязка и помощь владельцам охотничьих собак. Поиск специалистов и размещение заявок.'
        }
    },
    {
        path: "/event",
        component: EventsView,
        meta: {
            title: 'Мероприятия и выставки | Верное чутье',
            description: 'Актуальные события, выставки и мероприятия для владельцев охотничьих собак на платформе «Верное чутье».'
        }
    },
    {
        path: "/store",
        component: StoreView,
        meta: {
            title: 'Создать объявление — Верное чутье',
            description: 'Разместите новое объявление о продаже собаки или услугах для владельцев охотничьих собак на платформе «Верное чутье».'
        }
    },
    {
        path: "/update/:type/:id",
        component: UpdateView,
        meta: {
            title: 'Редактировать объявление — Верное чутье',
            description: 'Редактирование назначенного контента: объявления, услуги, мероприятия. Удобно и быстро обновите информацию на «Верное чутье».'
        }
    },
    {
        path: "/show/:type/:id",
        component: ShowView,
        meta: {
            title: 'Объявление — Верное чутье',
            description: 'Подробный просмотр объявления с фото, родословной и контактами владельца. Вся информация о щенках и взрослых собаках.'
        }
    },
    {
        path: "/profile",
        component: ProfileView,
        meta: {
            title: 'Профиль — Верное чутье',
            description: 'Ваш личный профиль: настройки, объявления, избранное и подписки на платформе «Верное чутье».'
        }
    },
    {
        path: "/verify/:code",
        component: VerifyView,
        meta: {
            title: 'Верификация аккаунта — Верное чутье',
            description: 'Подтвердите свой аккаунт на платформе «Верное чутье» для полной безопасности и доступа ко всем функциям.'
        }
    },
    {
        path: "/favourite/:catchAll(.*)*",
        component: FavouriteView,
        meta: {
            title: 'Избранное — Верное чутье',
            description: 'Ваши сохранённые собаки, услуги и объявления на платформе «Верное чутье». Быстрый доступ к лучшему!'
        }
    },
    {
        path: "/ratings",
        component: MyRatingsView,
        meta: {
            title: 'Оценки и отзывы — Верное чутье',
            description: 'Все ваши оценки и отзывы: достоверная репутация специалистов и владельцев собак на платформе «Верное чутье».'
        }
    },
    {
        path: "/subscriptions",
        component: MySubscriptions,
        meta: {
            title: 'Подписки — Верное чутье',
            description: 'Следите за новыми объявлениями и услугами для охотничьих собак, управляйте вашими подписками на сайте «Верное чутье».'
        }
    },
    {
        path: "/favourites",
        component: MyFavourites,
        meta: {
            title: 'Избранные объявления — Верное чутье',
            description: 'Список ваших избранных объявлений, услуг и мероприятий про охотничьих собак на удобной платформе для владельцев.'
        }
    },
    {
        path: "/chats",
        component: ChatsView,
        meta: {
            title: 'Чаты с владельцами и специалистами — Верное чутье',
            description: 'Общайтесь с владельцами, покупателями и профессионалами. Удобные чаты для обсуждений и консультаций по собакам.'
        }
    },
    {
        path: "/notifications",
        component: NotificationView,
        meta: {
            title: 'Уведомления — Верное чутье',
            description: 'Получайте актуальные уведомления о новых событиях, сообщениях и изменениях на платформе охотничьих собак.'
        }
    },
    {
        path: "/notifications/:id",
        component: ShowNotificationView,
        meta: {
            title: 'Просмотр уведомления — Верное чутье',
            description: 'Подробности уведомления: новые предложения, сообщения и события для владельцев охотничьих собак.'
        }
    },
    {
        path: '/settings',
        component: SettingsPersonalView,
        meta: {
            title: 'Личные настройки — Верное чутье',
            description: 'Персональные настройки аккаунта, управление приватностью и уведомлениями на платформе «Верное чутье».'
        }
    },
    {
        path: '/settings/personal',
        component: SettingsPersonalView,
        meta: {
            title: 'Личные настройки — Верное чутье',
            description: 'Редактируйте личную информацию, фото и контакты на платформе охотничьих собак «Верное чутье».'
        }
    },
    {
        path: '/settings/documents',
        component: SettingsDocumentsView,
        meta: {
            title: 'Документы — Верное чутье',
            description: 'Загрузка и хранение документов, подтверждающих происхождение и родословные собак. Надёжная база для владельцев.'
        }
    },
    {
        path: '/settings/notifications',
        component: SettingsNotificationsView,
        meta: {
            title: 'Настройки уведомлений — Верное чутье',
            description: 'Управляйте способами получения уведомлений: новые объявления, сообщения и события платформы охотничьих собак.'
        }
    },
    {
        path: '/settings/auth',
        component: SettingsAuthView,
        meta: {
            title: 'Безопасность и вход — Верное чутье',
            description: 'Настройки безопасности аккаунта: смена пароля, двухфакторная аутентификация и другие опции вашей защиты.'
        }
    },
    {
        path: '/user/:id',
        component: UserView,
        meta: {
            title: 'Профиль пользователя — Верное чутье',
            description: 'Просмотрите профиль владельца или специалиста по охотничьим собакам. Контакты, объявления и отзывы на сайте «Верное чутье».'
        }
    },
    {
        path: '/policy',
        component: PolicyView,
        meta: {
            title: 'Политика конфиденциальности — Верное чутье',
        }
    },
    {
        path: '/terms',
        component: TermsView,
        meta: {
            title: 'Условия использования — Верное чутье',
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;