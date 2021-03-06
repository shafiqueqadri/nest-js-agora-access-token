import { Injectable } from '@nestjs/common';
import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} from 'agora-access-token';
import { CreateTokenDTO } from 'src/dto/rtc';

// Fill the appID and appCertificate key given by Agora.io
var appID = "03093b1d7f0b45d0b1dd6f6114ea7b9b";
var appCertificate = "6968c4697afc47e0b1806abece668fa8";

// token expire time, hardcode to 3600 seconds = 1 hour
const expirationTimeInSeconds = 3600;
const role = RtcRole.PUBLISHER;

@Injectable()
export class RtcService {
  generateRtcToken = ({ roomID, userID }: CreateTokenDTO) => {

    return new Promise((resolve, reject) => {
      if (!roomID) {
        reject('Channel name is required');
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
      // use 0 if uid is not specified

      const token = RtcTokenBuilder.buildTokenWithUid(
        appID,
        appCertificate,
        roomID,
        userID as any,
        role,
        privilegeExpiredTs,
      );
      resolve({ token, roomID });
    });
  };

  generateRtmToken = function(req: any, resp: any) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const account = req.query.account;
    if (!account) {
      return resp.status(400).json({ error: 'account is required' });
    }

    const key = RtmTokenBuilder.buildToken(
      appID,
      appCertificate,
      account,
      RtmRole.Rtm_User,
      privilegeExpiredTs,
    );
    return resp.json({ key: key });
  };
}
