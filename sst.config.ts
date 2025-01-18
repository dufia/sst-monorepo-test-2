/// <reference path="./.sst/platform/config.d.ts" />

import path = require("path");

export default $config({
  app(input) {
    return {
      name: "monorepo-template",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    await import("./infra/api");

    const bucket = new sst.aws.Bucket("MyBucketNext", {
      access: "public",
    });

    new sst.aws.Nextjs("MyWeb2", {
      path: "apps/next-test",
      link: [bucket],
    });

    return {
      MyBucket: storage.bucket.name,
    };
  },
});
