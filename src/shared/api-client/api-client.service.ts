import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiClientService {
  constructor(private httpService: HttpService) {}

  async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    const { data: result } = await firstValueFrom(
      this.httpService.get(url, config),
    );

    return result;
  }

  async post(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    const { data: result } = await firstValueFrom(
      this.httpService.post(url, data, config),
    );

    return result;
  }

  async put(url: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    const { data: result } = await firstValueFrom(
      this.httpService.put(url, data, config),
    );

    return result;
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    const { data: result } = await firstValueFrom(
      this.httpService.delete(url, config),
    );

    return result;
  }
}
