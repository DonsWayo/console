import { expect, test } from "vitest";
import { Log } from "../src/log";

function expectError(input: string[]) {
  const err = Log.extractError(input);
  expect(err).not.toBeUndefined();
  expect(err).toMatchSnapshot();
}

test("node invoke", () => {
  expectError([
    `2023-09-15T13:03:59.257Z`,
    `8179a9db-e726-451b-898f-93923b3e7bbd`,
    `ERROR`,
    `Invoke Error`,
    `{"errorType":"NoSuchBucket","errorMessage":"The specified bucket does not exist","name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"requestId":"SEDJ1KBFNG26CADF","extendedRequestId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"sstbootstrap-useast124d14e4b-txrftoxsysmw","RequestId":"SEDJ1KBFNG26CADF","HostId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","message":"The specified bucket does not exist","stack":["NoSuchBucket: The specified bucket does not exist"," at de_NoSuchBucketRes (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51859:21)"," at de_ListObjectsV2CommandError (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51807:19)"," at runMicrotasks (<anonymous>)"," at processTicksAndRejections (node:internal/process/task_queues:96:5)"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:42732:20"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41547:18"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:43230:38"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41269:22"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56745:19"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56891:3"]}`,
  ]);
});

test("powertools", () =>
  expectError([
    "2023-10-11T12:17:59.036Z",
    "0638bcc9-5472-4a56-b723-3c63f09893e2",
    "ERROR",
    "Invoke Error",
    `{"errorType":"FullBatchFailureError","errorMessage":"All records failed processing. See individual errors below.","name":"FullBatchFailureError","recordErrors":[{"errorType":"FooError","errorMessage":"test error","name":"FooError","stack":["FooError: test error","    at j.processRecord (/lib/tracer.ts:54:9)","    at j.processRecord (/node_modules/@aws-lambda-powertools/batch/lib/BatchProcessor.js:10:39)","    at record (/node_modules/@aws-lambda-powertools/batch/lib/BasePartialProcessor.js:23:70)","    at Array.map (<anonymous>)","    at j.process (/node_modules/@aws-lambda-powertools/batch/lib/BasePartialProcessor.js:23:49)","    at processPartialResponse (/node_modules/@aws-lambda-powertools/batch/lib/processPartialResponse.js:10:21)","    at Runtime.handler (/lib/tracer.ts:69:10)","    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1147:29)"]}],"stack":["FullBatchFailureError: All records failed processing. See individual errors below.","    at j.clean (/node_modules/@aws-lambda-powertools/batch/lib/BasePartialBatchProcessor.js:23:19)","    at j.process (/node_modules/@aws-lambda-powertools/batch/lib/BasePartialProcessor.js:25:14)","    at processPartialResponse (/node_modules/@aws-lambda-powertools/batch/lib/processPartialResponse.js:10:5)"]}`,
  ]));

test("node uncaught exception", () => {
  expectError([
    `2023-09-15T13:03:59.257Z`,
    `8179a9db-e726-451b-898f-93923b3e7bbd`,
    `ERROR`,
    `Uncaught Exception`,
    `{"errorType":"NoSuchBucket","errorMessage":"The specified bucket does not exist","name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"requestId":"SEDJ1KBFNG26CADF","extendedRequestId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"sstbootstrap-useast124d14e4b-txrftoxsysmw","RequestId":"SEDJ1KBFNG26CADF","HostId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","message":"The specified bucket does not exist","stack":["NoSuchBucket: The specified bucket does not exist"," at de_NoSuchBucketRes (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51859:21)"," at de_ListObjectsV2CommandError (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51807:19)"," at runMicrotasks (<anonymous>)"," at processTicksAndRejections (node:internal/process/task_queues:96:5)"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:42732:20"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41547:18"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:43230:38"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41269:22"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56745:19"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56891:3"]}`,
  ]);
});

