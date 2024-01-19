import { PluginDatabaseManager, errorHandler, resolvePackagePath } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { Knex } from 'knex';
import { Logger } from 'winston';
import { exampleUsers } from './constants';

export interface RouterOptions {
  logger: Logger;
  config: Config;
  database: PluginDatabaseManager;
}

export const applyDatabaseMigrations = async (knex: Knex): Promise<void> => {
  const migrationsDir = resolvePackagePath(
    '@dean/plugin-my-awesome-plugin-backend',
    'migrations',
  );

  await knex.migrate.latest({ directory: migrationsDir });
}

export const createRouter = async (options: RouterOptions): Promise<express.Router> => {
  const { logger, config, database } = options;

  const dbClient = await database.getClient();
  await applyDatabaseMigrations(dbClient);

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/hello', (_, response) => {
    logger.info('Get hello request');
    response.send({status: 'world'});
  });

  router.get('/config/:configId', (request, response) => {
    const { configId } = request.params;
    logger.info('Got request to read a config');
    const value = config.getOptionalString(`my-awesome-plugin.${configId}`);
    
    response.send({response: value});
  });

  router.get('/db/insert/:value', async (request, response) => {
    const { value } = request.params;
    
    const returnValue = await dbClient('my-awesome-table').first();
    logger.info('inserted to table');
    logger.info(returnValue);
    
    response.send({ response: returnValue });
  });

  router.get('/users', (_, response) => {
    logger.info('Get users from list');
    response.send({ users: exampleUsers });
  });

  router.get('/github/user', async (_, response) => {
    const backendBaseUrl = config.getString('backend.baseUrl');
    
    const proxyResponse = await fetch(`${backendBaseUrl}/api/proxy/github/user`);
    const data = await proxyResponse.json();

    return response.send(data);
  });

  router.use(errorHandler());
  return router;
}
