import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Workflows, WorkflowsId } from './Workflows';

export interface AccountsAttributes {
  id: number;
  username?: string;
  password?: string;
  created_dt: Date;
  modified_dt: Date;
}

export type AccountsPk = "id";
export type AccountsId = Accounts[AccountsPk];
export type AccountsOptionalAttributes = "id" | "username" | "password";
export type AccountsCreationAttributes = Optional<AccountsAttributes, AccountsOptionalAttributes>;

export class Accounts extends Model<AccountsAttributes, AccountsCreationAttributes> implements AccountsAttributes {
  id!: number;
  username?: string;
  password?: string;
  created_dt!: Date;
  modified_dt!: Date;

  // Accounts hasMany Workflows via requestor_account_id
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
  // Accounts hasMany Workflows via staff_id
  staff_workflows!: Workflows[];
  getStaff_workflows!: Sequelize.HasManyGetAssociationsMixin<Workflows>;
  setStaff_workflows!: Sequelize.HasManySetAssociationsMixin<Workflows, WorkflowsId>;
  addStaff_workflow!: Sequelize.HasManyAddAssociationMixin<Workflows, WorkflowsId>;
  addStaff_workflows!: Sequelize.HasManyAddAssociationsMixin<Workflows, WorkflowsId>;
  createStaff_workflow!: Sequelize.HasManyCreateAssociationMixin<Workflows>;
  removeStaff_workflow!: Sequelize.HasManyRemoveAssociationMixin<Workflows, WorkflowsId>;
  removeStaff_workflows!: Sequelize.HasManyRemoveAssociationsMixin<Workflows, WorkflowsId>;
  hasStaff_workflow!: Sequelize.HasManyHasAssociationMixin<Workflows, WorkflowsId>;
  hasStaff_workflows!: Sequelize.HasManyHasAssociationsMixin<Workflows, WorkflowsId>;
  countStaff_workflows!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Accounts {
    return Accounts.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
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
    tableName: 'accounts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "accounts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
