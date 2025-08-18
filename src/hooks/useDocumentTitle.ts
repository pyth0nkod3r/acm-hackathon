import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteByPath } from '../config/routes';

export const useDocumentTitle = (customTitle?: string) => {
  const location = useLocation();

  useEffect(() => {
    if (customTitle) {
      document.title = customTitle;
      return;
    }

    const route = getRouteByPath(location.pathname);
    if (route?.title) {
      document.title = route.title;
    } else {
      document.title = 'AfCFTA Digital Trade Protocol Hackathon';
    }
  }, [location.pathname, customTitle]);
};

export const useDocumentMeta = (description?: string, keywords?: string) => {
  const location = useLocation();

  useEffect(() => {
    const route = getRouteByPath(location.pathname);
    const metaDescription =
      description ||
      route?.description ||
      'AfCFTA Digital Trade Protocol Hackathon - Join the future of digital trade in Africa';

    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', metaDescription);

    // Update meta keywords if provided
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', keywords);
    }
  }, [location.pathname, description, keywords]);
};
