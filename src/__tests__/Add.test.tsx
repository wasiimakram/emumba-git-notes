import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { mockServer } from './mocks/mockApi';
import { gistResponse } from './mocks/response';
import { matchMedia } from './common/common';
import '@testing-library/jest-dom';
import { renderWithProviders } from './common/test-utils';
import { Add, Edit } from '../modules/gist';
import { message } from 'antd';

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

    //Adding Gist
    fireEvent.click(screen.getByTestId('submit-gist'));
    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith(
        'Gist created successfully!'
      );
    });
  });
});
