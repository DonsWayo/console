import {
  index,
  json,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";
import { cuid, timestamps, workspaceID } from "../util/sql";
import { Actor } from "../actor";

export const issue = mysqlTable(
  "issue",
  {
    ...workspaceID,
    ...timestamps,
    stageID: cuid("stage_id").notNull(),
    error: text("error").notNull(),
    message: text("message").notNull(),
    errorID: varchar("error_id", { length: 255 }).notNull(),
    group: varchar("group", { length: 255 }).notNull(),
    timeResolved: timestamp("time_resolved", {
      mode: "string",
    }),
    resolver: json("resolver").$type<Actor>(),
    timeIgnored: timestamp("time_ignored", {
      mode: "string",
    }),
    ignorer: json("ignorer").$type<Actor>(),
  },
  (table) => ({
    primary: primaryKey(table.workspaceID, table.stageID, table.id),
    group: unique("group").on(table.workspaceID, table.stageID, table.group),
    updated: index("updated").on(table.workspaceID, table.timeUpdated),
  })
);

export const issueSubscriber = mysqlTable(
  "issue_subscriber",
  {
    ...workspaceID,
    ...timestamps,
    stageID: cuid("stage_id").notNull(),
    logGroup: varchar("log_group", { length: 255 }).notNull(),
  },
  (table) => ({
    primary: primaryKey(table.workspaceID, table.stageID, table.id),
    logGroup: unique("logGroup").on(
      table.workspaceID,
      table.stageID,
      table.logGroup
    ),
  })
);