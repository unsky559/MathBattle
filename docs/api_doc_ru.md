# Документация для MathBattle

## Содержание

[Регистрация пользователя (/api/reg)](#Регистрация-пользователя)

[Вход в аккаунт (/api/login)](#Вход-в-аккаунт)

[Выход из аккаунта (/api/logout)](#Выход-из-аккаунта)

[Получение данных текущего пользователя (/api/account)](#Получение-данных-текущего-пользователя)

[Получение данных пользователя (/api/user/:username)](#Получение-данных-пользователя)

[Получение пресетов игр (/api/gamepresets)](#Получение-пресетов-игр)

[Изменение пароля пользователя (/api/changepassword)](#Изменение-пароля-пользователя)

## Регистрация пользователя

Создается учетнуя запись пользователя, указывая уникальное именя и уникальную почту, и пароле.

**URL** : `/api/reg`

**Метод** : `POST`

**Требуется авторизация** : Нет

**Аргументы и требования к ним** :

`username` - имя пользователя может состоять из латинский букв, цифр, и символов нижнего подчеркивания и дефиса. Минимальное количество символов - 4, максимальное - 16.

`email` - почта пользователя.

`password` - Может состоять из любых символов. Минимальное количество символов - 8, максимальное - 32.

**Пример отправляемого пакета** :

```json
{
    "username": "IamBogdan",
    "email": "test@test.torg",
    "password": "12345678qwe"
}
```

**Ответ при ошибке несоответствия данных** :

*Код* : `400`

*Пример ответа* :
```json
{
  "status": "fail",
  "code": 400,
  "data": [
    {
      "param": "username",
      "message": "Invalid username length"
    },
    {
      "param": "username",
      "message": "Invalid characters in username"
    },
    {
      "param": "password",
      "message": "Invalid password length"
    },
    {
      "param": "email",
      "message": "Invalid email"
    }
  ]
}
```

**Ответ при ошибке БД** :

*Код* : `500`

*Пример ответа* :
```json
{
  "status": "error",
  "code": 500,
  "message": "Internal server error."
}
```

**Ответ при ошибке совпадения данных в БД** :

*Код* : `409`

*Пример ответа* :
```json
{
  "status": "fail",
  "code": 409,
  "data": {
    "param": "username",
    "message": "This username already exists."
  }
}
```

**Ответ при успешном создании пользователя** :

*Код* : `200`

*Пример ответа* :
```json
{
  "status": "success",
  "code": 200,
  "data": null
}
```

## Вход в аккаунт

Реализует вход в аккаунт, создает сессию для пользователя, сохраняет httpOnly cookie.

**URL** : `/api/login`

**Метод** : `POST`

**Требуется авторизация** : Нет

**Аргументы и требования к ним** :

Пакет должен содержать `username` либо `email` и `password` пользователя. 

**Пример отправляемого пакета** :

```json
{
    "username": "IamBogdan",
    "password": "12345678qwe"
}
```

**Ответ если пользователь уже авторизован** :

*Код* : `409`

```json
{
  "status": "fail",
  "code": 409,
  "data": null
}
```

**Ответ при ошибке несовпадения данных** :

*Код* : `403`

```json
{
  "status": "fail",
  "code": 403,
  "data": [
    {
      "param": "username",
      "message": "Incorrect username"
    },
    {
      "param": "password",
      "message": "Incorrect password"
    }
  ]
}
```

**Ответ при ошибке БД** :

*Код* : `500`

*Пример ответа* :
```json
{
  "status": "error",
  "code": 500,
  "message": "Internal server error."
}
```

**Ответ при успешном входе в аккаунт** :

*Код* : `200`

*Пример ответа* :
```json
{
  "status": "success",
  "code": 200,
  "data": null
}
```

Создает сессию для пользователя, сохраняет httpOnly cookie.

## Выход из аккаунта

Реализует выход из аккаунта, удаляет сессию и httpOnly cookie.

**URL** : `/api/logout`

**Метод** : `POST`

**Требуется авторизация** : Да

**Ответ если пользователь не авторизован** :

*Код* : `401`

*Пример ответа* :
```json
{
  "status": "fail",
  "code": 401,
  "data": null
}
```

**Ответ при ошибке** :

*Код* : `500`

*Пример ответа* :
```json
{
  "status": "error",
  "code": 500,
  "message": "Internal server error."
}
```

**Ответ при успешном выходе** :

*Код* : `200`

*Пример ответа* :
```json
{
  "status": "success",
  "code": 200,
  "data": null
}
```

Удаляет сессию пользователя, удаляет httpOnly cookie.

## Получение данных текущего пользователя

**URL** : `/api/account`

**Метод** : `GET`

**Требуется авторизация** : Да

**Ответ если пользователь не авторизован** :

*Код* : `401`

*Пример ответа* :
```json
{
  "status": "fail",
  "code": 401,
  "data": null
}
```

**Ответ при ошибке БД** :

*Код* : `500`

*Пример ответа* :
```json
{
  "status": "error",
  "code": 500,
  "message": "Internal server error."
}
```

**Ответ** :

*Код* : `200`

*Пример ответа* :
```json
{
  "status": "success",
  "code": 200,
  "data": {
    "stats": {
      "rating": 1000,
      "finished_lobbies": []
    },
    "email": "IamJohn@test.tcom",
    "username": "IamJohn",
    "date_reg": "2022-02-23T16:59:34.227Z"
  }
}
```

Возможные данные в пакете:
```js
  "email": String,
  "username": String,
  "userpic": String,
  "date": Date, //(registration date)
  "stats": {
    "rating": Number,
    "winrate": Number,
    "time_spend": Number,
    "finished_lobbies": [{
    "date_create": Date,
    "date_end": Date,
    "setting": {
      "is_rating": Boolean,
      "is_sync": Boolean,
      "max_players": Number,
      "win_condition": {
        "mode": String, //("time" or "score")
        "value": Number,
        },
        "modes": [{
            "name": String,
            "difficulty": Number
        }]
    },
    "avg_rating": Number,
    "result": {
      "is_win": Boolean,
      "rating_changed": Number
    }
  }]
},
  "last_online": Date,
```

## Получение данных пользователя

**URL** : `/api/user/:username`

**Метод** : `GET`

**Требуется авторизация** : Нет

**Ответ при ошибке БД** :

*Код* : `500`

*Пример ответа* :
```json
{
  "status": "error",
  "code": 500,
  "message": "Internal server error."
}
```

**Ошибка "Пользователь не найден"** :

*Код* : `404`

*Пример ответа* :
```json
{
  "status": "fail",
  "code": 404,
  "data": null
}
```

**Ответ при успехе** :

*Код* : `200`

[Пакет аналогичен с (/api/account)](#Получение-данных-текущего-пользователя)

## Получение пресетов игр

**URL** : `/api/gamepresets`

**Метод** : `GET`

**Требуется авторизация** : Нет

**Ответ при ошибке БД** :

*Код* : `500`

*Пример ответа* :
```json
{
  "status": "error",
  "code": 500,
  "message": "Internal server error."
}
```

**Ответ при успехе** :

*Код* : `200`

```json
{
  "status": "success",
  "code": 200,
  "data": [
    {
      "_id": "621656682327287f3b6a5bdc",
      "name": "medium and simply",
      "settings": {
        "win_condition": {
          "mode": "score",
          "value": 50
        },
        "is_rating": true,
        "is_sync": true,
        "max_players": 2,
        "modes": [
          {
            "name": "add",
            "difficulty": 1
          },
          {
            "name": "subtract",
            "difficulty": 1
          },
          {
            "name": "multiply",
            "difficulty": 1
          },
          {
            "name": "division",
            "difficulty": 1
          }
        ]
      }
    },
    {
      "_id": "621656682327287f3b6a5bd9",
      "name": "fast and simply3",
      "settings": {
        "win_condition": {
          "mode": "score",
          "value": 5
        },
        "is_rating": true,
        "is_sync": true,
        "max_players": 3,
        "modes": [
          {
            "name": "add",
            "difficulty": 1
          },
          {
            "name": "subtract",
            "difficulty": 1
          },
          {
            "name": "multiply",
            "difficulty": 1
          },
          {
            "name": "division",
            "difficulty": 1
          }
        ]
      }
    },
  ]
}
```

## Изменение пароля пользователя

**URL** : `/api/changepassword`

**Метод** : `POST`

**Требуется авторизация** : Да

**Аргументы и требования к ним** :

`current_password` - текущий пароль пользователя.

`new_password` - Может состоять из любых символов. Минимальное количество символов - 8, максимальное - 32.

**Ответ при ошибке несоответствия данных** :

*Код* : `400`

```json
{
  "status": "fail",
  "code": 400,
  "data": [
    {
      "param": "current_password",
      "message": "Invalid current password length"
    },
    {
      "param": "new_password",
      "message": "Invalid new password length"
    }
  ]
}
```

**Ответ при ошибке совпадения нового пароля со старым** :

*Код* : `409`

```json
{
  "status": "fail",
  "code": 409,
  "data": {
    "param": "new_password",
    "message": "New password must be different from previous password."
  }
}
```

**Ответ при ошибке ввода неправильного пароля** :

*Код* : `409`

```json
{
  "status": "fail",
  "code": 409,
  "data": {
    "param": "current_password",
    "message": "Incorrect current password."
  }
}
```

**Ответ при успехе** :

*Код* : `200`

{
  "status": "success",
  "code": 200,
  "data": null
}