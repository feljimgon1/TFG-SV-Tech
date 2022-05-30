const mongo = require('./database');
const app = require('./app');
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const Message = require("./models/Message");

const User = require('./models/User');

const server = app.listen(app.get('port'), (err, req) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server on port ', app.get('port'))
    }
});

const io = require("socket.io")(server, {
    cors: {
        origins: [
            "http://localhost:4200",
            "https://sv-tech.herokuapp.com"
        ],
    },
});

io.on('connection', async (socket) => {
    let token = socket.handshake.auth.token;
    if (token) {
        try {
            let userTkn = jwt.verify(token, config.secret);
            let user = await User.findById(userTkn._id);
            socket.on('join', async (data) => {
                socket.join(data.roomId);
                socket.broadcast.to(data.roomId).emit('user joined');
            });

            socket.on('message', async (data) => {
                let m = await new Message({ message: data.message, srcUserId: data.srcUserId, dstUserId: data.dstUserId })
                m.save()
                io.in(data.roomId).emit('new message', { srcUserId: data.srcUserId, dstUserId: data.dstUserId, message: data.message });
            });

            socket.on('disconnect', (data) => {
                socket.disconnect();
            })
        } catch (err) {
            socket.disconnect();
        }
    }

})