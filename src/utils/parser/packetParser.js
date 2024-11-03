import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProtos.js';
export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  const commonPacket = protoMessages.common.Packet;
  let packet;
  try {
    packet = commonPacket.decode(data);
  } catch (e) {
    console.error(e);
  }
  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  if (clientVersion !== CLIENT_VERSION) {
    throw Error();
  }
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw Error();
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const PayloadType = protoMessages[namespace][typeName];
  let payload;
  try {
    payload = PayloadType.decode(packet.payload);
  } catch (e) {
    console.error(e);
  }

  const expectedFields = Object.keys(PayloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));
  if (missingFields.length > 0) {
    throw Error();
  }
  return { handlerId, userId, payload };
};
