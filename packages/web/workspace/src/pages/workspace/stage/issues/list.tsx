import { styled } from "@macaron-css/solid";
import { Stack } from "$/ui/layout";
import { IconCheck, IconNoSymbol } from "$/ui/icons";
import { utility, Alert, Text, Button, ButtonGroup } from "$/ui";
import { formatNumber, formatSinceTime, parseTime } from "$/common/format";
import { Link } from "@solidjs/router";
import { theme } from "$/ui/theme";
import type { Issue } from "@console/core/issue";
import { For, Show, createEffect } from "solid-js";
import { useIssuesContext } from "../context";

const COL_COUNT_WIDTH = 80;
const COL_TIME_WIDTH = 200;

const Content = styled("div", {
  base: {
    padding: theme.space[4],
  },
});

const IssuesHeader = styled("div", {
  base: {
    ...utility.row(4),
    height: 54,
    alignItems: "center",
    padding: theme.space[4],
    border: `1px solid ${theme.color.divider.base}`,
    backgroundColor: theme.color.background.surface,
    borderRadius: `${theme.borderRadius} ${theme.borderRadius} 0 0`,
  },
});

const IssueCol = styled("div", {
  base: {
    minWidth: 0,
  },
  variants: {
    grow: {
      true: {
        flex: "1 1 auto",
      },
      false: {
        flex: "0 0 auto",
      },
    },
    align: {
      left: {
        textAlign: "left",
        justifyContent: "flex-start",
      },
      right: {
        textAlign: "right",
        justifyContent: "flex-end",
      },
    },
  },
  defaultVariants: {
    grow: false,
    align: "left",
  },
});

const IssuesHeaderCol = styled(IssueCol, {
  base: {
    ...utility.row(3.5),
    alignItems: "center",
  },
});

const IssueActions = styled(ButtonGroup, {
  base: {},
  variants: {
    active: {
      true: {},
      false: {
        opacity: 0.6,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

const ButtonIcon = styled("span", {
  base: {
    width: 12,
    height: 12,
    marginRight: 6,
    verticalAlign: -2,
    display: "inline-block",
    opacity: theme.iconOpacity,
  },
});

const IssuesList = styled("div", {
  base: {
    borderRadius: `0 0 ${theme.borderRadius} ${theme.borderRadius}`,
    borderStyle: "solid",
    borderWidth: "0 1px 1px 1px",
    borderColor: theme.color.divider.base,
  },
});

const EmptyIssuesSign = styled("div", {
  base: {
    ...utility.stack(0),
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.space[32]} ${theme.space[4]}`,
  },
});

export function List() {
  const issues = useIssuesContext();
  createEffect(() => {
    console.log(issues());
  });
  return (
    <Content>
      <Stack space="4">
        <Alert level="info">
          There was a problem enabling Issues for your account.{" "}
          <a href="htts://sst.dev/discord">Contact us on Discord.</a>
        </Alert>
        <div>
          <IssuesHeader>
            <IssuesHeaderCol>
              <input type="checkbox" />
            </IssuesHeaderCol>
            <IssuesHeaderCol grow>
              <Text
                code
                uppercase
                on="surface"
                size="mono_sm"
                weight="medium"
                color="dimmed"
              >
                Error
              </Text>
              <IssueActions>
                <Button size="sm" grouped="left" color="secondary">
                  <ButtonIcon>
                    <IconNoSymbol />
                  </ButtonIcon>
                  Ignore
                </Button>
                <Button size="sm" grouped="right" color="secondary">
                  <ButtonIcon>
                    <IconCheck />
                  </ButtonIcon>
                  Resolve
                </Button>
              </IssueActions>
            </IssuesHeaderCol>
            <IssuesHeaderCol
              align="right"
              style={{ width: `${COL_COUNT_WIDTH}px` }}
              title="Number of events in the last 24 hours"
            >
              <Text
                code
                uppercase
                on="surface"
                size="mono_sm"
                weight="medium"
                color="dimmed"
              >
                Last day
              </Text>
            </IssuesHeaderCol>
            <IssuesHeaderCol
              align="right"
              style={{ width: `${COL_TIME_WIDTH}px` }}
              title="Last and first occurrence of the error"
            >
              <Text
                code
                uppercase
                on="surface"
                size="mono_sm"
                weight="medium"
                color="dimmed"
              >
                Time
              </Text>
            </IssuesHeaderCol>
          </IssuesHeader>
          <IssuesList>
            <Show
              when={issues().length !== 0}
              fallback={
                <EmptyIssuesSign>
                  <Text size="lg" color="dimmed">
                    No issues found
                  </Text>
                </EmptyIssuesSign>
              }
            >
              <For each={issues()}>
                {(issue) => (
                  <IssueRow
                    issue={issue}
                    unread
                    handler="/packages/functions/src/events/log-poller-status.handler"
                  />
                )}
              </For>
            </Show>
          </IssuesList>
        </div>
      </Stack>
    </Content>
  );
}

const IssueRoot = styled("div", {
  base: {
    ...utility.row(4),
    padding: theme.space[4],
    borderTop: `1px solid ${theme.color.divider.base}`,
    alignItems: "center",
    ":first-child": {
      borderTop: 0,
    },
  },
});

const IssueError = styled(Link, {
  base: {
    overflow: "hidden",
    lineHeight: "normal",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  variants: {
    weight: {
      regular: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      semibold: {
        fontWeight: 600,
      },
    },
  },
  defaultVariants: {
    weight: "regular",
  },
});

type IssueProps = {
  issue: Issue.Info;
  handler: string;
  unread: boolean;
};

function IssueRow(props: IssueProps) {
  return (
    <IssueRoot>
      <IssueCol>
        <input type="checkbox" />
      </IssueCol>
      <IssueCol grow>
        <Stack space="2">
          <IssueError
            href={props.issue.id}
            weight={props.unread ? "medium" : "regular"}
          >
            {props.issue.error}
          </IssueError>
          <Stack space="1">
            <Text line size="sm" leading="normal">
              {props.issue.message}
            </Text>

            <Text code line leading="normal" size="mono_sm" color="dimmed">
              {props.handler}
            </Text>
          </Stack>
        </Stack>
      </IssueCol>
      <IssueCol align="right" style={{ width: `${COL_COUNT_WIDTH}px` }}>
        <Text code size="mono_base" title={props.issue.count?.toString()}>
          {formatNumber(props.issue.count || 1, true)}
        </Text>
      </IssueCol>
      <IssueCol align="right" style={{ width: `${COL_TIME_WIDTH}px` }}>
        <Text line leading="normal" size="sm" color="dimmed">
          <span title={parseTime(props.issue.timeUpdated).toLocaleString()}>
            {formatSinceTime(props.issue.timeUpdated)}
          </span>{" "}
          &mdash;{" "}
          <span title={parseTime(props.issue.timeCreated).toLocaleString()}>
            {formatSinceTime(props.issue.timeCreated)}
          </span>
        </Text>
      </IssueCol>
    </IssueRoot>
  );
}