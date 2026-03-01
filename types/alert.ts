import { Timestamp } from "firebase/firestore";

export interface Alert {
  id: string;
  message: string;
  sourceUrl: string;
  postedAt: Timestamp;
  detectedAt: Timestamp;
  readBy: string[];
  raw: string;
}