test("node inline multiline", () => {
  expectError([
    `2023-09-15T12:43:23.014Z`,
    `31eaad44-5f5e-41ae-ae77-db15c7f7c8a2`,
    `ERROR`,
    `ZodError: [\n  {\n    "code": "too_small",\n    "minimum": 1,\n    "type": "string",\n    "inclusive": true,\n    "exact": false,\n    "message": "String must contain at least 1 character(s)",\n    "path": [\n      "slug"\n    ]\n  },\n  {\n    "code": "too_small",\n    "minimum": 3,\n    "type": "string",\n    "inclusive": true,\n    "exact": false,\n    "message": "String must contain at least 3 character(s)",\n    "path": [\n      "slug"\n    ]\n  },\n  {\n    "validation": "regex",\n    "code": "invalid_string",\n    "message": "Invalid",\n    "path": [\n      "slug"\n    ]\n  }\n]\n    at Object.get error [as error] (file:///var/task/packages/functions/src/replicache/push1.mjs:37260:23)\n    at _ZodObject.parse (file:///var/task/packages/functions/src/replicache/push1.mjs:37363:18)\n    at Object.result (file:///var/task/packages/functions/src/replicache/push1.mjs:58013:27)\n    at file:///var/task/packages/functions/src/replicache/push1.mjs:76714:46\n    at Object.fn (file:///var/task/packages/functions/src/replicache/push1.mjs:58262:16)\n    at Server.execute (file:///var/task/packages/functions/src/replicache/push1.mjs:58279:16)\n    at file:///var/task/packages/functions/src/replicache/push1.mjs:76784:22\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async db.transaction.isolationLevel (file:///var/task/packages/functions/src/replicache/push1.mjs:55329:25) {\n  issues: [\n    {\n      code: \'too_small\',\n      minimum: 1,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 1 character(s)\',\n      path: [Array]\n    },\n    {\n      code: \'too_small\',\n      minimum: 3,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 3 character(s)\',\n      path: [Array]\n    },\n    {\n      validation: \'regex\',\n      code: \'invalid_string\',\n      message: \'Invalid\',\n      path: [Array]\n    }\n  ],\n  addIssue: [Function (anonymous)],\n  addIssues: [Function (anonymous)],\n  errors: [\n    {\n      code: \'too_small\',\n      minimum: 1,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 1 character(s)\',\n      path: [Array]\n    },\n    {\n      code: \'too_small\',\n      minimum: 3,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 3 character(s)\',\n      path: [Array]\n    },\n    {\n      validation: \'regex\',\n      code: \'invalid_string\',\n      message: \'Invalid\',\n      path: [Array]\n    }\n  ]\n}\n`,
  ]);
});

test("node inline", () => {
  expectError([
    `2023-09-12T00:55:20.974Z`,
    `662fa6b4-dc47-4d49-a7e2-200ad7ce1537`,
    `ERROR`,
    `DatabaseError: target: sst.-.primary: vttablet: rpc error: code = AlreadyExists desc = Duplicate entry 'foo' for key 'workspace.slug' (errno 1062) (sqlstate 23000) (CallerID: lq15hm6s0ctusshuarsx): Sql: \"insert into workspace(id, time_created, time_updated, time_deleted, slug, stripe_customer_id, stripe_subscription_id, stripe_subscription_item_id) values (:vtg1 /* VARCHAR */, default, default, default, :vtg2 /* VARCHAR */, default, default, default)\", BindVars: {REDACTED}\n    at _Connection.execute (file:///var/task/packages/functions/src/replicache/push1.mjs:47211:13)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:69523:5\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:76353:22\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:76423:9\n    at async db.transaction.isolationLevel (file:///var/task/packages/functions/src/replicache/push1.mjs:55325:25)\n    at async _Connection.transaction (file:///var/task/packages/functions/src/replicache/push1.mjs:47190:19)\n    at async createTransaction (file:///var/task/packages/functions/src/replicache/push1.mjs:55322:20)\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:76380:5 {\n  status: 400,\n  body: {\n    message: \`target: sst.-.primary: vttablet: rpc error: code = AlreadyExists desc = Duplicate entry 'foo' for key 'workspace.slug' (errno 1062) (sqlstate 23000) (CallerID: lq15hm6s0ctusshuarsx): Sql: \"insert into workspace(id, time_created, time_updated, time_deleted, slug, stripe_customer_id, stripe_subscription_id, stripe_subscription_item_id) values (:vtg1 /* VARCHAR */, default, default, default, :vtg2 /* VARCHAR */, default, default, default)\", BindVars: {REDACTED}\`,\n    code: 'UNKNOWN'\n  }\n}\n`,
  ]);
});

test("node ignore warning", () => {
  const err = Log.extractError([
    `2023-09-12T00:55:20.974Z`,
    `662fa6b4-dc47-4d49-a7e2-200ad7ce1537`,
    `ERROR`,
    `(node:8) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
(Use \`node --trace-deprecation ...\` to show where the warning was created)`,
  ]);
  expect(err).toBeUndefined();
});

