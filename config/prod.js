function setEnvironmentVariables() {
  process.env.BABEL_ENV = "production";
  process.env.NODE_ENV = "production";
}

setEnvironmentVariables();

export { setEnvironmentVariables };
