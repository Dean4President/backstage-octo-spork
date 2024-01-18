import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { myAwesomePluginPlugin, MyAwesomePluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(myAwesomePluginPlugin)
  .addPage({
    element: <MyAwesomePluginPage />,
    title: 'Root Page',
    path: '/my-awesome-plugin'
  })
  .render();
