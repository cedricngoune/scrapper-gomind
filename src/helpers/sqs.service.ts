import { IEvent } from './../event.interface';
import { SQS } from 'aws-sdk';

const QUEUE_URL = 'https://sqs.eu-west-2.amazonaws.com/280215833518/EventQueue';

export async function sendToQueue(event: IEvent) {
  const sqs = new SQS({ apiVersion: '2012-11-05', region: 'eu-west-2' });
  return await sqs
    .sendMessage({
      DelaySeconds: 1,
      MessageBody: JSON.stringify(event),
      QueueUrl: QUEUE_URL,
    })
    .promise();
}


export const getmessages = ({ Records: records }: { Records: { body: string }[] }) => records.map((msg: { body: string }) => {
  try {
      return JSON.parse(msg.body);
  } catch (error) {
      return msg.body;
  }
})
