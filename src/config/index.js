import { config as development } from './environments/development';
import { config as staging } from './environments/staging';
import { config as production } from './environments/production';

const env = process.env.NODE_ENV || 'development';

const environment = {
  development,
  staging,
  production,
};

export const variables = environment[env];
