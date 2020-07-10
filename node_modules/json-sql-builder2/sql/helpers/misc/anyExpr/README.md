# anyExpr Helper
Specifies a Helper that builds `any` given object-expression

#### Supported by
- MySQL
- MariaDB
- PostgreSQL
- SQLite
- Oracle
- SQLServer

# Allowed Types and Usage

## as Object:

Usage of `anyExpr` as **Object** with the following Syntax:

**Syntax:**

```javascript
$anyExpr: { ... }
```

**SQL-Definition:**
```javascript
<value>[  ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            city: 1,
            total_salary_by_city: sql.sum('salary'),
            $from: 'people',
            $groupBy: 'city',
            $having: {
                $and: [
                    { $anyExpr: { $sum: 'salary', $gt: 450000 } },
                    { $anyExpr: { $sum: 'salary', $lt: 990000 } }
                ]
            }
        }
    });
}

// SQL output
SELECT
    city,
    SUM(salary) AS total_salary_by_city
FROM
    people
GROUP BY
    city
HAVING
    SUM(salary) > $1
    AND SUM(salary) < $2

// Values
{
    "$1": 450000,
    "$2": 990000
}
```

