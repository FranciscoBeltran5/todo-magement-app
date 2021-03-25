# Challenge-todos
### BE and FE application.

## Installation guide

### 1. Install dependencies
Run this command in order to install the dependencies of server(BE)
```sh
$ cd back
$ npm install

```

Run this command in order to install the dependencies of react(FE)
```sh
$cd front
$ npm run client-install
```

### 2. Configure Database
Add your mysql creedentials to the `config.json` file located in `back/config/`

### 2. Create the Database
Run these commands in the `back` directory
```sh
$ npm run create
$ npm run config
```

### 4. Run the application

This next command will start server by default on port [8080](http://localhost:8080)
```sh
$ cd back
$ npm run start
```

This next command will start only the client (react) by default on port [3000](http://localhost:3000)
```sh
$ cd front
$ npm run start
```
