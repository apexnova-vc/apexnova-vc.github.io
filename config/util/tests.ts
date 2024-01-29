function setEnvironmentVariables() {
  process.env.NODE_ENV = "test";
  process.env.PUBLIC_URL = "/";
}

setEnvironmentVariables();

export { setEnvironmentVariables };
