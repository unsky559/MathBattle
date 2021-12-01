# Документация для MathBattle

## Содержание

[Регистрация пользователя (/api/reg)](#Регистрация-пользователя)

[Вход в аккаунт (/api/login)](#Вход-в-аккаунт)

[Выход из аккаунта (/api/logout)](#Выход-из-аккаунта)

[Получение данных текущего пользователя (/api/account)](#Получение-данных-текущего-пользователя)

[Получение данных пользователя (/api/user/:username)](#Получение-данных-пользователя)

[Получение пресетов игр (/api/gamepresets)](#Получение-пресетов-игр)

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

Ключ `msg` - указывается сообщения о несоответствующих данных :

- `username` - "Invalid username length" либо "Invalid characters in username"
- `password` - "Invalid password length"
- `email` - "Invalid email"

Ключ `param` - указывает  на параметр в котором несоответствуют данные (`username`, `password`, `email`)

```json
[
    {
        "value": "I am John",
        "msg": "Invalid characters in username",
        "param": "username",
        "location": "body"
    },
    {
        "value": "test@test .test",
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
    }
]
```

**Ответ при ошибке БД** :

*Код* : `500`

Ключ `msg`:
- Register error
- Server didn't create account

**Ответ при ошибке совпадения данных в БД** :

*Код* : `409`

Ключ `msg`:
- This email already exists
- This username already exists

**Ответ при успешном создании пользователя** :

*Код* : `200`

Ключ `msg`:
- Account successfully created

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

**Ответ при ошибке несовпадения данных** :

*Код* : `403`

Ключ `msg` - указывается сообщения о несоответствующих данных :
- `username` - "Incorrect username or password"
- `password` - "Incorrect username or password"
- `email` - "Incorrect username or password"

```json
{
    "msg": "Incorrect username or password"
}
```

**Ответ при ошибке БД** :

*Код* : `500`

Ключ `msg`:
- Login error
- Match error

**Ответ при успешном входе в аккаунт** :

*Код* : `200`

Ключ `msg`:
- Login success

Создает сессию для пользователя, сохраняет httpOnly cookie.

## Выход из аккаунта

Реализует выход из аккаунта, удаляет сессию и httpOnly cookie.

**URL** : `/api/logout`

**Метод** : `POST`

**Требуется авторизация** : Да

**Ответ при ошибке** :

*Код* : `400`

Ключ `msg`: 
- Unable to logout


**Ответ при успешном выходе** :

*Код* : `200`

Удаляет сессию пользователя, удаляет httpOnly cookie.

## Получение данных текущего пользователя

**URL** : `/api/account`

**Метод** : `GET`

**Требуется авторизация** : Да

**Ответ при ошибке БД** :

*Код* : `500`

Ключ `msg`: 
- Find user error

**Ответ** :

*Код* : `200`

```json
{
    "stats": {
        "finished_lobbies": []
    },
    "email": "IamJohn@test.tcom",
    "username": "IamJohn",
    "date": "2021-11-19T11:52:45.079Z"
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
  "current_lobbies": {
    "ref": *lobby*
  }
```

## Получение данных пользователя

**URL** : `/api/user/:username`

**Метод** : `GET`

**Требуется авторизация** : Нет

**Ответ при ошибке БД** :

*Код* : `500`

Ключ `msg`: 
- Find user error

**Ошибка "Пользователь не найден"** :

*Код* : `403`

Ключ `msg`:
- User not found

**Ответ при успехе** :

*Код* : `200`

[Пакет аналогичен с (/api/account)](#Получение-данных-текущего-пользователя)

## Получение пресетов игр

**URL** : `/api/gamepresets`

**Метод** : `GET`

**Требуется авторизация** : Нет

**Ответ при ошибке БД** :

*Код* : `500`

Ключ `msg`: 
- Cannot find presets

**Ответ при успехе** :

*Код* : `200`

```json
[
    {
        "_id": "61a769a0495a017647c81aaf",
        "name": "fast and simply",
        "settings": {
            "win_condition": {
                "mode": "score",
                "value": 25
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
        "_id": "61a769a0495a017647c81ab3",
        "name": "medium and normally",
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
                    "difficulty": 2
                },
                {
                    "name": "subtract",
                    "difficulty": 2
                },
                {
                    "name": "multiply",
                    "difficulty": 2
                },
                {
                    "name": "division",
                    "difficulty": 2
                }
            ]
        }
    }
]
```