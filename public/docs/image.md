# Image Uploader

### 학습 기대 효과

이 기능은 개발자가 multipart/form-data를 처리하는 과정을 경험하고,
JSON 이외의 HTTP 통신 형태를 이해할 수 있도록 돕습니다.
이를 통해 이미지 처리 방법을 학습할 수 있습니다.

### 진행 단계

1. Edit Base URL을 클릭하여 본인이 설정한 서버의 URL을 등록합니다.
2. 화면에서 기능이 정상적으로 동작하는지 확인합니다.
3. 이미지를 업로드하고, 업로드한 이미지가 정상적으로 로딩되는지 확인합니다.
4. multipart/form-data로 이미지를 전달받고 처리하는 방법을 익힙니다.
5. 에러가 발생할 경우 브라우저 개발자 도구의 Network 탭을 사용하여 디버깅을 진행합니다.

### 구현 예시 - ImageUploader

### POST {{domain}}/image

이 엔드포인트는 이미지를 **Upload** 하는 데 사용됩니다.
사용자는 해당 이미지를 URL로 변환하여 response에 담아서 응답합니다.

```json
// Header
"Content-Type" : multipart/form-data

// Form Data
"image" : "ssafy.png"

// Response
{
  "imageUrl": "https://example.com/path-to-uploaded-image.jpg"
}
```

### 에러 처리

400 에러: 요청이 정상적으로 처리되지 않았을 때 발생합니다.

```json
{
  "message": "요청이 정상적으로 처리되지 않았습니다."
}
```
