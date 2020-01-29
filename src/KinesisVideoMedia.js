const AWS = require('aws-sdk');
const Base = require('aws-sdk/apis/kinesis-video-media-2017-09-30.min.json');
const PutMedia = require('./PutMedia.json');

const Model = {
  ...Base,
  operations: {
    ...Base.operations,
    PutMedia,
  },
};

const service = {};
AWS.apiLoader.services['kinesisvideomedia'] = service;
const KinesisVideoMedia = AWS.Service.defineService('kinesisvideomedia', [
  '2017-09-30',
]);

const attributes = {
  get: function get() {
    const model = Model;
    model.paginators = {};
    return model;
  },
  enumerable: true,
  configurable: true,
};
Object.defineProperty(service, '2017-09-30', attributes);

module.exports = KinesisVideoMedia;
