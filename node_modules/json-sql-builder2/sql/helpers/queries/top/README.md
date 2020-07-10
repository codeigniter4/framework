# top Helper
Specifies the `TOP` clause for the `SELECT` Statement.

#### Supported by
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql)

# Allowed Types and Usage

## as Number:

Usage of `top` as **Number** with the following Syntax:

**Syntax:**

```javascript
$top: < Number >
```

**SQL-Definition:**
```javascript
TOP(<value-param>)
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $top: 10,
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    TOP($1) *
FROM
    people

// Values
{
    "$1": 10
}
```

## as Object:

Usage of `top` as **Object** with the following Syntax:

**Syntax:**

```javascript
$top: { ... }
```

**SQL-Definition:**
```javascript
TOP(<$value>){ PERCENT[$percent]}
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[value](./private/value/)|:heavy_check_mark:|*private*||
[percent](./private/percent/)|*optional*|*private*| PERCENT [$percent]|

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            $top: { $value: 5, $percent: true },
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    TOP($1) PERCENT *
FROM
    people

// Values
{
    "$1": 5
}
```

## Further Examples

:bulb: **Usage with variable and $percent: false**
```javascript
function() {
    let query = sql.build({
        $select: {
            $top: { $value: '~~@mytop10', $percent: false },
            $from: 'people'
        }
    });

    return query;
}

// SQL output
SELECT
    TOP(@mytop10) *
FROM
    people

// Values
{}
```

