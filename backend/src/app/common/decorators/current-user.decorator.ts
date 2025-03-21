import { createParamDecorator, ExecutionContext, PipeTransform } from "@nestjs/common";

import { AuthRequestDto } from "../../api/api-auth/dto/request.dto";

export const CurrentUser: (...dataOrPipes: (PipeTransform<any, any> | unknown[])[]) => ParameterDecorator =
  createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request: { user: AuthRequestDto } = context.switchToHttp().getRequest<{ user: AuthRequestDto }>();
    return { email: request.user.email };
  });
