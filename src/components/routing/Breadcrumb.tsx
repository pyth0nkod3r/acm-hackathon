import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '../../types/navigation';

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const location = useLocation();

  // Generate breadcrumb items from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', isActive: location.pathname === '/' },
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isActive = index === pathSegments.length - 1;

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: isActive ? undefined : currentPath,
        isActive,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page unless explicitly provided
  if (!items && location.pathname === '/') {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}

            {item.isActive ? (
              <span
                className="text-gray-900 font-medium flex items-center"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href!}
                className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
