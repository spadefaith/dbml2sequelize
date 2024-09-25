import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { JournalEntryGroups, JournalEntryGroupsId } from './JournalEntryGroups';

export interface AllocationsAttributes {
  id: number;
  journal_group_id?: number;
  start_date?: string;
  end_date?: string;
  created_dt?: Date;
  modified_dt?: Date;
}

export type AllocationsPk = "id";
export type AllocationsId = Allocations[AllocationsPk];
export type AllocationsOptionalAttributes = "id" | "journal_group_id" | "start_date" | "end_date" | "created_dt" | "modified_dt";
export type AllocationsCreationAttributes = Optional<AllocationsAttributes, AllocationsOptionalAttributes>;

export class Allocations extends Model<AllocationsAttributes, AllocationsCreationAttributes> implements AllocationsAttributes {
  id!: number;
  journal_group_id?: number;
  start_date?: string;
  end_date?: string;
  created_dt?: Date;
  modified_dt?: Date;

  // Allocations belongsTo JournalEntryGroups via journal_group_id
  journal_group!: JournalEntryGroups;
  getJournal_group!: Sequelize.BelongsToGetAssociationMixin<JournalEntryGroups>;
  setJournal_group!: Sequelize.BelongsToSetAssociationMixin<JournalEntryGroups, JournalEntryGroupsId>;
  createJournal_group!: Sequelize.BelongsToCreateAssociationMixin<JournalEntryGroups>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Allocations {
    return Allocations.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    journal_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Link to the journal entry group",
      references: {
        model: 'journal_entry_groups',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    end_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    modified_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'allocations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "allocations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "allocations_start_date",
        fields: [
          { name: "start_date" },
        ]
      },
      {
        name: "allocations_start_date_end_date",
        unique: true,
        fields: [
          { name: "start_date" },
          { name: "end_date" },
        ]
      },
      {
        name: "end_date_index",
        unique: true,
        fields: [
          { name: "end_date" },
        ]
      },
    ]
  });
  }
}
