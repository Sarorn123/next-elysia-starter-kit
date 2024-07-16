import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core'

import * as schema from './schema'

/**
 * Filters out any relation definitions from your schema
 */
type SchemaTableNames = {
    [TableOrRelationName in keyof typeof schema]: (typeof schema)[TableOrRelationName] extends SQLiteTableWithColumns<any>
    ? TableOrRelationName
    : never
}[keyof typeof schema]

type DBSelectTypeMap = {
    [TableName in SchemaTableNames]: InferSelectModel<(typeof schema)[TableName]>
}
/**
 * Get the SELECT type for a table given it's export name in the drizzle schema.
 */
export type TableType<TableName extends keyof DBSelectTypeMap> =
    DBSelectTypeMap[TableName]

type DBInsertTypeMap = {
    [TableName in SchemaTableNames]: InferInsertModel<(typeof schema)[TableName]>
}
/**
 * Get the INSERT type for a table given it's export name in the drizzle schema.
 */
export type DocInsert<TableName extends keyof DBInsertTypeMap> =
    DBInsertTypeMap[TableName]