test("node logtail", () => {
  expectError([
    `2023-09-12T00:55:20.974Z`,
    `662fa6b4-dc47-4d49-a7e2-200ad7ce1537`,
    `ERROR`,
    "{\n" +
      "  status: 500,\n" +
      `  message: "Cannot read properties of undefined (reading 'enabled')",\n` +
      "  stack: [\n" +
      `    "TypeError: Cannot read properties of undefined (reading 'enabled')",\n` +
      "    'at Object.toJSON (file:///var/task/src/handlers/http.mjs:280853:35)',\n" +
      "    'at transform (file:///var/task/src/handlers/http.mjs:280495:30)',\n" +
      "    'at Document2.$toObject (file:///var/task/src/handlers/http.mjs:91609:25)',\n" +
      "    'at Document2.toJSON (file:///var/task/src/handlers/http.mjs:91810:19)',\n" +
      "    'at clone (file:///var/task/src/handlers/http.mjs:83888:21)',\n" +
      "    'at cloneObject (file:///var/task/src/handlers/http.mjs:83960:22)',\n" +
      "    'at clone (file:///var/task/src/handlers/http.mjs:83901:20)',\n" +
      "    'at Document2.$toObject (file:///var/task/src/handlers/http.mjs:91580:17)',\n" +
      "    'at Document2.toJSON (file:///var/task/src/handlers/http.mjs:91810:19)',\n" +
      "    'at RESPONSE.stringify [as _serializer] (<anonymous>)'\n" +
      "  ]\n" +
      "} {\n" +
      "  context: {\n" +
      "    runtime: {\n" +
      "      file: '/var/task/src/handlers/http.mjs',\n" +
      "      type: 'Object',\n" +
      "      method: 'error',\n" +
      "      function: 'error',\n" +
      "      line: 280278,\n" +
      "      column: 15\n" +
      "    },\n" +
      "    system: { pid: 8, main_file: '' }\n" +
      "  },\n" +
      "  service: 'http',\n" +
      "  id: '2f78a09a'\n" +
      "}",
  ]);
});

test("node logtail", () => {
  expectError([
    `2023-09-12T00:55:20.974Z`,
    `662fa6b4-dc47-4d49-a7e2-200ad7ce1537`,
    `ERROR`,
    "{\n" +
      "  status: 500,\n" +
      `  message: "Cannot read properties of undefined (reading 'enabled')",\n` +
      "  stack: [\n" +
      `    "TypeError: Cannot read properties of undefined (reading 'enabled')",\n` +
      "    'at Object.toJSON (file:///var/task/src/handlers/http.mjs:280853:35)',\n" +
      "    'at transform (file:///var/task/src/handlers/http.mjs:280495:30)',\n" +
      "    'at Document2.$toObject (file:///var/task/src/handlers/http.mjs:91609:25)',\n" +
      "    'at Document2.toJSON (file:///var/task/src/handlers/http.mjs:91810:19)',\n" +
      "    'at clone (file:///var/task/src/handlers/http.mjs:83888:21)',\n" +
      "    'at cloneObject (file:///var/task/src/handlers/http.mjs:83960:22)',\n" +
      "    'at clone (file:///var/task/src/handlers/http.mjs:83901:20)',\n" +
      "    'at Document2.$toObject (file:///var/task/src/handlers/http.mjs:91580:17)',\n" +
      "    'at Document2.toJSON (file:///var/task/src/handlers/http.mjs:91810:19)',\n" +
      "    'at RESPONSE.stringify [as _serializer] (<anonymous>)'\n" +
      "  ]\n" +
      "} {\n" +
      "  context: {\n" +
      "    runtime: {\n" +
      "      file: '/var/task/src/handlers/http.mjs',\n" +
      "      type: 'Object',\n" +
      "      method: 'error',\n" +
      "      function: 'error',\n" +
      "      line: 280278,\n" +
      "      column: 15\n" +
      "    },\n" +
      "    system: { pid: 8, main_file: '' }\n" +
      "  },\n" +
      "  service: 'http',\n" +
      "  id: '2f78a09a'\n" +
      "}",
  ]);
});

test("node timeout", () => {
  expectError([
    `2023-09-12T00:55:20.974Z 662fa6b4-dc47-4d49-a7e2-200ad7ce1537 Task timed out after 120.12 seconds`,
  ]);
});

