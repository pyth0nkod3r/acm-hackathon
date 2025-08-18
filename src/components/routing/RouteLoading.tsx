import { useLocation } from 'react-router-dom';
import { PageLoading } from '../ui/page-loading';

export function RouteLoading() {
  const location = useLocation();

  // Determine loading variant based on route
  const getLoadingVariant = (pathname: string) => {
    if (pathname === '/application') return 'form';
    if (pathname === '/contact') return 'form';
    if (pathname === '/gallery') return 'gallery';
    if (
      [
        '/challenges',
        '/schedule',
        '/awards',
        '/about',
        '/highlights',
        '/partners',
      ].includes(pathname)
    ) {
      return 'content';
    }
    return 'default';
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <PageLoading variant={getLoadingVariant(location.pathname)} />
    </div>
  );
}
