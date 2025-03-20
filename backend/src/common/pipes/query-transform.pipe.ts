import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ValidationError } from "class-validator/types/validation/ValidationError";
import { validate } from "class-validator";

@Injectable()
export class QueryTransformPipe<T extends object> implements PipeTransform {
  async transform(value: T, { metatype }: ArgumentMetadata): Promise<T> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object: T = plainToInstance(metatype, value) as T;
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(({ constraints }: ValidationError) => Object.values(constraints).join(", ")).join(", ")
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
