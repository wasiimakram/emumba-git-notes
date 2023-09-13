import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';

import { Edit } from '../modules/gist';
import { matchMedia } from './common/common';
import { renderWithProviders } from './common/test-utils';
import { mockServer } from './mocks/mockApi';
import { gistResponse } from './mocks/response';

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('Edit Data Display', () => {
  beforeAll(() => {
    matchMedia;
  });
  it('Edit page should Display', async () => {
    renderWithProviders(<Edit />); // Redux Wrapper
    // Check Listing Page render
    await waitFor(() => {
      expect(screen.getByTestId('edit-page')).toBeInTheDocument();
    });
    // Check data from Api
    expect(
      await screen.findByText(gistResponse[0].owner.tag),
    ).toBeInTheDocument();
    // Check button
    expect(await screen.findByText('Update Code')).toBeInTheDocument();

    // fireEvent.click(screen.getByText('Update Code'));
  });
});
