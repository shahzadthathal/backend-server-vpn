## Local setup
- Prerequisite
    - sequelize-cli packages is installed 

- Git Clone
  - git clone https://github.com/shahzadthathal/backend-server-vpn.git

- Database config
    - Update database credentials in  /config/config.json

- Install dependencies
  - cd backend-server-vpn
  - npm install

- Run
  - node server

- Info
  - API Url: http://localhost:5000/api/
  - JWT config is defined in auth.config.js
  - Database schema describe image is under docs dir
  - forever-monitoer installed to avoid stop application
  - Node cluster module also configured for high scalability and perfomance.

- API Endpoints
  - Register user : ```/api/register```  , POST parameters: ```username, password, confirm_password```
  - Login user: ```/api/login```, POST params: ```username, password```, it will return a auth token(JWT token) 