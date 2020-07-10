# using Helper
Specifies the `USING` clause for the `CREATE INDEX` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-index.html)
- [MariaDB](https://mariadb.com/kb/en/library/create-index/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-createindex.html)

# Allowed Types and Usage

## as String:

The usage of `using` as **String** is restricted to the following values:
- BTREE
- HASH
- GIST
- SPGIST
- GIN
- BRIN

#### as String with value **BTREE**:
**Syntax:**

```javascript
$using: 'BTREE'
```

**SQL-Definition:**
```javascript
BTREE
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $using: sql.BTREE // or $using: 'BTREE'
    });
}

// SQL output
CREATE UNIQUE INDEX ON people USING BTREE (first_name ASC, last_name ASC)

// Values
{}
```
#### as String with value **HASH**:
**Syntax:**

```javascript
$using: 'HASH'
```

**SQL-Definition:**
```javascript
HASH
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $using: sql.HASH // or $using: 'HASH'
    });
}

// SQL output
CREATE UNIQUE INDEX ON people USING HASH (first_name ASC, last_name ASC)

// Values
{}
```
#### as String with value **GIST**:
**Syntax:**

```javascript
$using: 'GIST'
```

**SQL-Definition:**
```javascript
GIST
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $using: sql.GIST // or $using: 'GIST'
    });
}

// SQL output
CREATE UNIQUE INDEX ON people USING GIST (first_name ASC, last_name ASC)

// Values
{}
```
#### as String with value **SPGIST**:
**Syntax:**

```javascript
$using: 'SPGIST'
```

**SQL-Definition:**
```javascript
SPGIST
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $using: sql.SPGIST // or $using: 'SPGIST'
    });
}

// SQL output
CREATE UNIQUE INDEX ON people USING SPGIST (first_name ASC, last_name ASC)

// Values
{}
```
#### as String with value **GIN**:
**Syntax:**

```javascript
$using: 'GIN'
```

**SQL-Definition:**
```javascript
GIN
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $using: sql.GIN // or $using: 'GIN'
    });
}

// SQL output
CREATE UNIQUE INDEX ON people USING GIN (first_name ASC, last_name ASC)

// Values
{}
```
#### as String with value **BRIN**:
**Syntax:**

```javascript
$using: 'BRIN'
```

**SQL-Definition:**
```javascript
BRIN
```

:bulb: **Example:**
```javascript
function() {
    return sql.$createIndex({
        $unique: true,
        $table: 'people',
        $columns: {
            first_name: true,
            last_name: true
        },
        $using: sql.BRIN // or $using: 'BRIN'
    });
}

// SQL output
CREATE UNIQUE INDEX ON people USING BRIN (first_name ASC, last_name ASC)

// Values
{}
```
