import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Allocations, AllocationsId } from './Allocations';

export interface JournalEntryGroupsAttributes {
  id: number;
  narration?: string;
  description?: string;
  created_dt: Date;
  modified_dt: Date;
}

export type JournalEntryGroupsPk = "id";
export type JournalEntryGroupsId = JournalEntryGroups[JournalEntryGroupsPk];
export type JournalEntryGroupsOptionalAttributes = "narration" | "description";
export type JournalEntryGroupsCreationAttributes = Optional<JournalEntryGroupsAttributes, JournalEntryGroupsOptionalAttributes>;

export class JournalEntryGroups extends Model<JournalEntryGroupsAttributes, JournalEntryGroupsCreationAttributes> implements JournalEntryGroupsAttributes {
  id!: number;
  narration?: string;
  description?: string;
  created_dt!: Date;
  modified_dt!: Date;

  // JournalEntryGroups hasMany Allocations via journal_group_id
  allocations!: Allocations[];
  getAllocations!: Sequelize.HasManyGetAssociationsMixin<Allocations>;
  setAllocations!: Sequelize.HasManySetAssociationsMixin<Allocations, AllocationsId>;
  addAllocation!: Sequelize.HasManyAddAssociationMixin<Allocations, AllocationsId>;
  addAllocations!: Sequelize.HasManyAddAssociationsMixin<Allocations, AllocationsId>;
  createAllocation!: Sequelize.HasManyCreateAssociationMixin<Allocations>;
  removeAllocation!: Sequelize.HasManyRemoveAssociationMixin<Allocations, AllocationsId>;
  removeAllocations!: Sequelize.HasManyRemoveAssociationsMixin<Allocations, AllocationsId>;
  hasAllocation!: Sequelize.HasManyHasAssociationMixin<Allocations, AllocationsId>;
  hasAllocations!: Sequelize.HasManyHasAssociationsMixin<Allocations, AllocationsId>;
  countAllocations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof JournalEntryGroups {
    return JournalEntryGroups.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    narration: {
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
    tableName: 'journal_entry_groups',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "journal_entry_groups_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
