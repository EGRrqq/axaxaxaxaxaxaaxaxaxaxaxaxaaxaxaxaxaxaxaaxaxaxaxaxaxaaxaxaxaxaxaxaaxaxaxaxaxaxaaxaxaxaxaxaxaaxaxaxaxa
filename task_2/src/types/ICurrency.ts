export interface ICurrency {
  result: "success" | "error";
  "error-type"?: string;
  provider: "https://www.exchangerate-api.com";
  documentation: "https://www.exchangerate-api.com/docs/free";
  terms_of_use: "https://www.exchangerate-api.com/terms";
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: Record<string, number>;
}
