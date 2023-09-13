import '@testing-library/jest-dom';

import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import type ReactRouterDom from 'react-router-dom';

import { Details } from '../modules/gist';
import { matchMedia } from './common/common';
import { mockLocalStorage } from './common/localStorage';
import { renderWithProviders } from './common/test-utils';
import { mockServer } from './mocks/mockApi';
import { gistResponse } from './mocks/response';

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

const history = createMemoryHistory();
const mockHandleEdit = () => {
  history.push(`/edit/${gistResponse[0].id}`);
};
const pushSpy = jest.spyOn(history, 'push');
const mockHistoryPush = jest.fn();

const mHistory = {
  push: jest.fn(),
};
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
  useHistory: jest.fn(() => mHistory),
}));

describe('Details Page Data Display', () => {
  const { getItemMock, setItemMock } = mockLocalStorage();
  beforeAll(() => {
    matchMedia;
  });
  afterAll(() => {
    jest.resetAllMocks();
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
      await screen.findByText(gistResponse[0].owner.tag),
    ).toBeInTheDocument();

    // Edit Button when isLoggedIn using MockLocalstorage
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    // act(() => {
    //   fireEvent.click(screen.getByTestId('edit-link'));
    // });

    // Check if mockHandleEdit was called
    // expect(mockHandleEdit).toHaveBeenCalled();
    // expect(pushSpy).toHaveBeenCalledWith(`/edit/${gistResponse[0].id}`);
    fireEvent.click(screen.getByTestId('edit-link'));

    // expect(mockHistoryPush).toHaveBeenCalledWith(`/edit/${gistResponse[0].id}`);
    // console.log(
    //   'MYYY',
    //   mHistory.push.mock.calls[0],
    //   `/edit/${gistResponse[0].id}`
    // );
    // expect(mHistory.push).toBeCalledWith(`/edit/${gistResponse[0].id}`);

    // await waitFor(() => {
    //   expect(screen.getByTestId('edit-page')).toBeInTheDocument();
    // });
  });
});
