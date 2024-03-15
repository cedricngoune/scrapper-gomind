import { type ClientConfig } from './client-config.interface'
import { exec } from 'child_process'

export class ClientService {
  private readonly baseUrl: string
  private readonly headers: Record<string, any>

  constructor (config: ClientConfig) {
    this.baseUrl = config.baseUrl
    this.headers = config.headers
  }

  async get<T>(path: string, { params, headers }: { params?: Record<string, any>, headers?: Record<string, any> }): Promise<T> {
    const url = this.baseUrl + path + this.formatQuery(params ?? {})
    const command = `curl '${url}' ${this.formatHeaders(headers ?? {})}`
    return await this.exec<T>(command)
  }

  private async exec<T> (cmd: string): Promise<T> {
    return await new Promise((resolve, reject) => {
      exec(cmd, (err, out, stderr) => {
        if (err != null) {
          reject(err)
        } else {
          resolve(JSON.parse(out))
        }
      })
    })
  }

  private formatQuery (params: Record<string, string | number>): string {
    return '?' + Object.entries(params)
      .map(header => `${header[0]}=${header[1]}`)
      .join('&')
  }

  private formatHeaders (headers: Record<string, string | number>): string {
    headers = { ...this.headers, ...headers }
    return Object.entries(headers)
      .map(header => `\\\n-H '${header[0]}: ${header[1]}'`)
      .join(' ')
  }
}
