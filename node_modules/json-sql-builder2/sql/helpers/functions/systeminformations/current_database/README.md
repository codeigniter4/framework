# currentDatabase Helper
Specifies the `current_database()` function to use with PostgreSQL.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/11/functions-info.html)

# Allowed Types and Usage

## as Boolean:

Usage of `currentDatabase` as **Boolean** with the following Syntax:

**Syntax:**

```javascript
$currentDatabase: true | false
```

**SQL-Definition:**
```javascript
current_database()
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            db: { $currentDatabase: true }
        }
    });
}

// SQL output
SELECT
    current_database() AS db

// Values
{}
```

## as Number:

Usage of `currentDatabase` as **Number** with the following Syntax:

**Syntax:**

```javascript
$currentDatabase: < Number >
```

**SQL-Definition:**
```javascript
current_database()
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            db: { $currentDatabase: 1 }
        }
    });
}

// SQL output
SELECT
    current_database() AS db

// Values
{}
```

## Further Examples

:bulb: **Usage as Function**
```javascript
function() {
    return sql.build({
        $select: {
            db: sql.currentDatabase()
        }
    });
}

// SQL output
SELECT
    current_database() AS db

// Values
{}
```

