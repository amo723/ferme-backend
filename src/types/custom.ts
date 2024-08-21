export interface UserPayload {
  id: string;
  username: string;
}

export interface CustomRequest {
  user?: UserPayload;
  [key: string]: any;
}

export interface customResponse {
  status: (code: number) => customResponse;
  json: (data: any) => void;
  [key: string]: any;
}
