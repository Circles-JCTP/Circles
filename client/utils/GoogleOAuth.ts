import env from "../env";

const GoogleOAuth = () => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URL,
    client_id: env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const urlOptions = new URLSearchParams(options);
  return `${url}?${urlOptions.toString()}`;
};

export default GoogleOAuth;
