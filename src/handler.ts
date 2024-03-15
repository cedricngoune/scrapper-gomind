import { Logger } from './helpers/logger';
import { v4 as uuidv4 } from 'uuid';
import * as Papa from 'papaparse'
import { FileHelper } from './helpers/file.helper';
import { platforms } from './platform.constant';
import { keywords } from './keword.constant';



export async function handler(): Promise<any> {
    const logger = new Logger(uuidv4())

    try {
        logger.info('Starting scrapping jobs');
        const promises = platforms.map(platform => keywords.map(keyword => platform.searchByKey(keyword))).flat();
        let res = await Promise.all(promises);
        let fileContents = '';
        res.forEach(r => fileContents += Papa.unparse(r.jobs, { delimiter: ';' }));

        logger.info(`Uploading the file...`);
        const fileHelper = new FileHelper();

        return {
            statusCode: 200,
            body: await fileHelper.saveFile('linkedIn.csv', fileContents)
        }
    } catch (error) {
        logger.error(error)
        return {
            statusCode: 500,
            error
        }
    }
}