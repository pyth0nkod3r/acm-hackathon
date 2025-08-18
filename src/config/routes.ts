import { lazy } from 'react';
import type { RouteConfig } from '../types/navigation';

// Lazy load all page components for code splitting
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Application = lazy(() => import('../pages/Application'));
const Challenges = lazy(() => import('../pages/Challenges'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Awards = lazy(() => import('../pages/Awards'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Highlights = lazy(() => import('../pages/Highlights'));
const Partners = lazy(() => import('../pages/Partners'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    title: 'Home - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Join the future of digital trade in Africa with the AfCFTA Digital Trade Protocol Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/about',
    component: About,
    title: 'About - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Learn about the AfCFTA Digital Trade Protocol Hackathon mission, goals, and event details',
    isProtected: false,
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contact - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Get in touch with the AfCFTA Digital Trade Protocol Hackathon organizers',
    isProtected: false,
  },
  {
    path: '/application',
    component: Application,
    title: 'Apply - AfCFTA Digital Trade Protocol Hackathon',
    description: 'Apply for the AfCFTA Digital Trade Protocol Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/challenges',
    component: Challenges,
    title: 'Challenges - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Explore the key challenges and innovation areas for the AfCFTA Digital Trade Protocol Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/schedule',
    component: Schedule,
    title: 'Schedule - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'View the complete event schedule for the AfCFTA Digital Trade Protocol Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/awards',
    component: Awards,
    title: 'Awards & Judging - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Learn about prizes, judging criteria, and post-hackathon opportunities for the AfCFTA Digital Trade Protocol Hackathon 2025',
    isProtected: false,
  },
  {
    path: '/gallery',
    component: Gallery,
    title: 'Gallery - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Explore photos and moments from the AfCFTA Digital Trade Protocol Hackathon events',
    isProtected: false,
  },
  {
    path: '/highlights',
    component: Highlights,
    title: 'Highlights - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Discover success stories, testimonials, and achievements from the AfCFTA Digital Trade Protocol Hackathon',
    isProtected: false,
  },
  {
    path: '/partners',
    component: Partners,
    title: 'Mentors & Judges - AfCFTA Digital Trade Protocol Hackathon',
    description:
      'Meet our distinguished panel of mentors and judges for the AfCFTA Digital Trade Protocol Hackathon 2025',
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
