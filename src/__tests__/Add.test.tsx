import '@testing-library/jest-dom';

import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { message } from 'antd';

import { Add } from '../modules/gist';
import { matchMedia } from './common/common';
import { renderWithProviders } from './common/test-utils';
import { mockServer } from './mocks/mockApi';

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

// Mock message.success
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
  },
}));

describe('Add Data Display', () => {
  beforeAll(() => {
    matchMedia;
  });
  it('Add Page & Submit Gist', async () => {
    await act(async () => renderWithProviders(<Add />));
    const gistDescription = screen.getByTestId('description');
    const fileName = screen.getByTestId('fileName');
    const fileContent = screen.getByTestId('fileContent');

    fireEvent.change(fileName, { target: { value: 'swap.json' } });
    fireEvent.change(fileContent, { target: { value: 'Lorem Ipsum' } });
    fireEvent.change(gistDescription, { target: { value: 'Swap File' } });

    // Adding Gist
    fireEvent.click(screen.getByTestId('submit-gist'));
    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith(
        'Gist created successfully!',
      );
    });
  });
});
