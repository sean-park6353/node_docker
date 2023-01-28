1. 꼭 Dockerfile로 모든걸 움직여야 할까?
    1. 먼저 컨테이너를 만든다음 
        1. `docker run --name jiseong_container -it -d -p {host_port}:8080 node`
    2. 그 컨테이너에 접속한다
        1. `docker exec -it jiseong_container /bin/bash` 
    3. 현재 내 위치에 있는 데이터들을 컨테이너로 모두 복사한 다음 
        1. `docker cp {호스트경로} {컨테이너이름}:{컨테이너경로}`
        2. `docker exec -it jiseong_container` 로 들어간다음
    4. `npm install` 로 express 설치
    5. `node index.js` 로 실행

---

```jsx
// index.js

const express = require("express");
const port = "8080";
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port);
console.log(`server running on ${port}`);
```

위의 방식을 사용하는건 

1. 이미지 → 컨테이너를 만든다. (물론 -p 를 통해서 포트를 포워딩 한다.)
2. 호스트의 데이터를 `복사` 한다. (마운트가 아님)
3. 컨테이너 안에서 직접 run server를 한다. 
4. 외부에서 접속한다.

의 순서인데, 방식에는 여러가지 단점이 존재한다.

1. Dockerfile에 비해 너무 많은 명령어를 써야한다.
    1. Dockerfile로 작성을 한다면 위의 내용은
        1. 아래로 한방에 정리가 된다.
        
        ```docker
        FROM node:latest
        
        WORKDIR /bin/app
        COPY ./ /bin/app
        
        RUN apt-get update $$ apt-get -y install vim && npm install 
        CMD node index.js 
        ```
        

물론 `docker run` 은 컨테이너로 만드는 명령어이고 Dockerfile을 만들어서 build하는건 이미지를 만드는것이긴 하지만

1. 컨테이너를 만들고
2. 그 컨테이너에 접속한다음 디렉토리를 만들고
3. 호스트의 파일을 복사하고
4. 서버를 킨다.

의 작업을 도커파일에 정의하면 훨씬 간편하므로 도커파일로 이미지를 빌드해놓고 실제로 컨테이너화 할때는 포트포워딩만 하면 된다.

---