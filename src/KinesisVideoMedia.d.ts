import Base from 'aws-sdk/clients/kinesisvideomedia';
import { Request, AWSError } from 'aws-sdk';

export type PutMediaInput = {
  FragmentTimecodeType: 'ABSOLUTE' | 'RELATIVE';
  ProducerStartTimestamp?: string;
  Body?: Blob | Buffer | ArrayBuffer;
  ContentType?: string;
} & (
  | { StreamName: string }
  | {
      StreamARN: string;
    }
);

export type PutMediaOutput = {
  Payload: string; // パースする機能が見つからなかった。
};

export default class KinesisVideoMedia extends Base {
  putMedia(params: PutMediaInput): Request<PutMediaOutput, AWSError>;
}
