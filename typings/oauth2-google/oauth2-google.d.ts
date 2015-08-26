interface RedirectUrl {
    protocol: string;
    host: string;
    uri: string;
}

interface OAuth2Config {
    clientId: string;
    clientSecret: string;
    redirectUrl: RedirectUrl;
}

interface SignIn {
    url: string;
    state: string;
}
