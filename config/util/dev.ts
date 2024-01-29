function setEnvironmentVariables() {
  process.env.NODE_ENV = "development";
}

setEnvironmentVariables();

export { setEnvironmentVariables };
