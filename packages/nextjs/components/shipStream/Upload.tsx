import { BigNumberish } from "ethers";

interface UploadProps {
  upload: string;
  uploadTime: BigNumberish;
}

const Upload = ({ upload, uploadTime }: UploadProps) => {
  return (
    <div className="grid grid-cols-3 glass w-full rounded-lg p-3 text-primary-content shadow-lg">
      <div className="flex flex-col col-span-2">
        <label htmlFor="upload">Upload</label>
        <p id="upload">{upload}</p>
      </div>
      <div className="flex flex-col items-end">
        <label htmlFor="uploadTime">Upload Time</label>
        <p id="uploadTime">{new Date(parseInt(uploadTime.toString()) * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Upload;
