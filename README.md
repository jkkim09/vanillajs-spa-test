# buzzni 설문조사 

## 프로젝트 설명
````
vanilla js 를 이용하여 간단한 SPA 방식으로 Model, View 분리하여 만들어 보았습니다. 해쉬값의 변경으로 로드되어있는(page) 화면을 바꾸는 형식으로 구현하였습니다. 또한 확장성을 고려하여 component 데릭토리와 각족 util 등을 분리 하였습니다.
````

## 설치
````cmd
npm install
````
webpack, webpack-server-dev, babel 등 인스톨

## 실행

````cmd
npm run dev
````
http://127.0.0.1:9000/?user_id=510&event_id=3

## 빌드
````
npm run build
````

webpack server 로 프로젝트를 실행합니다. webpack build 가 진행되어 다소 시간이 걸릴 수있습니다.

## 구조
`````
├── src
│   ├── service
│   │
│   ├── styles
│   │
│   ├── views
│   │   ├── components
│   │   │
│   │   └── pages
│   │ 
│   └── app.js
│ 
├── webpack
├── index.html
├── package.json
└── README.md
`````

index.html : 프로젝트 root init  
src: 프로젝트 source  
src/service: utils 모음  
src/styles: css 모음  
src/view: Page 모음  
src/view/page: page  
src/view/components: ui 분리할수 있는 component 지금은 사용 안함
webpack: webpack