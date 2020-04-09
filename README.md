# NodeJS , line-notify alert WFH 
### Features
Retrive links infomation from firestore to request line-notify api 
# How to install
Use powershell or cmd and type by order, please see below.
- `git clone https://github.com/kantinanm/node-line-notify.git`
- `cd node-line-notify`
- > install package dependency in this project.
    `npm install`
- > create config.js and modify value.
  `cp config.js.default config.js` 
  > In windows use command `copy config.js.default config.js` 
  > at config.js file to modify value, 
  ```javascript
  const config = {
    accessToken: '', //LINE token 
    serviceAccountPath: './serviceAccount.json', // firestore project
    databaseURL: 'https://xxxx.firebaseio.com' //URL  firestore project
 };
- `npm run start`


# Test URL
http://localhost:3000