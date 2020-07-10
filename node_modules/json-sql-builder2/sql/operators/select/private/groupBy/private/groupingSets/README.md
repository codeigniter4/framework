# groupingSets Helper
Specifies the `GROUPING SETS` option for the `GROUP BY` clause.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/devel/static/queries-table-expressions.html#QUERIES-GROUPING-SETS)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14223/aggreg.htm#i1007434)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `groupingSets` as **Object** is restricted to childs have the following Type:

- Number
- Array
- Object

## as Object :arrow_right: Number:

The Usage of `groupingSets` as **Object** with a child of Type **Number** is restricted to the following values:

- 1

## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$groupingSets: {
    "<identifier | $Helper | $operator>": 1 [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            state: 1,
            city: 1,
            sales_manager: 1,
            total_sales: sql.sum('sales'),

            $from: 'sales_pipline',
            $groupBy: {
                myGroupSet: {
                    $groupingSets: {
                        state: 1,
                        city: 1,
                        sales_manager: 1
                    }
                }
            }
        }
    });

    return query;
}

// SQL output
SELECT
    state,
    city,
    sales_manager,
    SUM(sales) AS total_sales
FROM
    sales_pipline
GROUP BY
    GROUPING SETS (state, city, sales_manager)

// Values
{}
```
## as Object :arrow_right: Array:

Usage of `groupingSets` as **Object** with a child of Type **Array** :

**Syntax:**

```javascript
$groupingSets: {
    "<identifier | $Helper | $operator>": [ ... ] [, ... ]
}
```

**SQL-Definition:**
```javascript
(<value-ident>[ , ... ])
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            state: 1,
            city: 1,
            sales_manager: 1,
            total_sales: sql.sum('sales'),

            $from: 'sales_pipline',
            $groupBy: {
                myGroupSet: {
                    $groupingSets: {
                        state: 1,
                        grp1: ['state', 'city'],
                        grp2: ['state', 'city', 'sales_manager']
                    }
                }
            }
        }
    });

    return query;
}

// SQL output
SELECT
    state,
    city,
    sales_manager,
    SUM(sales) AS total_sales
FROM
    sales_pipline
GROUP BY
    GROUPING SETS (
        state,
        (state, city),
        (state, city, sales_manager)
    )

// Values
{}
```
## as Object :arrow_right: Object:

Usage of `groupingSets` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$groupingSets: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
(<key-ident>[ , ... ])
```

:bulb: **Example:**
```javascript
function() {
    let query = sql.build({
        $select: {
            state: 1,
            city: 1,
            sales_manager: 1,
            total_sales: sql.sum('sales'),

            $from: 'sales_pipline',
            $groupBy: {
                myGroupSet: {
                    $groupingSets: {
                        state: 1,
                        grp1: {
                            state: 1,
                            city: 1
                        },
                        grp2: {
                            state: 1,
                            city: 1,
                            sales_manager: 1
                        }
                    }
                }
            }
        }
    });

    return query;
}

// SQL output
SELECT
    state,
    city,
    sales_manager,
    SUM(sales) AS total_sales
FROM
    sales_pipline
GROUP BY
    GROUPING SETS (
        state,
        (state, city),
        (state, city, sales_manager)
    )

// Values
{}
```
