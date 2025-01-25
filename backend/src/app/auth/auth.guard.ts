import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

import { TokenService } from "./token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token: string | undefined = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload | string | null = this.tokenService.validateToken(token);
    if (payload) {
      request["user"] = payload;
      return true;
    }
    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token]: string[] = request.headers?.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
