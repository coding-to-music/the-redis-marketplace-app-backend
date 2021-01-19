const joi = require("joi");

const { joiOptions, joiSchemas } = require("../validation");

const { joiObjectRequired, joiInteger } = joiSchemas;

const serverEnvs = {
  port: process.env.PORT,
};

const serverSchema = joiObjectRequired({
  port: joiInteger,
});

const serverConfig = joi.attempt(serverEnvs, serverSchema, {
  ...joiOptions,
  convert: true,
});

module.exports = serverConfig;
