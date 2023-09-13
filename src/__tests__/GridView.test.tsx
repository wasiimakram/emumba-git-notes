import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';

import GridView from '../modules/home/common/GridView';
import { matchMedia } from './common/common';
import { renderWithProviders } from './common/test-utils';
import { mockServer } from './mocks/mockApi';
import { gistResponse } from './mocks/response';

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('GridView Data Display', () => {
  beforeAll(() => {
    matchMedia;
  });
  it('Gists Grid View should Display', async () => {
    // Get / Update Redux state using this wrapper
    renderWithProviders(<GridView />);
    // Check Listing Page render
    await waitFor(() => {
      expect(screen.getByTestId('grid-view')).toBeInTheDocument();
    });
    // Check data from Api
    expect(
      await screen.findByText(gistResponse[0].owner.type),
    ).toBeInTheDocument();
  });
});
