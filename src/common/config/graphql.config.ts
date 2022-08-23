import { GraphQLRequestContext, GraphQLResponse } from 'apollo-server-core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IdentificationHeader } from '@yaperos/lib-node-log';

export const graphqlConfig = {
  autoSchemaFile: 'schema.gql',
  formatResponse: (
    response: GraphQLResponse | null,
    reqContext: GraphQLRequestContext<any>,
  ) => {
    if (reqContext.response && reqContext.response.http) {
      const headers = reqContext.response.http.headers;
      const req = reqContext.context.req;
      headers.set(
        IdentificationHeader.CORRELATION_ID,
        req.headers[IdentificationHeader.CORRELATION_ID],
      );
      headers.set(IdentificationHeader.REQUEST_ID, req.id);
    }
    return response as GraphQLResponse;
  },
};
