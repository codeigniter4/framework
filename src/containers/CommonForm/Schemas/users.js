export const UsersJSONSchema = {
  "title": "User Details",
  "description": "",
  "type": "object",
  "required": ['firstname',
  'lastname', 'username', 'password'
  ],
  "properties": {
    "firstname": {
      "type": "string",
      "title": "First Name",
      "default": ""
    },
    "lastname": {
      "type": "string",
      "title": "Last Name",
      "default": ""
    },
    "username": {
      "type": "string",
      "title": "User Name",
      "default": ""
    },
    "password": {
      "type": "string",
      "title": "Password",
      "default": ""
    },
    "email": {
      "type": "string",
      "title": "Email",
      "default": ""
    },
    "role": {
      "title": "Role",
      "type": "string",
      "enum": [
        "admin",
        "user"
      ],
      "enumNames": [
        "Admin",
        "User"
      ],
      "default": "admin"
    },
    "company": {
      "type": "string",
      "title": "Company",
      "default": ""
    }
  }
}

export const formData = {};

export const UsersUISchema = {
  "password": {
    "ui:widget": "password"
  }
}
