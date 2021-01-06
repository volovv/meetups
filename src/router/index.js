import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  // сохранить позицию, если переход по стрелкам навигации
  if (savedPosition) {
    return savedPosition;
  } else {
    // сохранить позицию, если в маршрутах установлен saveScrollPosition
    const toSaveScrollPosition = to.matched.some(route => route.meta && route.meta.saveScrollPosition);
    const fromSaveScrollPosition = from.matched.some(route => route.meta && route.meta.saveScrollPosition);

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
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/MeetupsPage')
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('@/views/MeetupsPage')
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      redirect: (to) => ({ name: 'meetup-description', params: to.params }),
      name: 'meetup',
      props: true,
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('@/views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup-description',
          props: true,
          component: () => import('@/views/MeetupDescriptionPage')
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('@/views/MeetupAgendaPage')
        },
        {
          path: 'edit',
          name: 'meetup-edit',
          props: true,
          component: () => import('@/views/MeetupEditPage')
        }
      ]
    },
    {
      path: '/meetups/create',
      name: 'meetup-create',
      component: () => import('@/views/MeetupCreatePage')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterPage')
    }
  ]
});
