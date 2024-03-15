import * as fs from 'fs'
import * as path from 'path'

export class FileHelper {
  constructor (private readonly rootDir: string = '../../public') { }

  async saveFile (filename: string, fileContent: string): Promise<string> {
    // filename = `${new Date().getTime()}-${filename}`
    return await new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, this.rootDir, filename), fileContent, (err) => {
        (err != null) ? reject(err) : resolve(this.getFilePath(filename))
      })
    })
  }

  private getFilePath (filename: string): string {
    return path.join(__dirname, this.rootDir, filename)
  }
}
