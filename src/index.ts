import KinesisVideoMedia from './KinesisVideoMedia';
import AWS from 'aws-sdk';
import * as AWSConfig from './aws-config';
import getMedia from './media';

// Top-Level-Await はまだですか
async function main(): Promise<void> {
  const media = await getMedia();

  const {
    streamArn,
    ...others
  } = AWSConfig;
  AWS.config.update(others);

  const kinesisVideo = new AWS.KinesisVideo(AWSConfig);

  const { DataEndpoint } = await kinesisVideo.getDataEndpoint({
    APIName: 'PUT_MEDIA',
    StreamARN: streamArn, // or StreamName: 'xxxx',
  }).promise();

  const dataEndpoint = DataEndpoint;
  if (!dataEndpoint) throw new Error('Failed to get DataEndpoint');

  const kinesisVideoMedia = new KinesisVideoMedia({
    endpoint: dataEndpoint,
  });

  const { Payload: res } = await kinesisVideoMedia.putMedia({
    FragmentTimecodeType: 'RELATIVE',
    ProducerStartTimestamp: new Date().toUTCString(),
    Body: media, // WebMファイルのBlobかBuffer
    StreamARN: streamArn, // or StreamName: 'xxxx',
  }).promise();

  res.split(/\n/g).filter(s => s).map(s => JSON.parse(s)).forEach(r => console.log(r));
}
main().then(() => console.log('OK'), error => console.error(error));
