function setEnvironmentVariables() {
  process.env.NODE_ENV = "production";
}

setEnvironmentVariables();

export { setEnvironmentVariables };
