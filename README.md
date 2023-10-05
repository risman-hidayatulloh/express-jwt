Steps to run this project:

1. Create database in postgres with name: `test`
2. cd express-jwt
3. Run `npx sequelize-cli db:migrate` command
4. Run `npm install` command
5. Run `npm run dev` command

Steps to run this postman:

1. http://localhost:3003/register
   {
   "name" : "test",
   "email" : "test@gmail.com",
   "password" : "123456"
   }
2. http://localhost:3003/login
   {
   "email" : "test@gmail.com",
   "password" : "123456"
   }

- result
  {
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6InRlc3QzIiwiZW1haWwiOiJ0ZXN0M0BnbWFpbC5jb20iLCJpYXQiOjE2OTY0NzE3Nzd9.kBfyCnCviUdIotMKVlYLm2cc_zW97AplHA3YTBx48hk"
  }

3. http://localhost:3003/me

- Type: API Key
- key: token
- value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6InRlc3QzIiwiZW1haWwiOiJ0ZXN0M0BnbWFpbC5jb20iLCJpYXQiOjE2OTY0NzE3Nzd9.kBfyCnCviUdIotMKVlYLm2cc_zW97AplHA3YTBx48hk
- Add to: Header
