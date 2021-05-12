## Local setup
- Prerequisite
    - Make sure Redis server is intalled on your machine
    - sequelize-cli packages is installed 

- Git Clone
  - git clone https://github.com/shahzadthathal/backend-server-vpn.git

- Database config
    - Update database credentials in  /config/config.json

- Install dependencies
  - cd backend-server-vpn
  - npm install
  - Run migration: npx sequelize-cli db:migrate
  - Run seeder: npx sequelize-cli db:seed:all

- Run
  - node server

- Info
  - API Url: http://localhost:5000/api/
  - Events emits to this client: http://localhost:5000/
  - Events are defined in config/socket.config.js
  - JWT config is defined in auth.config.js
  - Database schema describe image is under docs dir
  - forever-monitoer installed to avoid stop application in case of crash, I used try catch block but we must needs this kind of package to keep app running in case of someting bad happened.
  - Node cluster module also configured for high scalability and perfomance.

- API Endpoints
  - Register user : ```/api/users/register```  , POST parameters: ```full_name, email, password```
  - Login user: ```/api/users/login```, POST params: ```email, password```, it will return a auth token(JWT token) which you can use for later create tower and other secure routes usign POSTMAN Authorizaion Bearer token or x-access-token in headers 

- Run Test: 
  - BlackBox Testing, to make sure api endpoints are working.
    you should see output: xx passing (xxms)
  - npm test