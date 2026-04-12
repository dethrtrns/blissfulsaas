const { RtcTokenBuilder, RtcRole } = require('agora-token');
require('dotenv').config();

const appId = 'c27e8ac525d54357a353dbdf70b612fe';
const appCertificate = 'f2c11fac56c744c28f3dcaf6f26d47f1';
const channelName = '7d72345a-c052-4f1f-82ed-138908811e2f';
const uid = 0;
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

try {
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs,
    privilegeExpiredTs
  );
  console.log('Token generated successfully:', token);
} catch (error) {
  console.error('Error generating token:', error);
}
