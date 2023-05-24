import { EXPERIENCE, HOME, LAUNCHPAD, MESSAGE, TEAM } from '../assets/images';

export const SidebarData = [
  {
    id: 0,
    title: 'Home',
    icon: HOME,
    alt: 'home',
    redirect: '/',
    activeTabs: ['/']
  },
  {
    id: 1,
    title: 'My Experiences',
    icon: EXPERIENCE,
    alt: 'experience',
    redirect: '/my-experience/experiences',
    activeTabs: ['/my-experience']
  },
  {
    id: 2,
    title: 'My Teams',
    icon: TEAM,
    alt: 'team',
    redirect: '/my-team',
    activeTabs: ['/my-team','/team-details']
  },
  {
    id: 3,
    title: 'Message',
    icon: MESSAGE,
    alt: 'message',
    redirect: '/message/inbox',
    activeTabs: ['/message']
  },
  {
    id: 4,
    title: 'Launchpad',
    icon: LAUNCHPAD,
    alt: 'launchpad',
    redirect: '/launchpad',
    activeTabs: ['/launchpad']
  }
];

export const FavouriteData = [
  {
    title: 'XR Crew',
    icon: HOME,
    alt: 'home'
  },
  {
    title: 'Google Team',
    icon: HOME,
    alt: 'experience'
  }
];
