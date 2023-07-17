module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};

/**
 * Modifying the middleware to watch all files in client
 * and do a short polling to the development server after every 300 milliseconds
 * and fetch updates
 */
