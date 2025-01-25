import { createParamDecorator, ExecutionContext, PipeTransform } from "@nestjs/common";

import { CommonAuthRequest } from "../../app/api/api-auth/types";

export const CurrentUser: (...dataOrPipes: (PipeTransform<any, any> | unknown[])[]) => ParameterDecorator =
  createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request: { user: CommonAuthRequest } = context.switchToHttp().getRequest<{ user: CommonAuthRequest }>();
    return { email: request.user.email };
  });
