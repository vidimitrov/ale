import { ILogger } from './ILogger';
import * as _ from 'lodash';

const currentEnv = process.env.NODE_ENV || 'development';

const loggers = {
  development: require('./logger.development'),
  staging: require('./logger.development'),
  production: require('./logger.development')
};

export function getLogger(options) {
  const env = _.get(options, 'env', currentEnv);
  const loggerPath = _.get(options, 'loggerPath');
  const loggerReference = loggers[env].Logger;

  if (loggerPath) {
    return _.mapValues(loggerReference, v => _.curry(v)(loggerPath));
  }

  return loggerReference;
};
