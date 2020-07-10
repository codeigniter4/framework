# currentSchema Helper
Specifies the `current_schema` function to use with PostgreSQL.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/11/functions-info.html)

# Allowed Types and Usage

## as Boolean:

Usage of `currentSchema` as **Boolean** with the following Syntax:

**Syntax:**

```javascript
$currentSchema: true | false
```

**SQL-Definition:**
```javascript
current_schema
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            schema: { $currentSchema: true }
        }
    });
}

// SQL output
SELECT
    current_schema AS schema

// Values
{}
```

## as Number:

Usage of `currentSchema` as **Number** with the following Syntax:

**Syntax:**

```javascript
$currentSchema: < Number >
```

**SQL-Definition:**
```javascript
current_schema
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            schema: { $currentSchema: 1 }
        }
    });
}

// SQL output
SELECT
    current_schema AS schema

// Values
{}
```

## Further Examples

:bulb: **Usage as Function**
```javascript
function() {
    return sql.build({
        $select: {
            schema: sql.currentSchema()
        }
    });
}

// SQL output
SELECT
    current_schema AS schema

// Values
{}
```

