# Semia
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation
Run the following commands
```sh
git clone https://github.com/MartijnReeuwijk/meesterproef-semia.git
cd meesterproef-semia
npm install
touch .env
```

Next install a mysql database and add the user `semia` with a password of your choice.  
Then open the `.env` file and add the following
````
DB_HOST=localhost
DB_USER=semia
DB_PASSWORD=the_password_you_chose
DB_NAME=semia
```

To run the server either use
```sh
nodemon

# or

npm run dev

# or

node index.js
```