import { AuthGuard, IAuthGuard, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { decode } from "jsonwebtoken";

import { ConfigService } from "../config/config.service";
import { IncomeKeyConfig } from "../config/config.schema";

export interface UserInfo {
  userEmail: string;
  userName: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: (
        _request: Request,
        rawJwtToken: any,
        done: (err: any, secretOrKey?: string | Buffer) => void
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const {
          iss: issuer,
          aud: audience,
          sub
        }: { iss: string; aud: string; sub: string } = decode(rawJwtToken) as {
          iss: string;
          aud: string;
          sub: string;
        };

        if (configService.keysForIncomingRequests.audience !== audience) {
          done(true, null);
        }

        const keyInfo: IncomeKeyConfig[] = configService.keysForIncomingRequests.keys.filter(
          (key) => key.issuer === issuer
        );
        _request["user"] = sub;
        done(false, keyInfo[0].secret);
      }
    });
  }

  validate(payload: { sub: UserInfo }): UserInfo {
    return payload.sub;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") implements IAuthGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const userEmail: string = context.switchToHttp().getRequest<{ user: UserInfo }>().user.userEmail;

    return !!userEmail;
  }
}
