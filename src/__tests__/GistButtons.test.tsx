import '@testing-library/jest-dom';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import GistButtons from '../components/common/GistButtons';
import { mockLocalStorage } from './common/localStorage';
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

describe('Gist Buttons Display', () => {
  // Mock LocalStorage
  const { getItemMock } = mockLocalStorage();
  beforeAll(() => {
    getItemMock.mockReturnValue('access_token'); // Add token to localstorage using Mock
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Edit Button', async () => {
    renderWithProviders(<GistButtons />);
    expect(getItemMock).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('edit-link')).toBeInTheDocument();
    });
  });

  test('Star Button', async () => {
    renderWithProviders(<GistButtons />);
    expect(getItemMock).toHaveBeenCalled();

    expect(screen.getByTestId('star-button')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('star-button'));

    // Add this line to inspect the rendered component in the console
    // screen.debug();

    // await waitFor(() => {
    //   expect(screen.getByTestId('unstar-text')).toBeInTheDocument();
    // });
  });
});
