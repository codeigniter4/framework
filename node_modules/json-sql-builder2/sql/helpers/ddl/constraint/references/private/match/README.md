# match Helper
Specifies the `MATCH` Parameter for the `ON DELETE | UPDATE` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)

# Allowed Types and Usage

## as String:

The usage of `match` as **String** is restricted to the following values:
- MATCH_FULL
- MATCH_PARTIAL
- MATCH_SIMPLE

#### as String with value **MATCH_FULL**:
**Syntax:**

```javascript
$match: 'MATCH_FULL'
```

**SQL-Definition:**
```javascript
FULL
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
                            $onDelete: sql.CASCADE,
                            $onUpdate: sql.RESTRICT,
                            $match: sql.MATCH_FULL
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) MATCH FULL ON DELETE CASCADE ON UPDATE RESTRICT
)

// Values
{}
```
#### as String with value **MATCH_PARTIAL**:
**Syntax:**

```javascript
$match: 'MATCH_PARTIAL'
```

**SQL-Definition:**
```javascript
PARTIAL
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
                            $onDelete: sql.CASCADE,
                            $onUpdate: sql.RESTRICT,
                            $match: sql.MATCH_PARTIAL
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) MATCH PARTIAL ON DELETE CASCADE ON UPDATE RESTRICT
)

// Values
{}
```
#### as String with value **MATCH_SIMPLE**:
**Syntax:**

```javascript
$match: 'MATCH_SIMPLE'
```

**SQL-Definition:**
```javascript
SIMPLE
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
                            $onDelete: sql.CASCADE,
                            $onUpdate: sql.RESTRICT,
                            $match: sql.MATCH_SIMPLE
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
    CONSTRAINT fk_people FOREIGN KEY (people_id) REFERENCES people (people_id) MATCH SIMPLE ON DELETE CASCADE ON UPDATE RESTRICT
)

// Values
{}
```
