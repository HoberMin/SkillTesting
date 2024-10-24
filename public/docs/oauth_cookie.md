# OAuth (RefreshToken - Cookie & AccessToken - Cookie)

## 학습 기대 효과

이 기능은 사용자가 OAuth 프로세스와 토큰 기반의 인증 방식을 학습할 수 있도록 설계되었습니다.

OAuth 인증 흐름을 통해 사용자가 인증 과정을 이해하고, Access Token과 Refresh Token을 사용한 인증 및 재발급 과정을 학습하며, 토큰 인증 방식을 학습할 수 있습니다.

- **Access Token**: API 요청 시 권한을 부여하는 토큰
- **Refresh Token**: Access Token이 만료되었을 때 새로 발급받기 위한 토큰

## 사용방법

1. Authorization Code를 발급받아 토큰을 교환합니다.
2. AccessToken을 사용해 유저 정보와 관련된 API 요청을 수행합니다.
3. AccessToken을 RefreshToken으로 재발급하는 요청을 할 수 있습니다.
4. 로그아웃을 통해 서버에서 Refresh Token을 무효화할 수 있습니다.

## 주의 사항

이 사이트에서 `쿠키`를 사용하는 경우, https 통신에서만 가능하기 때문에 배포 Url을 통해서만 통신할 수 있습니다.

또한 다음 설정을 해야합니다.

**[쿠키 설정]**

- httponly
- samesite: none
- secure: true

**[CORS 설정]**

- Access-Control-Allow-Origin: `https://ssafysandbox.vercel.app`
- Access-Control-Allow-Credentials: `true`

## POST /oauth/cookie/auth

**KAKAO Auth Code**를 통해 Access Token과 Refresh Token을 발급받습니다.

### [Request Body]

`code: string` (KAKAO Auth Code)

### [Response Header]

`refreshToken`: `쿠키`에 저장한다.
`accessToken`: `쿠키`에 저장한다.
(주의사항 참고!)

### [Response Body]

- Success

`200 ok`

- Failure (400 Bad Request) - 인가 코드가 누락된 경우

```json
{
  "status": 400,
  "code": "ERR_MISSING_AUTHORIZATION_CODE"
}
```

## GET /oauth/cookie/member

발급된 Access Token을 사용해 사용자 닉네임 정보를 조회합니다.

### [Request Header]

`accessToken - 쿠키`
`refreshToken - 쿠키`

### [Response body]

- Success

```json
{
  "nickName": "메롱"
}
```

- Failure (401 Unauthorized) - Access Token이 만료된 경우

```json
{
  "status": 401,
  "code": "ERR_ACCESS_TOKEN_EXPIRED"
}
```

- Failure (404 Not Found) - 토큰에 해당하는 사용자를 찾을 수 없는 경우

```json
{
  "status": 404,
  "code": "ERR_NOT_FOUND_MEMBER"
}
```

## GET /oauth/cookie/reissue

유저 정보 요청(/member)을 보냈을 때 서버로 부터 401 응답이 내려오면 클라이언트는 reissue 요청을 통해 토큰을 재발급받습니다.

이는 만료된 Access Token을 재발급 받는 것으로, Refresh Token을 통해 진행됩니다.

### [Request header]

`refreshToken - 쿠키`

### [Response body]

- Success

  `200 ok`

accessToken는 쿠키로 저장한다.

```json
{
  "accessToken": "new_access_token_value"
}
```

- Failure (401 Unauthorized) - Refresh Token이 만료된 경우

```json
{
  "status": 401,
  "code": "ERR_REFRESH_TOKEN_EXPIRED"
}
```

## POST /oauth/cookie/logout

로그아웃 처리 시 Refresh Token을 서버에서 무효화합니다.

쿠키를 만료 처리하고 브라우저에 심어, 브라우저에 있는 쿠키를 사라지게 하는 방식으로 진행됩니다.

### [Request header]

`refreshToken - 쿠키`

### [Response header]

`refreshToken - 쿠키` (만료 처리한 쿠키)

### [Response body]

- Success

`200 OK`

- Failure (401 Unauthorized) - `Refresh Token이 만료된 경우`

```json
{
  "status": 401,
  "code": "ERR_REFRESH_TOKEN_EXPIRED"
}
```

- Failure (403 Forbidden) - `이미 로그아웃된 경우`

```json
{
  "status": 403,
  "code": "ERR_ALREADY_LOGGED_OUT"
}
```
