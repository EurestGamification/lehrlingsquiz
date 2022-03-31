import ReactGA from "react-ga4";

export const initializeGoogleAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID || "");
  ReactGA.send("pageview");
};
