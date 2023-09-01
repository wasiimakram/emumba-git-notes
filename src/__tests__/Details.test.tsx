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
import { Details } from '../modules/gist';
import { mockLocalStorage } from './common/localStorage';
import { createMemoryHistory } from 'history';

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

const history = createMemoryHistory();
const mockHandleEdit = () => {
  history.push('/edit/123'); // Replace with the actual URL
};
const pushSpy = jest.spyOn(history, 'push');

describe('Details Page Data Display', () => {
  const { getItemMock, setItemMock } = mockLocalStorage();
  beforeAll(() => {
    matchMedia;
  });
  it('Details View should  ', async () => {
    getItemMock.mockReturnValue('access_token'); // Mock local storage

    const mockHandleEdit = jest.fn();

    renderWithProviders(<Details />);

    await waitFor(() => {
      expect(getItemMock).toHaveBeenCalled();
      expect(screen.getByTestId('edit-link')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    });
    // Check data from Api
    expect(
      await screen.findByText(gistResponse[0].owner.tag)
    ).toBeInTheDocument();

    // Edit Button
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTestId('edit-link'));
    });

    // Check if mockHandleEdit was called
    // expect(mockHandleEdit).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith(`/edit/${gistResponse[0].id}`); // Replace with the actual URL

    // await waitFor(() => {
    //   expect(screen.getByTestId('edit-page')).toBeInTheDocument();
    // });
  });
});
