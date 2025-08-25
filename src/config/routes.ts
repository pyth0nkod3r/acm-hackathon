import { lazy } from 'react';
import type { RouteConfig } from '../types/navigation';

// Lazy load all page components for code splitting
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Application = lazy(() => import('../pages/Application'));
const Challenges = lazy(() => import('../pages/Challenges'));
const Schedule = lazy(() => import('../pages/Schedule'));
// const Awards = lazy(() => import('../pages/Awards'));
// const Gallery = lazy(() => import('../pages/Gallery'));
// const Highlights = lazy(() => import('../pages/Highlights'));
// const Partners = lazy(() => import('../pages/Partners'));
const PartnerRegistration = lazy(() => import('../pages/PartnerRegistration'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    title: 'Home - ACM Hackathon',
    description:
      'Join the future of digital trade in Africa with the ACM Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/about',
    component: About,
    title: 'About - ACM Hackathon',
    description:
      'Learn about the ACM Hackathon mission, goals, and event details',
    isProtected: false,
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contact - ACM Hackathon',
    description: 'Get in touch with the ACM Hackathon organizers',
    isProtected: false,
  },
  {
    path: '/registration',
    component: Application,
    title: 'Apply - ACM Hackathon',
    description: 'Apply for the ACM Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/challenges',
    component: Challenges,
    title: 'Challenges - ACM Hackathon',
    description:
      'Explore the key challenges and innovation areas for the ACM Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/schedule',
    component: Schedule,
    title: 'Schedule - ACM Hackathon',
    description: 'View the complete event schedule for the ACM Hackathon 2025',
    isProtected: false,
  },
  // {
  //   path: '/awards',
  //   component: Awards,
  //   title: 'Awards & Judging - ACM Hackathon',
  //   description:
  //     'Learn about prizes, judging criteria, and post-hackathon opportunities for the ACM Hackathon 2025',
  //   isProtected: false,
  // },
  // {
  //   path: '/gallery',
  //   component: Gallery,
  //   title: 'Gallery - ACM Hackathon',
  //   description: 'Explore photos and moments from the ACM Hackathon events',
  //   isProtected: false,
  // },
  // {
  //   path: '/highlights',
  //   component: Highlights,
  //   title: 'Highlights - ACM Hackathon',
  //   description:
  //     'Discover success stories, testimonials, and achievements from the ACM Hackathon',
  //   isProtected: false,
  // },
  // {
  //   path: '/judges',
  //   component: Partners,
  //   title: 'Mentors & Judges -  ACM Hackathon',
  //   description:
  //     'Meet our distinguished panel of mentors and judges for the ACM Hackathon 2025',
  //   isProtected: false,
  // },
  {
    path: '/partner-registration',
    component: PartnerRegistration,
    title: 'Partner Registration - ACM Hackathon',
    description: 'Register to become a partner for the ACM Hackathon 2025',
    isProtected: false,
  },
];

// Helper function to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

// Helper function to get all public routes
export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter(route => !route.isProtected);
};

// Helper function to get all protected routes
export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter(route => route.isProtected);
};
