import { Injectable } from '@nestjs/common';
import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} from 'agora-access-token';
import { CreateTokenDTO } from 'src/dto/rtc';
import { env } from 'process';

// Fill the appID and appCertificate key given by Agora.io

// token expire time, hardcode to 3600 seconds = 1 hour
const expirationTimeInSeconds = 3600;
const role = RtcRole.PUBLISHER;

@Injectable()
export class RtcService {

    private appID = env.AGORA_APP_ID;
    private appCertificate = env.AGORA_CERTIFICATE;

    generateRtcToken = ({ roomID, userID }: CreateTokenDTO) => {

        return new Promise((resolve, reject) => {
        if (!roomID) {
            reject('Channel name is required');
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        // use 0 if uid is not specified

        const token = RtcTokenBuilder.buildTokenWithUid(
                this.appID,
                this.appCertificate,
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
            this.appID,
            this.appCertificate,
            account,
            RtmRole.Rtm_User,
            privilegeExpiredTs,
        );
        return resp.json({ key: key });
    };
}
