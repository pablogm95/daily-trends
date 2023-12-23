module.exports = {
  exit: true,
  bail: false,
  timeout: 0,
  extension: ["ts"],
  spec: "./src/**/*/*.ts",
  require: "ts-node/register",
};
