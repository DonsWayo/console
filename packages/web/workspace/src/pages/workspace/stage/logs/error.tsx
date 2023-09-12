import { Invocation } from "$/data/log";
import { utility, theme, Text, SpanSpacer } from "$/ui";
import { IconChevronDown, IconChevronRight } from "$/ui/icons";
import { StackFrame } from "@console/core/log";
import { styled } from "@macaron-css/solid";
import { For, Show, createMemo, createSignal } from "solid-js";

export const ErrorList = styled("div", {
  base: {
    ...utility.stack(0),
    paddingBottom: theme.space[2],
    borderRadius: theme.borderRadius,
    backgroundColor: theme.color.background.surface,
  },
});

const Title = styled("div", {
  base: {
    borderTop: `1px solid ${theme.color.divider.surface}`,
    padding: `${theme.space[3]} ${theme.space[5]} ${theme.space[2.5]}`,
    ":first-child": {
      borderTop: "none",
    },
  },
});

const Frame = styled("div", {
  base: {
    ...utility.stack(0),
    flex: "1 1 auto",
    borderTop: `1px solid ${theme.color.divider.surface}`,
    ":first-child": {
      borderTop: "none",
    },
  },
});

const FrameExpand = styled("div", {
  base: {
    flexShrink: 0,
    opacity: theme.iconOpacity,
    color: theme.color.text.primary.surface,
    position: "relative",
    top: 2,
  },
});

const FrameInfo = styled("div", {
  base: {
    ...utility.row(2),
    alignItems: "center",
    padding: `0 ${theme.space[5]}`,
  },
  variants: {
    dimmed: {
      true: {
        opacity: 0.4,
      },
      false: {},
    },
  },
  defaultVariants: {
    dimmed: false,
  },
});

const FrameTitle = styled("div", {
  base: {
    padding: `${theme.space[1]} 0`,
    lineHeight: theme.font.lineHeight,
    ":hover": {
      fontWeight: `500 !important`,
    },
  },
});

const FrameContext = styled("div", {
  base: {
    padding: `${theme.space[1]} ${theme.space[5]}`,
    borderTop: `1px solid ${theme.color.divider.surface}`,
    ":first-child": {
      borderTop: "none",
    },
  },
});

const FrameContextRow = styled("div", {
  base: {
    ...utility.row(0),
    alignItems: "flex-start",
    padding: `${theme.space[0.5]} 0`,
  },
});

const FrameContextNumber = styled("div", {
  base: {
    flex: "0 0 auto",
    minWidth: 32,
  },
});

export function ErrorItem(props: { error: Invocation["errors"][number] }) {
  const [expand, setExpand] = createSignal(
    Math.max(
      props.error.stack.findIndex((frame) => frame.important),
      0
    )
  );
  return (
    <>
      <Title>
        <Text
          code
          weight="medium"
          size="mono_base"
          on="surface"
          color="danger"
          leading="loose"
        >
          {props.error.type}: {props.error.message}
        </Text>
      </Title>
      <StackTrace stack={props.error.stack} />
    </>
  );
}

export function StackTrace(props: { stack: StackFrame[] }) {
  const [expand, setExpand] = createSignal(
    Math.max(
      props.stack.findIndex((frame) => frame.important),
      0
    )
  );
  return (
    <For each={props.stack}>
      {(frame, index) => {
        const expanded = createMemo(() => expand() === index());
        return (
          // If raw, remove empty lines
          <Show
            when={
              frame.raw === undefined ||
              (frame.raw !== undefined && frame.raw.trim() !== "")
            }
          >
            <Frame>
              <FrameInfo
                dimmed={!frame.important && Boolean(frame.file)}
                onClick={() => {
                  if (!frame.context) return;
                  setExpand(index());
                }}
              >
                <FrameExpand>
                  <Show when={frame.context}>
                    <Show
                      when={expand() === index()}
                      fallback={<IconChevronRight width="12" height="12" />}
                    >
                      <IconChevronDown width="12" height="12" />
                    </Show>
                  </Show>
                </FrameExpand>
                <FrameTitle>
                  <Show when={frame.raw}>
                    <Text
                      pre
                      code
                      on="surface"
                      leading="loose"
                      color="primary"
                      size="mono_sm"
                    >
                      {frame.raw}
                    </Text>
                  </Show>
                  <Show when={!frame.raw}>
                    <Show when={frame.fn}>
                      <Text
                        code
                        on="surface"
                        size="mono_sm"
                        color="primary"
                        leading="normal"
                        weight={expand() === index() ? "semibold" : undefined}
                      >
                        {frame.fn!}
                      </Text>
                      <SpanSpacer space="3" />
                    </Show>
                    <Text
                      code
                      on="surface"
                      size="mono_sm"
                      color="primary"
                      leading="normal"
                      weight={
                        frame.fn
                          ? expand() === index()
                            ? "medium"
                            : undefined
                          : expand() === index()
                          ? "semibold"
                          : undefined
                      }
                    >
                      {frame.file!}
                    </Text>
                    <SpanSpacer space="2" />
                    <Text
                      code
                      leading="normal"
                      on="surface"
                      color="secondary"
                      size="mono_sm"
                    >
                      {frame.line!}
                      <Text
                        code
                        leading="normal"
                        on="surface"
                        color="dimmed"
                        size="mono_sm"
                      >
                        :
                      </Text>
                      {frame.column!}
                    </Text>
                  </Show>
                </FrameTitle>
              </FrameInfo>
              <Show when={frame.context && expanded()}>
                <FrameContext>
                  <For each={frame.context}>
                    {(line, index) => (
                      <FrameContextRow>
                        <FrameContextNumber>
                          <Text
                            code
                            on="surface"
                            disableSelect
                            size="mono_sm"
                            leading="loose"
                            color={index() === 3 ? "primary" : "dimmed"}
                            weight={index() === 3 ? "semibold" : "regular"}
                          >
                            {index() + frame.line! - 3}
                          </Text>
                        </FrameContextNumber>
                        <Text
                          pre
                          code
                          on="surface"
                          size="mono_sm"
                          leading="loose"
                          weight={index() === 3 ? "medium" : "regular"}
                          color={index() === 3 ? "primary" : "secondary"}
                        >
                          {line}
                        </Text>
                      </FrameContextRow>
                    )}
                  </For>
                </FrameContext>
              </Show>
            </Frame>
          </Show>
        );
      }}
    </For>
  );
}
