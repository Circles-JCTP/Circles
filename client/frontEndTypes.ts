export type Env = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_OAUTH_REDIRECT_URL: string;
};

export interface Friend {
  id: number;
  user_id: number;
  friend_id: number;
  email: string;
  name: string;
}
