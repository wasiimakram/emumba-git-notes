import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { gistResponse } from './response';

const baseURL = process.env.REACT_APP_BASE_URL;
export const mockServer = setupServer(
  rest.get('/gists/public', (req, res, ctx) => {
    return res(ctx.json(gistResponse));
  }),
  rest.get(`/gists/${gistResponse[0].id}`, (req, res, ctx) => {
    return res(ctx.json(gistResponse[0]));
  }),

  rest.post('/gists', (req, res, ctx) => {
    return res(
      ctx.json({ status: 201 }),
      ctx.set('Authorization', `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`),
    );
  }),
  rest.get('/gists', (req, res, ctx) => {
    return res(ctx.json(gistResponse));
  }),
  rest.put(`/gists/${gistResponse[0].id}/star`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: { staredId: gistResponse[0].id },
        status: 204,
        headers: {},
        config: {},
      }),
    );
  }),
  rest.delete(`/gists/${gistResponse[0].id}/star`, (req, res, ctx) => {
    return res(ctx.json({ data: '', status: 204, headers: {}, config: {} }));
  }),
);
