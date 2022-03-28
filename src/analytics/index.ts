import ReactGA from "react-ga";

export const initializeGoogleAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID || "");
  ReactGA.pageview(window.location.pathname + window.location.search);
};
