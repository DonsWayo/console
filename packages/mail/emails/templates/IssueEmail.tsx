import React from "react";
import {
  Img,
  Row,
  Html,
  Link,
  Body,
  Head,
  Font,
  Button,
  Column,
  Preview,
  Section,
  Container,
  Hr as JEHr,
  Text as JEText,
  HrProps as JEHrProps,
  TextProps as JETextProps,
} from "@jsx-email/all";

import type { Issue } from "../../../core/src/issue";

const LOCAL_ASSETS_URL = "/static";

const unit = 16;

const GREY_COLOR = [
  "#1A1A2E", //0
  "#2F2F41", //1
  "#444454", //2
  "#585867", //3
  "#6D6D7A", //4
  "#82828D", //5
  "#9797A0", //6
  "#ACACB3", //7
  "#C1C1C6", //8
  "#D5D5D9", //9
  "#EAEAEC", //10
  "#FFFFFF", //11
];

const BLUE_COLOR = "#395C6B";
const TEXT_COLOR = GREY_COLOR[0];
const SECONDARY_COLOR = GREY_COLOR[5];
const DIMMED_COLOR = GREY_COLOR[7];
const DIVIDER_COLOR = GREY_COLOR[10];
const BACKGROUND_COLOR = "#F0F0F1";
const SURFACE_COLOR = DIVIDER_COLOR;
const SURFACE_DIVIDER_COLOR = GREY_COLOR[9];

const body = {
  background: BACKGROUND_COLOR,
};

const container = {};

const frame = {
  padding: `${unit * 1.5}px`,
  border: `1px solid ${SURFACE_DIVIDER_COLOR}`,
  background: "#FFF",
  borderRadius: "6px",
  boxShadow: `0 1px 2px rgba(0,0,0,0.03),
              0 2px 4px rgba(0,0,0,0.03),
              0 2px 6px rgba(0,0,0,0.03)`,
};

const textColor = {
  color: TEXT_COLOR,
};

const code = {
  fontFamily: "IBM Plex Mono, monospace",
};

const headingHr = {
  margin: `${unit}px 0`,
};

const buttonPrimary = {
  ...code,
  padding: "12px 18px",
  color: "#FFF",
  borderRadius: "4px",
  background: BLUE_COLOR,
  fontSize: "12px",
  fontWeight: 500,
};

const compactText = {
  margin: "0 0 2px",
};

const issueBreadcrumb = {
  fontSize: "14px",
  color: SECONDARY_COLOR,
};

const issueWorkspaceSeparator = {
  padding: " 0 4px",
  color: DIMMED_COLOR,
};

const issueBreadcrumbSeparator = {
  color: DIVIDER_COLOR,
};

const issueHeading = {
  ...code,
  fontSize: "22px",
  fontWeight: 500,
};

const sectionLabel = {
  ...code,
  ...compactText,
  letterSpacing: "0.5px",
  fontSize: "13px",
  fontWeight: 500,
  color: DIMMED_COLOR,
};

const stacktraceContainer = {
  padding: `${unit * 0.75}px ${unit}px`,
  borderRadius: "5px",
  background: SURFACE_COLOR,
};

const stacktraceFrame = {
  ...code,
  fontSize: "13px",
  color: DIMMED_COLOR,
};
const stacktraceFrameFileImportant = {
  ...stacktraceFrame,
  color: TEXT_COLOR,
  fontWeight: 500,
};
const stacktraceFramePositionImportant = {
  ...stacktraceFrame,
  color: SECONDARY_COLOR,
  fontWeight: 500,
};
const stacktraceFrameContext = {
  ...code,
  margin: "4px 0",
  fontSize: "12px",
  color: DIMMED_COLOR,
};
const stacktraceFrameContextImportant = {
  ...stacktraceFrameContext,
  color: TEXT_COLOR,
  fontWeight: 500,
};

const footerLink = {
  fontSize: "14px",
};

function countLeadingSpaces(str: string) {
  let count = 0;
  for (let char of str) {
    if (char === " ") {
      count++;
    } else if (char === "\t") {
      count += 2;
    } else {
      break;
    }
  }
  return count;
}

