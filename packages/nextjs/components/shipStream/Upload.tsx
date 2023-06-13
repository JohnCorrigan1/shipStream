import { BigNumber } from "ethers";

interface UploadProps {
  upload: string;
  uploadTime: BigNumber;
}

const Upload = ({ upload, uploadTime }: UploadProps) => {
  return <div>{upload + uploadTime.toString()}</div>;
};

export default Upload;
