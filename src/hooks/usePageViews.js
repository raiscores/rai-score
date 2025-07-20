// src/hooks/usePageViews.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

/**
 * Custom React hook to track page views with Google Analytics (GA4) in a single-page application (SPA).
 *
 * Why? In a React SPA, changing pages doesn't reload the browser, so Google Analytics
 * won't automatically know when a user navigates between pages. This hook sends a "pageview"
 * event to GA4 every time the route changes.
 *
 * Usage: Call usePageViews() once, ideally near the top of your App component, *inside* the Router context.
 */
 
export default function usePageViews() {
  // useLocation gives us the current route/path.
  const location = useLocation();

  useEffect(() => {
    // Send a pageview to Google Analytics every time the route changes.
    // `location.pathname + location.search` gives the full path (e.g., "/about?foo=bar").
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]); // This effect runs whenever the location (URL) changes.
}