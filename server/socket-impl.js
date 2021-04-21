const jwToken = require('jsonwebtoken');

const {secret} = require('./middleware/jwt');
const { socketChannel, role} = require('./utils/socket-constants');
const {eventCodes} = require('./utils/events-classification');
const {eventEmitter} = require('./utils/event-emitter');

module.exports = (io) => {

  function initConnectedSocket(socket,payload) {
    if (!payload || !payload.token) {
      socket.join([socketChannel.anonymous, socketChannel.learners]);
      socket.data = {
        id: Math.random().toString(36).substr(2, 9),
        username: Math.random().toString(36).substr(2, 9),
        role: 'anonymous'
      };
      return;
    }

    const {exp, ...data} = jwToken.verify(payload.token, secret);
    if (exp < Date.now().valueOf() / 1000) {
      socket.join([socketChannel.anonymous, socketChannel.learners]);
      //push token expired event
      socket.emit(eventCodes.session.expired,{message:'You session has expired'});
      return;
    }

    socket.data = {
      id: data.data.id,
      username: data.data.username,
      role: data.data.role,
      expire: exp
    };

    if (data.data.role === role.moderator) {
      socket.join([socketChannel.moderators, socketChannel.learners, socketChannel.contentCreator]);
    } else if (data.data.role === role.admin) {
      socket.join([socketChannel.admins, socketChannel.learners, socketChannel.contentCreator]);
    } else {
      // basic users or anyone else not yet covered
      socket.join([socketChannel.anonymous, socketChannel.learners, socketChannel.contentCreator]);
    }

  }


  io.on('connection', (socket) => {

    initConnectedSocket(socket,socket.handshake.auth);

    socket.on(eventCodes.user.roleChange, (payload) => {

      //remove user from all rooms/channels they are in first
      Array.from(socket.rooms).map((room)=>{
        if(room !==socket.id){
          socket.leave(room);
        }
      });
      //assign the user to the appropriate room
      initConnectedSocket(socket,payload);
    });


  });

  /**
     * on chapter publish, push the update to all moderators
     */
  eventEmitter.on(eventCodes.chapter.published, (payload) => {
    io.to(socketChannel.moderators).emit(eventCodes.chapter.published, payload);
  });

  /**
     * on approved chapter delete, push the update to all learners
     */
  eventEmitter.on(eventCodes.approvedChapter.deleted, (payload) => {
    io.to(socketChannel.learners).emit(eventCodes.approvedChapter.deleted, payload);
  });

  return io;
};