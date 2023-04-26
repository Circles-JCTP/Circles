import env from "../env";

const GoogleOAuth = () => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: "https://circles-jctp.herokuapp.com/",
    client_id: "96346976581-r87c02shl09p425rip82eqgnq04j1g0g.apps.googleusercontent.com",
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
