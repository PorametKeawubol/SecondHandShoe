const isProd = process.env.NODE_ENV === 'production'
const conf = {
    isProd,
    apiUrlPrefix: isProd
        ? "https://wd12.cloud-workshop.online/api"
        : "http://localhost:1337/api",
    urlPrefix: isProd
        ? "https://wd12.cloud-workshop.online"
        : "http://localhost:1337",
};

export default conf;
