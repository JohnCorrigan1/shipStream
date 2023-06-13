import { BigNumber } from "ethers";

export interface StreamType {
  name: string;
  duration: BigNumber;
  frequency: BigNumber;
  startTime: BigNumber;
  endTime: BigNumber;
  startBalance: BigNumber;
  currentBalance: BigNumber;
  uploads: readonly string[];
  streamed: BigNumber;
  totalStreams: BigNumber;
}
