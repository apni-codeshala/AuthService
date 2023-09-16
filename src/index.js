const express = require('express');

const { PORT } = require('./config/serverConfig');

const app = express();

const prepareAndStartServer = () => {

    app.listen(PORT, () => {
        console.log(`Server starte running on port: ${PORT}`);
    })

}

prepareAndStartServer();