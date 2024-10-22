# Paging

## 학습 기대 효과

Paging을 통해 데이터를 여러 페이지로 나누어 전송하는 방법을 학습합니다.
이를 통해 한 번에 대량의 데이터를 전송하지 않고, 필요한 데이터만 적시에 조회하여 클라이언트의 사용자 경험을 개선하고, 서버 부하와 네트워크 지연을 줄일 수 있습니다.
**Cursor** 방식과 **Offset** 방식에 대한 차이를 이해할 수 있습니다.

## 사용 방법

1. **Edit Base URL** 버튼을 클릭하여 본인이 설정한 URL을 등록합니다.
2. 정상적으로 기능이 동작하는지 확인합니다.
3. 에러가 발생하면 **Network 탭**을 통해 디버깅을 진행합니다.

## 구현 예시 - Paging

Paging을 통해 **Request Query Parameter**의 개념을 이해하고, 대규모 데이터를 효율적으로 처리하는 방법을 학습합니다.
**Cursor 방식**과 **Offset 방식**을 이해하고 활용하여 데이터를 페이지 단위로 나누고, 이를 통해 응답 속도를 개선하는 경험을 할 수 있습니다.

### Offset 방식

### GET {{domain}}/articles/paging/offset?size=10&page=0

이 엔드포인트는 **offset** 방식을 사용하여 Article 목록을 조회합니다.

```json
//response 예시
{
  "currentPageNumber": 1,
  "size": 10,
  "totalPage": 5,
  "hasNext": true,
  "hasPrevious": false,
  "articles": [
    {
      "id": 4,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 5,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 12,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 124,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 521,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 4123,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 472,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 411,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 412,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 413,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    }
  ]
}
```

데이터는 위와 같은 응답 형식을 기반으로 가상의 데이터를 생성하여 사용할 수 있습니다.

### Cursor 방식

### GET {{domain}}/articles/paging/cursor?size=10&cursorId=36

이 엔드포인트는 cursor 방식을 사용하여 Article 목록을 조회합니다.

```json
//response 예시
{
  "lastId": 37,
  "size": 10,
  "hasNext": true,
  "articles": [
    {
      "id": 4,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 5,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 12,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 124,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 521,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 4123,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 472,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 411,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 412,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    },
    {
      "id": 37,
      "title": "et porro tempora",
      "createdAt": "Sat Oct 19 2024 21:54:50 GMT+0900"
    }
  ]
}
```

데이터는 위와 같은 응답 형식을 기반으로 가상의 데이터를 생성하여 사용할 수 있습니다.

### 에러 처리

400 에러: 요청이 정상적으로 처리되지 않았을 때 발생합니다.

```json
{
  "message": "요청이 정상적으로 처리되지 않았습니다."
}
```

### 데이터추가

버튼을 클릭하면 프로젝트에서 사용할 수 있도록 100개의 Articles데이터를 전송합니다.

### POST {{domain}}/articles/make

```json
// request 예시
{
  "articles" : [
    {
      "id": 1,
      "title": "sunt aut facere repellat ",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 2,
      "title": "qui est esse",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 4,
      "title": "eum et est occaecati",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 5,
      "title": "nesciunt quas odio",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 6,
      "title": "dolorem eum magni eos aperiam quia",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 7,
      "title": "magnam facilis autem",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    ...
    {
      "id": 92,
      "title": "ratione ex tenetur perferendis",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 93,
      "title": "beatae soluta recusandae",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 94,
      "title": "qui qui voluptates illo iste minima",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 95,
      "title": "id minus libero illum nam ad officiis",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 96,
      "title": "quaerat velit veniam",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 97,
      "title": "quas fugiat ut perspiciatis vero provident",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 98,
      "title": "laboriosam dolor voluptates",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 99,
      "title": "temporibus sit alias ",
      "createdAt": "2024-10-19T15:20:41.332Z"
    },
    {
      "id": 100,
      "title": "at nam consequatur ea labore ea harum",
      "createdAt": "2024-10-19T15:20:41.332Z"
    }
  ]
}
```
