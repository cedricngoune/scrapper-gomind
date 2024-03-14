import { S3 } from 'aws-sdk';

const BUCKET_NAME = 'scrapper-jobs-gomind'

const ACL = 'private'

export async function saveFile(data: string, path: string) {
    const s3 = new S3({
        apiVersion: '2006-03-01',
        s3ForcePathStyle: true
    });

    const filename = `${path}-${(new Date()).toISOString().split('T')[0]}.csv`;

    return await s3.upload({ Bucket: BUCKET_NAME, Key: filename, Body: data, ACL }).promise();;
}

export async function getFile(path: string) {
    const s3 = new S3({
        apiVersion: '2006-03-01',
        s3ForcePathStyle: true
    });

    const filename = `${path}-${(new Date()).toISOString().split('T')[0]}.csv`;
    const object = await s3.getObject({ Bucket: BUCKET_NAME, Key: filename}).promise();

    return object.Body?.toString('utf-8');
}