import type { Sequelize } from "sequelize";
import { Accounts as _Accounts } from "./Accounts";
import type { AccountsAttributes, AccountsCreationAttributes } from "./Accounts";
import { Allocations as _Allocations } from "./Allocations";
import type { AllocationsAttributes, AllocationsCreationAttributes } from "./Allocations";
import { Events as _Events } from "./Events";
import type { EventsAttributes, EventsCreationAttributes } from "./Events";
import { JournalEntryGroups as _JournalEntryGroups } from "./JournalEntryGroups";
import type { JournalEntryGroupsAttributes, JournalEntryGroupsCreationAttributes } from "./JournalEntryGroups";
import { Workflows as _Workflows } from "./Workflows";
import type { WorkflowsAttributes, WorkflowsCreationAttributes } from "./Workflows";

export {
  _Accounts as Accounts,
  _Allocations as Allocations,
  _Events as Events,
  _JournalEntryGroups as JournalEntryGroups,
  _Workflows as Workflows,
};

export type {
  AccountsAttributes,
  AccountsCreationAttributes,
  AllocationsAttributes,
  AllocationsCreationAttributes,
  EventsAttributes,
  EventsCreationAttributes,
  JournalEntryGroupsAttributes,
  JournalEntryGroupsCreationAttributes,
  WorkflowsAttributes,
  WorkflowsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Accounts = _Accounts.initModel(sequelize);
  const Allocations = _Allocations.initModel(sequelize);
  const Events = _Events.initModel(sequelize);
  const JournalEntryGroups = _JournalEntryGroups.initModel(sequelize);
  const Workflows = _Workflows.initModel(sequelize);

  Workflows.belongsTo(Accounts, { as: "requestor_account", foreignKey: "requestor_account_id"});
  Accounts.hasMany(Workflows, { as: "workflows", foreignKey: "requestor_account_id"});
  Workflows.belongsTo(Accounts, { as: "staff", foreignKey: "staff_id"});
  Accounts.hasMany(Workflows, { as: "staff_workflows", foreignKey: "staff_id"});
  Workflows.belongsTo(Events, { as: "event", foreignKey: "event_id"});
  Events.hasMany(Workflows, { as: "workflows", foreignKey: "event_id"});
  Allocations.belongsTo(JournalEntryGroups, { as: "journal_group", foreignKey: "journal_group_id"});
  JournalEntryGroups.hasMany(Allocations, { as: "allocations", foreignKey: "journal_group_id"});

  return {
    Accounts: Accounts,
    Allocations: Allocations,
    Events: Events,
    JournalEntryGroups: JournalEntryGroups,
    Workflows: Workflows,
  };
}
