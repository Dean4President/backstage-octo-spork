import { createComponentExtension, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myAwesomePluginPlugin = createPlugin({
  id: 'my-awesome-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const MyAwesomePluginPage = myAwesomePluginPlugin.provide(
  createRoutableExtension({
    name: 'MyAwesomePluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const EntityMyAwesomePluginCard = myAwesomePluginPlugin.provide(
  createComponentExtension({
    name: 'EntityMyAwesomePluginCard',
    component: {
      lazy: () =>
        import('./components/EntityOverviewCard').then(m => m.EntityOverviewCard),
    }
  }),
);
