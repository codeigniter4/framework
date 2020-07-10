# references Helper
Specifies the `REFERENCES` clause for a `FOREIGN KEY` Constraint.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/constraints.html)
- [MariaDB](https://mariadb.com/kb/en/library/constraint/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [SQLite](https://sqlite.org/lang_createtable.html#constraints)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `references` as **Object** with the following Syntax:

**Syntax:**

```javascript
$references: { ... }
```

**SQL-Definition:**
```javascript

REFERENCES <$table> (<$columns>)
  { MATCH [$match]}-->(MySQL,PostgreSQL)
  { ON DELETE [$onDelete]}
  { ON UPDATE [$onUpdate]}
  { NOT FOR REPLICATION[$notForReplication]}-->(SQLServer)
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[table](./private/table/)|:heavy_check_mark:|*private*||
[columns](../../../../helpers/ddl/columns/)|:heavy_check_mark:|:heavy_check_mark:||
[match](./private/match/)|*optional*|*private*| MATCH  [$match]|`MySQL` `PostgreSQL` 
[onDelete](./private/onDelete/)|*optional*|*private*| ON DELETE  [$onDelete]|
[onUpdate](./private/onUpdate/)|*optional*|*private*| ON UPDATE  [$onUpdate]|
[notForReplication](./private/notForReplication/)|*optional*|*private*| NOT FOR REPLICATION [$notForReplication]|`SQLServer` 

:bulb: **Example:**
```javascript
function() {
    return sql.$createTable({
        $table: 'people_hobbies',
        $define: {
            people_id: { $column: { $type: sql.INTEGER } },
            hobby: { $column: { $type: sql.VARCHAR, $size: 255 } },

            uk_people_hobbies: { $constraint: { $unique: { $columns: ['people_id', 'hobby'] } } },

            fk_people: {
                $constraint: {
                    $foreignKey: {
                        $columns: 'people_id',
                        $references: {
                            $table: 'people',
                            $columns: 'people_id',
                            $onDelete: sql.CASCADE,
                            $onUpdate: sql.RESTRICT
                        }
                    }
                }
            }
        }
    });
}

// SQL output
CREATE TABLE people_hobbies (
    people_id INTEGER,
    hobby VARCHAR(255),
    CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby),
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE RESTRICT
)

// Values
{}
```

## Further Examples

:bulb: **Usage as Function**
```javascript
function() {
    return sql.$createTable({
        $table: 'people_hobbies',
        $define: {
            people_id: { $column: { $type: sql.INTEGER } },
            hobby: { $column: { $type: sql.VARCHAR, $size: 255 } },

            uk_people_hobbies: { $constraint: { $unique: { $columns: ['people_id', 'hobby'] } } },

            fk_people: {
                $constraint: sql.foreignKey('people_id', {
                    $table: 'people',
                    $columns: 'people_id',
                    $onDelete: sql.CASCADE,
                    $onUpdate: sql.RESTRICT
                })
            }
        }
    });
}

// SQL output
CREATE TABLE people_hobbies (
    people_id INTEGER,
    hobby VARCHAR(255),
    CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby),
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE RESTRICT
)

// Values
{}
```

:bulb: **Usage of NOT FOR REPLICATION**
```javascript
function() {
    return sql.$createTable({
        $table: 'people_hobbies',
        $define: {
            people_id: { $column: { $type: sql.INTEGER } },
            hobby: { $column: { $type: sql.VARCHAR, $size: 255 } },

            uk_people_hobbies: { $constraint: { $unique: { $columns: ['people_id', 'hobby'] } } },

            fk_people: {
                $constraint: sql.foreignKey('people_id', {
                    $table: 'people',
                    $columns: 'people_id',
                    $onDelete: sql.CASCADE,
                    $onUpdate: sql.RESTRICT,
                    $notForReplication: true
                })
            }
        }
    });
}

// SQL output
CREATE TABLE people_hobbies (
    people_id INTEGER,
    hobby VARCHAR(255),
    CONSTRAINT uk_people_hobbies UNIQUE (people_id, hobby),
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE RESTRICT NOT FOR REPLICATION
)

// Values
{}
```