function Text(props: JETextProps) {
  return <JEText {...props} style={{ ...textColor, ...props.style }} />;
}

function Hr(props: JEHrProps) {
  return (
    <JEHr
      {...props}
      style={{ borderTop: `1px solid ${DIVIDER_COLOR}`, ...props.style }}
    />
  );
}

function SurfaceHr(props: JEHrProps) {
  return (
    <JEHr
      {...props}
      style={{
        borderTop: `1px solid ${SURFACE_DIVIDER_COLOR}`,
        ...props.style,
      }}
    />
  );
}

function Fonts({ assetsUrl }: { assetsUrl: string }) {
  return (
    <>
      <Font
        fontFamily="IBM Plex Mono"
        fallbackFontFamily="monospace"
        webFont={{
          url: `${assetsUrl}/ibm-plex-mono-latin-400.woff2`,
          format: "woff2",
        }}
        fontWeight="400"
        fontStyle="normal"
      />
      <Font
        fontFamily="IBM Plex Mono"
        fallbackFontFamily="monospace"
        webFont={{
          url: `${assetsUrl}/ibm-plex-mono-latin-500.woff2`,
          format: "woff2",
        }}
        fontWeight="500"
        fontStyle="normal"
      />
      <Font
        fontFamily="IBM Plex Mono"
        fallbackFontFamily="monospace"
        webFont={{
          url: `${assetsUrl}/ibm-plex-mono-latin-700.woff2`,
          format: "woff2",
        }}
        fontWeight="700"
        fontStyle="normal"
      />
      <Font
        fontFamily="Rubik"
        fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
        webFont={{
          url: `${assetsUrl}/rubik-latin.woff2`,
          format: "woff2",
        }}
        fontWeight="400 500 600 700"
        fontStyle="normal"
      />
    </>
  );
}

function SplitString({ text, split }: { text: string; split: number }) {
  const segments: JSX.Element[] = [];
  for (let i = 0; i < text.length; i += split) {
    segments.push(
      <React.Fragment key={`${i}text`}>
        {text.slice(i, i + split)}
      </React.Fragment>
    );
    if (i + split < text.length) {
      segments.push(<wbr key={`${i}wbr`} />);
    }
  }
  return <>{segments}</>;
}

// @ts-expect-error
function FormattedCode({ text, split = 60, indent = 0 }) {
  const renderProcessedString = () => {
    let elements: JSX.Element[] = [];
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char === " ") {
        elements.push(<React.Fragment key={`${i}spc1`}>&nbsp;</React.Fragment>);
      } else if (char === "\t") {
        elements.push(
          <React.Fragment key={`${i}spc2`}>
            <>&nbsp;</>
            <>&nbsp;</>
          </React.Fragment>
        );
      } else {
        elements.push(<React.Fragment key={`${i}char`}>{char}</React.Fragment>);
      }

      count++;

      // Insert <wbr /> with given indent every x characters
      if (count === split) {
        elements.push(<wbr key={i} />);
        for (let j = 0; j < indent; j++) {
          elements.push(
            <React.Fragment key={`${j}wbrspc`}>&nbsp;</React.Fragment>
          );
        }
        count = 0;
      }
    }

    return elements;
  };

  return <>{renderProcessedString()}</>;
}

type StacktraceContext = {
  line: string;
  index: number;
};
type StacktraceFrame = {
  file?: string;
  raw?: string;
  line?: number;
  column?: number;
  important?: boolean;
  context?: StacktraceContext[];
};

function renderStacktraceFrameContext(start: number, context: string[]) {
  const minLeadingSpaces = Math.min(
    ...context.map((row) => countLeadingSpaces(row))
  );
  const maxIndexLength = Math.max(
    ...context.map((row, index) => (start + index).toString().length)
  );

  function padStringToEnd(input: string, desiredLength: number) {
    const numberOfSpaces = desiredLength - input.length;
    return input + " ".repeat(numberOfSpaces);
  }

  return (
    <>
      <Row>
        <Column>
          <SurfaceHr />
        </Column>
      </Row>
      {context.map((row, index) => (
        <Row key={index}>
          <Column>
            <span
              style={
                index === 3
                  ? stacktraceFrameContextImportant
                  : stacktraceFrameContext
              }
            >
              <FormattedCode
                split={68}
                indent={maxIndexLength + 2}
                text={`${padStringToEnd(
                  (start + index).toString(),
                  maxIndexLength
                )}  ${row.substring(minLeadingSpaces)}`}
              />
            </span>
          </Column>
        </Row>
      ))}
    </>
  );
}

