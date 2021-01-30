import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  // сохранить позицию, если переход по стрелкам навигации
  if (savedPosition) {
    return savedPosition;
  } else {
    // сохранить позицию, если в маршрутах установлен saveScrollPosition
    const toSaveScrollPosition = to.matched.some(
      route => route.meta && route.meta.saveScrollPosition
    );
    const fromSaveScrollPosition = from.matched.some(
      route => route.meta && route.meta.saveScrollPosition
    );

    if (toSaveScrollPosition && fromSaveScrollPosition) {
      return false;
    }

    // перейти по хэшу
    if (to.hash) {
      return {
        selector: to.hash
      };
    }

    // по умолчанию вернуться наверх
    return {
      x: 0,
      y: 0
    };
  }
}

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: "/",
      component: () => import("@/views/MeetupsPage"),
      name: "index"
    },
    {
      path: "/meetups",
      component: () => import("@/views/MeetupsPage"),
      name: "meetups"
    },
    {
      path: "/meetups/:meetupId(\\d+)",
      component: () => import("@/views/MeetupPage"),
      name: "meetup",
      redirect: to => ({ name: "meetup-description", params: to.params }),
      props: route => ({
        meetupId: +route.params.meetupId
      }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true
      },
      children: [
        {
          path: "description",
          component: () => import("@/views/MeetupDescriptionPage"),
          name: "meetup-description",
          props: true
        },
        {
          path: "agenda",
          component: () => import("@/views/MeetupAgendaPage"),
          name: "meetup-agenda",
          props: true
        }
      ]
    },
    {
      path: "/meetups/:meetupId(\\d+)/edit",
      component: () => import("@/views/MeetupEditPage"),
      name: "meetup-edit",
      props: route => ({
        meetupId: +route.params.meetupId
      })
    },
    {
      path: "/meetups/create",
      component: () => import("@/views/MeetupCreatePage"),
      name: "meetup-create"
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage"),
      name: "login"
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterPage"),
      name: "register"
    },
    {
      path: "*",
      component: () => import("@/views/NotFoundPage")
    }
  ]
});
