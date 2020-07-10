# onUpdate Helper
Specifies the `Action` Parameter for the `ON UPDATE` clause.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/constraints.html)
- [MariaDB](https://mariadb.com/kb/en/library/constraint/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [SQLite](https://sqlite.org/lang_createtable.html#constraints)
- [Oracle](https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)

# Allowed Types and Usage

## as String:

The usage of `onUpdate` as **String** is restricted to the following values:
- NO ACTION
- SET DEFAULT
- SET NULL
- RESTRICT
- CASCADE

#### as String with value **NO ACTION**:
**Syntax:**

```javascript
$onUpdate: 'NO ACTION'
```

**SQL-Definition:**
```javascript
NO ACTION
```

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
                            $onDelete: 'NO ACTION',
                            $onUpdate: sql.NO_ACTION
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE NO ACTION ON UPDATE NO ACTION
)

// Values
{}
```
#### as String with value **SET DEFAULT**:
**Syntax:**

```javascript
$onUpdate: 'SET DEFAULT'
```

**SQL-Definition:**
```javascript
SET DEFAULT
```

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
                            $onDelete: 'SET DEFAULT',
                            $onUpdate: sql.SET_DEFAULT
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE
    SET
        DEFAULT ON UPDATE
    SET
        DEFAULT
)

// Values
{}
```
#### as String with value **SET NULL**:
**Syntax:**

```javascript
$onUpdate: 'SET NULL'
```

**SQL-Definition:**
```javascript
SET NULL
```

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
                            $onDelete: 'SET NULL',
                            $onUpdate: sql.SET_NULL
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE
    SET
        NULL ON UPDATE
    SET
        NULL
)

// Values
{}
```
#### as String with value **RESTRICT**:
**Syntax:**

```javascript
$onUpdate: 'RESTRICT'
```

**SQL-Definition:**
```javascript
RESTRICT
```

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
                            $onDelete: 'RESTRICT',
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE RESTRICT ON UPDATE RESTRICT
)

// Values
{}
```
#### as String with value **CASCADE**:
**Syntax:**

```javascript
$onUpdate: 'CASCADE'
```

**SQL-Definition:**
```javascript
CASCADE
```

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
                            $onDelete: 'CASCADE',
                            $onUpdate: sql.CASCADE
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) ON DELETE CASCADE ON UPDATE CASCADE
)

// Values
{}
```
