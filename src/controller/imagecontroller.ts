import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIAJPTSTM7OVMODCUJQ",
  secretAccessKey: "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",
});

const s3download = (params: any) => {
  return new Promise((resolve, reject) => {
    s3.createBucket({
      Bucket: "bearhands3bucket",
    }, function () {
      s3.getObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          console.log("Successfully dowloaded data from  bucket");
          resolve(data);
        }
      });
    });
  });
}

const getFileString = async (fileName: string) => {
  const params = {
    Bucket: "bearhands3bucket",
    Key: fileName,
  };
  const file: any = await s3download(params);
  const fileString = file.Body;
  console.log("file");
  console.log(fileString);
  return fileString;
};

const uploadFile = async (fileString: string, Key: string) => {
  const params = {
    Bucket: "bearhands3bucket",
    Key,
    Body: fileString,
  };
  s3.upload(params, (err: any) => {
    if (err) {
      console.log(err);
    }
    return true;
  });
  return true;
}


export default {uploadFile, getFileString};
