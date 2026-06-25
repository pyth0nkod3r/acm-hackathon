import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-8GGSK3GNXZ';

if (gaMeasurementId) {
  ReactGA.initialize(gaMeasurementId);
}

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (gaMeasurementId) {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
