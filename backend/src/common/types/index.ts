export interface DateInterval {
  since?: string;
  until?: string;
}

export interface BaseErrorInterface {
  status: "ERROR";
  message: string;
}
