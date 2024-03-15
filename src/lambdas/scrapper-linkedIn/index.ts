import { Logger } from '../../helpers/logger';
import { v4 as uuidv4 } from 'uuid';
import { LinkedInService } from './linkedIn.service';
import Papa from 'papaparse'
import { FileHelper } from '../../helpers/file.helper';

const KEYWORDS = [
    'angular',
    'node'
];

export async function handler(): Promise<any> {
    const logger = new Logger(uuidv4())

    try {
        logger.info('Starting scrapping linkedIn jobs')
        const linkedId = new LinkedInService();
        let res = await Promise.all(KEYWORDS.map(key => linkedId.searchByKey(key)));
        let fileContents = '';
        res.forEach(r => fileContents += Papa.unparse(r.jobs, {delimiter: ';'}));

        logger.info(`Uploading file to the bucket...`);
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