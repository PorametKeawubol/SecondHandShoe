const isProd = process.env.NODE_ENV === 'production'
const conf = {
    isProd,
    urlPrefix: isProd
        ? "https://wd12-admin.cloud-workshop.online"
        : "http://localhost:1337",
   
};

export default conf;
