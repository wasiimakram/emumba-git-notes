import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';

import ListView from '../modules/home/common/ListView';
import { matchMedia } from './common/common';
import { renderWithProviders } from './common/test-utils';
import { mockServer } from './mocks/mockApi';
import { gistResponse } from './mocks/response';

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('ListView Data Display', () => {
  beforeAll(() => {
    matchMedia;
  });
  it('Gists List should Display', async () => {
    renderWithProviders(<ListView />); // Redux Wrapper
    // Check Listing Page render
    await waitFor(() => {
      expect(screen.getByTestId('list-view')).toBeInTheDocument();
    });
    // Check data from Api
    expect(
      await screen.findByText(gistResponse[0]?.owner?.login),
    ).toBeInTheDocument();
  });
});