test("node undefined requestID", () =>
  expectError([
    `2023-09-12T00:55:20.974Z`,
    `undefined`,
    `ERROR`,
    "Error: Missing AWS Lambda trace data for X-Ray. Ensure Active Tracing is enabled and no subsegments are created outside the function handler.\n" +
      "    at Object.contextMissingLogError [as contextMissing] (file:///var/task/functions/crons/property/queue-property-updates.js:738560:23)\n" +
      "    at Segment.resolveLambdaTraceData (file:///var/task/functions/crons/property/queue-property-updates.js:739641:47)\n" +
      "    at Object.getSegment (file:///var/task/functions/crons/property/queue-property-updates.js:738604:21)\n" +
      "    at tryGetCurrentSegment (file:///var/task/functions/crons/property/queue-property-updates.js:742664:29)\n" +
      "    at Promise2.then (file:///var/task/functions/crons/property/queue-property-updates.js:742631:49)\n" +
      "    at file:///var/task/functions/crons/property/queue-property-updates.js:820938:34\n" +
      "    at step (file:///var/task/functions/crons/property/queue-property-updates.js:5739:25)\n" +
      "    at Object.next (file:///var/task/functions/crons/property/queue-property-updates.js:5686:20)\n" +
      "    at file:///var/task/functions/crons/property/queue-property-updates.js:5672:73\n" +
      "    at new Promise (<anonymous>)",
  ]));

test("node weird error", () =>
  expectError([
    "2023-09-16T12:28:24.083Z",
    "b94f5937-dab2-4665-88f4-91f5ce79e30d",
    "ERROR",
    "SupernovaException [Error]\n" +
      "    at SupernovaException.notFound (file:///var/task/src/apps/docs-server/[path+]/route.mjs:54792:12)\n" +
      "    at file:///var/task/src/apps/docs-server/[path+]/route.mjs:87051:32\n" +
      "    at async file:///var/task/src/apps/docs-server/[path+]/route.mjs:87075:14\n" +
      "    at async file:///var/task/src/apps/docs-server/[path+]/route.mjs:87162:27\n" +
      "    at async withActiveSession (file:///var/task/src/apps/docs-server/[path+]/route.mjs:86158:70)\n" +
      "    at async file:///var/task/src/apps/docs-server/[path+]/route.mjs:87148:51\n" +
      "    at async promiseWithTimeout (file:///var/task/src/apps/docs-server/[path+]/route.mjs:55030:18)\n" +
      "    at async file:///var/task/src/apps/docs-server/[path+]/route.mjs:86991:26\n" +
      "    at async Runtime.handler (file:///var/task/src/apps/docs-server/[path+]/route.mjs:86039:12) {\n" +
      "  type: 'ResourceNotFound'\n" +
      "}",
  ]));

test("node with brackets", () =>
  expectError([
    "2023-09-16T09:46:41.059Z",
    "1bd090f4-02c9-495a-8790-c1815cd5134f",
    "ERROR",
    "HttpError [BadRequestError]: Event object failed validation\n" +
      "    at createError (file:///var/task/packages/functions/user/editProfile.mjs:826205:10)\n" +
      "    at validatorMiddlewareBefore (file:///var/task/packages/functions/user/editProfile.mjs:826293:15)\n" +
      "    at async runMiddlewares (file:///var/task/packages/functions/user/editProfile.mjs:826148:17)\n" +
      "    at async runRequest (file:///var/task/packages/functions/user/editProfile.mjs:826106:5) {\n" +
      "  statusCode: 400,\n" +
      "  status: 400,\n" +
      "  expose: true,\n" +
      "  [cause]: [\n" +
      "    {\n" +
      "      instancePath: '/body/username',\n" +
      "      schemaPath: '#/properties/body/properties/username/pattern',\n" +
      "      keyword: 'pattern',\n" +
      "      params: [Object],\n" +
      `      message: 'must match pattern "^[a-zA-Z][a-zA-Z0-9_-]{2,19}$"'\n` +
      "    }\n" +
      "  ]\n" +
      "}",
  ]));

test("payload too big", () =>
  expectError([
    `[ERROR] [1698615205834] LAMBDA_RUNTIME Failed to post handler success response. Http response code: 413.`,
  ]));

test("extra fields at end of stack trace", () =>
  expectError([
    `2023-09-15T13:03:59.257Z`,
    `8179a9db-e726-451b-898f-93923b3e7bbd`,
    `ERROR`,
    `HTTPError: Response code 401 (Unauthorized)
    at Request2.<anonymous> (file:///var/task/src/foo.mjs:19386:37)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_NON_2XX_3XX_RESPONSE',
  timings: {
    start: 1701983041602,
    socket: 1701983041603,
    lookup: 1701983041603,
    connect: 1701983041605,
    secureConnect: 1701983041608,
    upload: 1701983041608,
    response: 1701983041694,
    end: 1701983041695,
    error: undefined,
    abort: undefined,
    phases: {
      wait: 1,
      dns: 0,
      tcp: 2,
      tls: 3,
      request: 0,
      firstByte: 86,
      download: 1,
      total: 93
    }
  }
}`,
  ]));
