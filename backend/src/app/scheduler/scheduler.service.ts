import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { ConfigService } from "../common/config/config.service";

import { SubRequestInterface } from "./types";

@Injectable()
export class SchedulerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async sendCode(code: string, sub: SubRequestInterface): Promise<void> {
    return await this.postRequest<void>(`code`, sub, { code });
  }

  private async postRequest<T>(url: string, sub: SubRequestInterface, body?: unknown): Promise<T> {
    try {
      const { data: responseData }: { data: T } = await this.httpService
        .post<T>(`${url}`, body, {
          headers: {
            Authorization: `Bearer ${this.configService.getToken(sub)}`
          }
        })
        .toPromise();
      return responseData;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
