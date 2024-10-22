interface AppConfig {
  appHost: string;
  apiUrl: string | undefined;
  environment: string;
  version: string;
}

const config: AppConfig = {
  appHost: `${window.location.protocol}//${window.location.hostname}`,
  apiUrl: process.env.REACT_APP_API_URL || undefined,
  environment: process.env.REACT_APP_ENVIRONMENT || "development",
  version: process.env.REACT_APP_VERSION || "1.0.0",
};

export default config;
