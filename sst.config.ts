/// <reference path="./.sst/platform/config.d.ts" />


export default $config({
  app() {
    return {
        name: "task-manager",
        home: "aws",
        region: "us-east-1"
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("MyApi", {
    });
    api.route("GET /", {
      handler: "lambda/index.handler",
    });
    api.route("$default", "lambda/index.handler");

    return {
      api: api.url,
    };
  },
});