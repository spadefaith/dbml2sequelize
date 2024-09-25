import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Workflows, WorkflowsId } from './Workflows';

export interface EventsAttributes {
  id: number;
  name?: string;
  state?: string;
  description?: string;
  created_dt: Date;
  modified_dt: Date;
}

export type EventsPk = "id";
export type EventsId = Events[EventsPk];
export type EventsOptionalAttributes = "name" | "state" | "description";
export type EventsCreationAttributes = Optional<EventsAttributes, EventsOptionalAttributes>;

export class Events extends Model<EventsAttributes, EventsCreationAttributes> implements EventsAttributes {
  id!: number;
  name?: string;
  state?: string;
  description?: string;
  created_dt!: Date;
  modified_dt!: Date;

  // Events hasMany Workflows via event_id
  workflows!: Workflows[];
  getWorkflows!: Sequelize.HasManyGetAssociationsMixin<Workflows>;
  setWorkflows!: Sequelize.HasManySetAssociationsMixin<Workflows, WorkflowsId>;
  addWorkflow!: Sequelize.HasManyAddAssociationMixin<Workflows, WorkflowsId>;
  addWorkflows!: Sequelize.HasManyAddAssociationsMixin<Workflows, WorkflowsId>;
  createWorkflow!: Sequelize.HasManyCreateAssociationMixin<Workflows>;
  removeWorkflow!: Sequelize.HasManyRemoveAssociationMixin<Workflows, WorkflowsId>;
  removeWorkflows!: Sequelize.HasManyRemoveAssociationsMixin<Workflows, WorkflowsId>;
  hasWorkflow!: Sequelize.HasManyHasAssociationMixin<Workflows, WorkflowsId>;
  hasWorkflows!: Sequelize.HasManyHasAssociationsMixin<Workflows, WorkflowsId>;
  countWorkflows!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Events {
    return Events.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'events',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "events_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
