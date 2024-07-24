import type { StorybookConfig } from '@storybook/nextjs';
import { startCase } from 'lodash';
import vitePluginNext from 'vite-plugin-storybook-nextjs';

function buildSection(context: string) {
  return {
    // 👇 The directory field sets the directory your stories
    directory: `../src/${context}`,
    // 👇 The titlePrefix field will generate automatic titles for your stories
    titlePrefix: startCase(context),
    // 👇 Storybook will load all files that contain the stories extension
    files: `**/*.stories.*`,
  };
}

const config: StorybookConfig = {
  stories: [
    {
      directory: '../src/components',
      titlePrefix: 'Components',
      files: '**/*.@(mdx|stories.*)',
    },
    {
      directory: '../src/containers',
      titlePrefix: 'Containers',
      files: '**/*.@(mdx|stories.*)',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-apollo-client',
    '@chromatic-com/storybook',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  // @ts-ignore
  viteFinal: config => {
    config.plugins.push(vitePluginNext());
    return config;
  },
  docs: {},
};

export default config;
