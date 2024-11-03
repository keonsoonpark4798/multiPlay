import { HANDLER_IDS } from '../constants/handerIds.js';
import locationUpdateHandler from './game/locationUpdate.handler.js';
import initialHandler from './user/initial.handler.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handlers: initialHandler,
    protoType: 'initial.InitialPacket',
  },

  [HANDLER_IDS.LOCATION_UPDATE]: {
    handlers: locationUpdateHandler,
    protoType: 'game.LocationUpdatePayload',
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].handlers;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].protoType;
};