interface SlackBlockKitProps {
  url: string;
  app: string;
  name: string;
  stage: string;
  message: string;
  workspace: string;
  stacktrace?: StacktraceFrame[];
}
function slackBlockKit(props: SlackBlockKitProps) {
  function stacktrace(stacktrace?: StacktraceFrame[]) {
    if (!stacktrace) {
      return "\n  No stacktrace available\n\n";
    } else {
      let stackString = "";

      for (let i = 0; i < stacktrace.length; i++) {
        const frame = stacktrace[i]!;

        stackString += frame.raw
          ? `${frame.raw}\n`
          : `${frame.file}  ${frame.line}:${frame.column}\n`;

        if (i < stacktrace.length - 1) {
          stackString += "----------\n";
        }

        if (frame.context) {
          stackString += "----------\n";
          const minLeadingSpaces = Math.min(
            ...frame.context.map((row) => countLeadingSpaces(row.line))
          );
          for (let j = 0; j < frame.context.length; j++) {
            const context = frame.context[j]!;

            stackString += `${context.index.toString()}  ${context.line.substring(
              minLeadingSpaces
            )}\n`;
          }
        }
      }

      return stackString;
    }
  }

  const template = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: props.name,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: props.message,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "View Issue",
            emoji: false,
          },
          url: props.url,
          action_id: "button-action",
        },
      },
      {
        type: "section",
        block_id: "sectionBlockOnlyPlainText",
        text: {
          type: "plain_text",
          text: "Stack Trace",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_preformatted",
            elements: [
              {
                type: "text",
                text: stacktrace(props.stacktrace),
              },
            ],
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: `${props.workspace}: ${props.app} / ${props.stage}`,
            emoji: false,
          },
        ],
      },
    ],
  };
  return JSON.stringify(template, null, 2);
}

