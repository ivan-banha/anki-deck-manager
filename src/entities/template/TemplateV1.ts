import { Database } from 'sql.js';

import { Template } from './Template.js';

/**
 * Implementation Notes:
 * New APKG:
 *    - Templates are stored in "templates" table.
 *    - There is only HTML.
 *    - The CSS styles are stored in "notetypes" table, "config" field.
 *    - "templates"."ntid" == "notetypes"."id".
 *    - The template name is in "notetypes"."name".
 *
 * Old APKG:
 *    - Templates are stored in "col" tables, "models" field.
 */
export class TemplateV1 extends Template {
  constructor(db: Database) {
    super(db);
  }

  public getId() {
    throw new Error('Not implemented');
  }
}
