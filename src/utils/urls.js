const getUrl = (local, server) => {
    return process.env.NODE_ENV === "development" ? local : server;
  };
  
  export const urls = {
    backEnd: getUrl(
      "http://localhost:8000",
      "https://quikapply.com/applications/sample"
    ),
  };
  