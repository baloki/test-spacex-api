export type ReturnDataFormat = {
  name: string;
  date_utc: string;
  primary_core_id: string;
  payloads: string[];
  image: string;
  success: boolean;
  reason?: string;
};
