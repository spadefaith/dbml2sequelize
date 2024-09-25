import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Accounts, AccountsId } from './Accounts';
import type { Events, EventsId } from './Events';

export interface WorkflowsAttributes {
  id: number;
  event_id?: number;
  requestor_account_id?: number;
  staff_id?: number;
  created_dt: Date;
  modified_dt: Date;
}

export type WorkflowsPk = "id";
export type WorkflowsId = Workflows[WorkflowsPk];
export type WorkflowsOptionalAttributes = "id" | "event_id" | "requestor_account_id" | "staff_id";
export type WorkflowsCreationAttributes = Optional<WorkflowsAttributes, WorkflowsOptionalAttributes>;

export class Workflows extends Model<WorkflowsAttributes, WorkflowsCreationAttributes> implements WorkflowsAttributes {
  id!: number;
  event_id?: number;
  requestor_account_id?: number;
  staff_id?: number;
  created_dt!: Date;
  modified_dt!: Date;

  // Workflows belongsTo Accounts via requestor_account_id
  requestor_account!: Accounts;
  getRequestor_account!: Sequelize.BelongsToGetAssociationMixin<Accounts>;
  setRequestor_account!: Sequelize.BelongsToSetAssociationMixin<Accounts, AccountsId>;
  createRequestor_account!: Sequelize.BelongsToCreateAssociationMixin<Accounts>;
  // Workflows belongsTo Accounts via staff_id
  staff!: Accounts;
  getStaff!: Sequelize.BelongsToGetAssociationMixin<Accounts>;
  setStaff!: Sequelize.BelongsToSetAssociationMixin<Accounts, AccountsId>;
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<Accounts>;
  // Workflows belongsTo Events via event_id
  event!: Events;
  getEvent!: Sequelize.BelongsToGetAssociationMixin<Events>;
  setEvent!: Sequelize.BelongsToSetAssociationMixin<Events, EventsId>;
  createEvent!: Sequelize.BelongsToCreateAssociationMixin<Events>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Workflows {
    return Workflows.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    requestor_account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'workflows',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "workflows_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
