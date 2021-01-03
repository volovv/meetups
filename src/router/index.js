import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
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
        showReturnToMeetups: true
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
