import { MockedProvider } from '@apollo/client/testing';
import type { Preview } from '@storybook/react';
import { createCache } from '../src/lib/apolloClient';

const preview: Preview = {
  parameters: {
    apolloClient: {
      MockedProvider,
      cache: createCache(),
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
