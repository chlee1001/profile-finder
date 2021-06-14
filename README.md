# Profile-Finder

[Gachon University](https://www.gachon.ac.kr/main.jsp) Graduation Work 3 - 2021   
[Go to wiki page](https://github.com/rheeeuro/profile-finder/wiki)


<a href="https://profile-finder0.herokuapp.com/">
<img src="https://user-images.githubusercontent.com/47638660/115105818-35b98f80-9f9c-11eb-9a2a-68f629c54549.png" width="700px">    
</a>   


https://profile-finder0.herokuapp.com/


Profile-finder is an actor employment service that provides direct connection between the video producer and the actor using [deep learning](https://en.wikipedia.org/wiki/Deep_learning) profile photo analysis. Users can easily filtering profiles using keywords. Our core system is Deep learning keyword filtering using [Google Teachablemachine](https://teachablemachine.withgoogle.com/). This will reduce the time it takes for many video producers to review and filter profiles.

## Presentation

[<img src="https://user-images.githubusercontent.com/47638660/121841882-36f80600-cd1a-11eb-8f3b-9e997481b50b.png" width="50%">](https://youtu.be/rwmUBARqEDY)

## Build
- build in Window
```
npm run buildWindow
```
- build in Linux/MacOS
```
npm run build
```
- npm scripts
```
  "scripts": {
    "dev:server": "nodemon --exec babel-node src/init.js --delay 2 --ignore '.scss' --ignore 'static' --ignore 'files'",
    "dev:assets": "cd src && cross-env WEBPACK_ENV=development webpack -w",
    "build:assets": "cd src && WEBPACK_ENV=production webpack",
    "build:server": "babel src --out-dir build --ignore 'src/assets','src/static','src/tm','src/webpack.config.js'",
    "copyAll": "shx cp -r src/static build/static && shx cp -r src/views build/views && shx cp -r src/tm build/tm",
    "build": "npm run build:server && npm run build:assets && npm run copyAll",
    "buildWindow": "npm run build:server && npm run build:assets && npm run copyAll",
    "prebuildWindow": "rd /s /q build",
    "heroku-prebuild": "rm -rf build",
    "start": "PRODUCTION=true node build/init.js",
    "prestart": "npm run build"
  }
```

## Test site
<a href="https://keyword-test.netlify.app/">
<kbd><img src="https://user-images.githubusercontent.com/47638660/117346280-827cf000-aee2-11eb-99aa-409e73dda5d7.png" width="700px"></kbd>
</a>

- Keyword Test: https://keyword-test.netlify.app/
- Github: https://github.com/rheeeuro/keyword-test
- Use [face-api](https://justadudewhohacks.github.io/face-api.js/docs/index.html) to detect face