interface IssueEmailProps {
  url: string;
  app: string;
  stage: string;
  workspace: string;
  assetsUrl: string;
  settingsUrl: string;
  issue: Issue.Info;
}
export const IssueEmail = ({
  app = "console",
  workspace = "seed",
  stage = "production",
  assetsUrl = LOCAL_ASSETS_URL,
  settingsUrl = "https://console.sst.dev/sst/console/production/settings",
  url = "https://console.sst.dev/sst/console/production/issues/pioksmvi6x2sa9zdljvn8ytw",
  issue = {
    message:
      "ThisisareallylongmessagethatshouldbetruncatedBecauseItDoesNotHaveABreakAndWillOverflow.",
    id: "pioksmvi6x2sa9zdljvn8ytw",
    count: 10,
    group: "",
    pointer: null,
    timeCreated: "2021-08-05 20:00:00",
    timeSeen: "2021-08-05 20:00:00",
    timeResolved: null,
    ignorer: null,
    resolver: null,
    timeDeleted: null,
    timeIgnored: null,
    timeUpdated: "2021-08-05 20:00:00",
    workspaceID: "",
    error: "NoSuchBucketIsAReallyLongExceptionNameThatShouldBeTruncated",
    stack: [
      {
        raw: "_Connection.execute (/Users/jayair/Desktop/Projects/console/node_modules/.pnpm/@planetscale+database@1.11.0/node_modules/@planetscale/database/dist/index.js:92:19)",
      },
      {
        raw: "  at processTicksAndRejections (node:internal/process/task_queues:96:5)",
      },
      {
        file: "node_modules/.pnpm/@smithy+smithy-client@2.1.3/node_modules/@smithy/smithy-client/dist-es/default-error-handler.js",
        line: 23,
        column: 17,
      },
      {
        file: "node_modules/.pnpm/@smithy+smithy-client@2.1.3/node_modules/@smithy/smithy-client/dist-es/operation.js",
        line: 49,
        column: 28,
      },
      {
        file: "packages/core/src/issue/index.ts",
        line: 101,
        column: 35,
        important: true,
        context: [
          "    const key = `stackMetadata/path/that/is/too/long/and/will/overflow/app.${row.app}/stage.${row.stage}/`;",
          '    console.log("listing", key, "for", bucket);',
          "    const list = await s3",
          "      .send(",
          "        new ListObjectsV2Command({",
          "          Prefix: key,",
          "          Bucket: bucket,",
        ],
      },
    ],
    errorID: "none",
    stageID: "",
  },
}: IssueEmailProps) => {
  return (
    <Html lang="en">
      <Head>
        <title>{`SST — ${issue.error}: ${issue.message}`}</title>
      </Head>
      <Fonts assetsUrl={assetsUrl} />
      <Preview>
        SST — {issue.error}: {issue.message}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={frame}>
            <Row>
              <Column>
                <Img
                  height="32"
                  alt="SST Logo"
                  src={`${assetsUrl}/sst-logo.png`}
                />
              </Column>
              <Column align="right">
                <Button style={buttonPrimary} href={url}>
                  <span style={code}>View Issue</span>
                </Button>
              </Column>
            </Row>

            <Row style={headingHr}>
              <Column>
                <Hr />
              </Column>
            </Row>

            <Section>
              <Text style={{ ...compactText, ...issueBreadcrumb }}>
                <span>{workspace}</span>
                <span style={{ ...code, ...issueWorkspaceSeparator }}>:</span>
                <span>{app}</span>
                <span style={{ ...code, ...issueBreadcrumbSeparator }}>
                  &nbsp;/&nbsp;
                </span>
                <span>{stage}</span>
              </Text>
              <Text style={{ ...issueHeading, ...compactText }}>
                <Link style={code} href={url}>
                  <SplitString text={issue.error} split={40} />
                </Link>
              </Text>
              <Text style={{ ...compactText, ...code }}>
                <SplitString text={issue.message} split={63} />
              </Text>
            </Section>

            <Section style={{ padding: `${unit * 1.5}px 0 0 0` }}>
              <Text style={sectionLabel}>STACK TRACE</Text>
            </Section>
            <Section style={stacktraceContainer}>
              {!issue.stack?.length && (
                <Row>
                  <Column>
                    <Text style={{ ...stacktraceFrame, ...compactText }}>
                      No stacktrace available
                    </Text>
                  </Column>
                </Row>
              )}
              {issue.stack &&
                issue.stack.map((frame, index) => (
                  <React.Fragment key={index}>
                    {!frame.important ? (
                      <Row>
                        <Column>
                          <span style={stacktraceFrame}>
                            <FormattedCode text={frame.raw} split={65} />
                          </span>
                        </Column>
                      </Row>
                    ) : (
                      <Row>
                        <Column>
                          <span
                            style={
                              frame.important
                                ? stacktraceFrameFileImportant
                                : stacktraceFrame
                            }
                          >
                            <SplitString text={frame.file || ""} split={65} />
                          </span>
                          &nbsp;&nbsp;
                          <span
                            style={
                              frame.important
                                ? stacktraceFramePositionImportant
                                : stacktraceFrame
                            }
                          >
                            {frame.line}
                          </span>
                          <span style={stacktraceFrame}>:</span>
                          <span
                            style={
                              frame.important
                                ? stacktraceFramePositionImportant
                                : stacktraceFrame
                            }
                          >
                            {frame.column}
                          </span>
                        </Column>
                      </Row>
                    )}
                    {index < (issue.stack?.length || 0) - 1 && (
                      <Row>
                        <Column>
                          <SurfaceHr />
                        </Column>
                      </Row>
                    )}
                    {frame.context &&
                      renderStacktraceFrameContext(frame.line!, frame.context)}
                  </React.Fragment>
                ))}
            </Section>

            <Row style={headingHr}>
              <Column>
                <Hr />
              </Column>
            </Row>

            <Row>
              <Column>
                <Link href="https://console.sst.dev" style={footerLink}>
                  Console
                </Link>
              </Column>
              <Column align="right">
                <Link href={settingsUrl} style={footerLink}>
                  Settings
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default IssueEmail;
