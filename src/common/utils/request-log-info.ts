import { v4, validate as uuidValidate } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IdentificationHeader, RequestLogInfo } from '@yaperos/lib-node-log';

export function setRequestLogInfo(
  request: any,
  context,
  method?: string,
  service?: string,
  source?: string,
): RequestLogInfo {
  if (
    !(
      request.headers[IdentificationHeader.REQUEST_ID] &&
      uuidValidate(request.headers[IdentificationHeader.REQUEST_ID])
    )
  ) {
    request.headers[IdentificationHeader.REQUEST_ID] = v4();
  }
  return {
    [IdentificationHeader.REQUEST_ID]:
      request.headers[IdentificationHeader.REQUEST_ID],
    [IdentificationHeader.CORRELATION_ID]:
      request.headers[IdentificationHeader.CORRELATION_ID] ||
      IdentificationHeader.NOT_PROVIDED,
    [IdentificationHeader.MESSAGE_ID]:
      request.headers[IdentificationHeader.MESSAGE_ID] ||
      IdentificationHeader.NOT_PROVIDED,
    context: `${context} - ${method}`,
    service: service,
    source: source,
  };
}
