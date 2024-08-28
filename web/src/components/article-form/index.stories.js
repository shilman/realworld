import { fireEvent, userEvent, expect, within, fn } from '@storybook/test';
import { ArticleForm } from '.';
import { TagsInput } from '../../containers/tags-input';

const meta = {
  component: ArticleForm,
  args: {
    onSubmit: fn(),
  },
  argTypes: {
    onSubmit: { action: true },
  },
  parameters: {
    apolloClient: {
      mocks: [
        { request: { query: TagsInput.query }, result: { data: { tags: [] } } },
      ],
    },
  },
};

export default meta;

export const AsGuestWithInvalidFormShowsErrors = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));

    const errors = await canvas.findAllByText(
      new RegExp('is a required field', 'i')
    );

    await expect(args.onSubmit).not.toHaveBeenCalled();
    await expect(errors).toHaveLength(3);
  },
};

export const AsGuestWithValidFormCallsOnSubmit = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));

    fireEvent.change(canvas.getByLabelText(new RegExp('Title', 'i')), {
      target: { value: 'How to build webapps that scale' },
    });

    fireEvent.change(canvas.getByLabelText(new RegExp('Description', 'i')), {
      target: {
        value:
          'Web development technologies have evolved at an incredible clip over the past few years.',
      },
    });

    fireEvent.change(canvas.getByLabelText(new RegExp('Body', 'i')), {
      target: {
        value:
          "## Introducing RealWorld.\nIt's a great solution for learning how other frameworks work.",
      },
    });

    await userEvent.click(
      canvas.getByRole('button', { name: new RegExp('Publish Article', 'i') })
    );

    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
