import { createParamDecorator, ExecutionContext, PipeTransform } from "@nestjs/common";

export type UserInterface = {
  userEmail: string;
  userName: string;
};

export const CurrentUser: (...dataOrPipes: (PipeTransform<any, any> | unknown[])[]) => ParameterDecorator =
  createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request: { user: UserInterface } = context.switchToHttp().getRequest<{ user: UserInterface }>();
    return request.user;
  });
