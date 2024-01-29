function setEnvironmentVariables() {
  process.env.BABEL_ENV = "test";
  process.env.NODE_ENV = "test";
  process.env.PUBLIC_URL = "";
}

setEnvironmentVariables();

export { setEnvironmentVariables };
