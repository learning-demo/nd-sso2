const commonLayout = {
  type: 'pattern',
  pattern: '%[[%d] [%p] [%z] [%c] -%] %m'
};

const log4jsConfig = {
  appenders: {
    console: {
      type: 'console',
      layout: commonLayout
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info'
    }
  }
};

module.exports = log4jsConfig;