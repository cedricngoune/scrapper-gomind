import { ClientConfig } from "./client-config.interface";
import { exec } from 'child_process';

export class ClientService {
  private baseUrl: string;
  private headers: Record<string, any>;


  constructor(config: ClientConfig) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  async get(path: string, { params, headers }: { params?: Record<string, any>; headers?: Record<string, any>; }) {
    const url = this.baseUrl + path + this.formatQuery(params ?? {});
    const command = `curl '${url}' ${this.formatHeaders(headers ?? {})}`;
    return await this.exec(command);
  }

  private async exec(cmd: string) {
    return new Promise((resolve, reject) => {
      exec(cmd, (err, out, stderr) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(out))
        }
      })
    });
  }

  private formatQuery(params: Record<string, any>) {
    return '?' + Object.entries(params)
      .map(header => `${header[0]}=${header[1]}`)
      .join('&')
  }

  private formatHeaders(headers: Record<string, any>) {
    headers = { ...this.headers, ...headers };
    return Object.entries(headers)
      .map(header => `\\\n-H '${header[0]}: ${header[1]}'`)
      .join(' ')
  }

}