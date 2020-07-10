# currentUser Helper
Specifies the `current_user` function to use with PostgreSQL.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/11/functions-info.html)

# Allowed Types and Usage

## as Boolean:

Usage of `currentUser` as **Boolean** with the following Syntax:

**Syntax:**

```javascript
$currentUser: true | false
```

**SQL-Definition:**
```javascript
current_user
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            username: { $currentUser: true }
        }
    });
}

// SQL output
SELECT
    current_user AS username

// Values
{}
```

## as Number:

Usage of `currentUser` as **Number** with the following Syntax:

**Syntax:**

```javascript
$currentUser: < Number >
```

**SQL-Definition:**
```javascript
current_user
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            username: { $currentUser: 1 }
        }
    });
}

// SQL output
SELECT
    current_user AS username

// Values
{}
```

## Further Examples

:bulb: **Usage as Function**
```javascript
function() {
    return sql.build({
        $select: {
            username: sql.currentUser()
        }
    });
}

// SQL output
SELECT
    current_user AS username

// Values
{}
```

