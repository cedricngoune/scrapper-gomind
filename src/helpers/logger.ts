import winston from 'winston'

const { combine, timestamp, prettyPrint } = winston.format

export class Logger {
  private readonly _logger?: winston.Logger

  constructor (private readonly _requestId: string) {
    this._logger = winston.createLogger({
      level: 'debug',
      format: combine(
        timestamp(),
        prettyPrint()
      ),
      transports: [
        new winston.transports.Console()
      ]
    })
  }

  info (message: any): any {
    this._logger?.info({ requestId: this._requestId, message })
  }

  error (message: any): any {
    this._logger?.error({ requestId: this._requestId, message })
  }

  warn (message: any): any {
    this._logger?.warn({ requestId: this._requestId, message })
  }

  debug (message: any): any {
    this._logger?.debug({ requestId: this._requestId, message })
  }
}
