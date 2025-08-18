/**
 * Navigation and routing type definitions
 */

export interface NavigationItem {
  label: string;
  href: string;
  isActive: boolean;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
  label: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  website?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string | undefined;
  isActive: boolean;
}

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title: string;
  description?: string;
  isProtected?: boolean;
}

export type NavigationState = 'idle' | 'loading' | 'error';
