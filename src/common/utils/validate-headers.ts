import { IdentificationHeader } from '@yaperos/lib-node-log';
import { v4, validate as uuidValidate } from 'uuid';

export function validateHeaders(
  request: any,
  context,
  method?: string,
  service?: string,
  source?: string,
  fields?: Record<string, string | number | boolean>,
) {
  if (
    !(
      request.raw.headers[IdentificationHeader.REQUEST_ID] &&
      uuidValidate(request.raw.headers[IdentificationHeader.REQUEST_ID])
    )
  ) {
    request.raw.headers[IdentificationHeader.REQUEST_ID] = v4();
  }
  return {
    [IdentificationHeader.REQUEST_ID]:
      request.raw.headers[IdentificationHeader.REQUEST_ID],
    [IdentificationHeader.CORRELATION_ID]:
      request.raw.headers[IdentificationHeader.CORRELATION_ID] ||
      IdentificationHeader.NOT_PROVIDED,
    [IdentificationHeader.MESSAGE_ID]:
      request.raw.headers[IdentificationHeader.MESSAGE_ID] ||
      IdentificationHeader.NOT_PROVIDED,
    context: `${context} - ${method}`,
    service: service,
    source: source,
    fields: fields,
  };
}

export function validateHeadersGrpc(
  request: any,
  context,
  method?: string,
  service?: string,
  source?: string,
  fields?: Record<string, string | number | boolean>,
) {
  if (
    !(
      request.context.get(IdentificationHeader.REQUEST_ID) &&
      uuidValidate(request.context.get(IdentificationHeader.REQUEST_ID)[0])
    )
  ) {
    request.context.set(IdentificationHeader.REQUEST_ID);
    request.context.get(IdentificationHeader.REQUEST_ID)[0] = v4();
  }
  return {
    [IdentificationHeader.REQUEST_ID]: request.context.get(
      IdentificationHeader.REQUEST_ID,
    ),
    [IdentificationHeader.CORRELATION_ID]:
      request.context.get(IdentificationHeader.CORRELATION_ID) ||
      IdentificationHeader.NOT_PROVIDED,
    [IdentificationHeader.MESSAGE_ID]:
      request.context.get(IdentificationHeader.MESSAGE_ID) ||
      IdentificationHeader.NOT_PROVIDED,
    context: `${context} - ${method}`,
    service: service,
    source: source,
    fields: fields,
  };
}

export function validateHeadersGraphql(
  request: any,
  context,
  method?: string,
  service?: string,
  source?: string,
  fields?: Record<string, string | number | boolean>,
) {
  if (
    !(
      request.req.headers[IdentificationHeader.REQUEST_ID] &&
      uuidValidate(request.req.headers[IdentificationHeader.REQUEST_ID])
    )
  ) {
    request.req.headers[IdentificationHeader.REQUEST_ID] = v4();
  }
  return {
    [IdentificationHeader.REQUEST_ID]:
      request.req.headers[IdentificationHeader.REQUEST_ID],
    [IdentificationHeader.CORRELATION_ID]:
      request.req.headers[IdentificationHeader.CORRELATION_ID] ||
      IdentificationHeader.NOT_PROVIDED,
    [IdentificationHeader.MESSAGE_ID]:
      request.req.headers[IdentificationHeader.MESSAGE_ID] ||
      IdentificationHeader.NOT_PROVIDED,
    context: `${context} - ${method}`,
    service: service,
    source: source,
    fields: fields,
  };
}
