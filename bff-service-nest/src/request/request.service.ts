import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class RequestService {
    constructor(private httpService: HttpService) {}

    sendRequest(method: string, url: string, body?): any {
      return this.httpService[method](url, body).toPromise();
    }
}
