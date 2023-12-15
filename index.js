import express from "express";
import fs from "fs";
import moment from "moment";
import test from "./routes/test.route.js";
import {user} from "./routes/user.route.js";
import {category} from "./routes/category.route.js";
import {subcategory} from "./routes/sub.category.route.js";
import {product} from "./routes/product.route.js";
import {reviewrating} from "./routes/review.rating.route.js";
import connectDB from "./config/db.js"
import { config } from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";



config();
const app = express()
app.use(express.json())

// const httpServer = createServer();
// const socket = new Server(httpServer, {
// 	cors: {
// 		origins: ['http://dev.adaiya.in','http://localhost:4200','http://localhost:9002'],
// 		'transports': ['websocket', 'pollings']
// 	  },
// });
//  var users = {};
//  var allUsers = [];
//  var roomAll  = [];
// socket.on('connection', (socket) => {
//     console.log("Connected...",users);
// 	socket.on('judna', (data) => {
// 		allUsers.push(data.user)
// 		let allUsersFinal = [...new Set(allUsers)];
// 		roomAll[data.room] = allUsersFinal;

// 		if(roomAll[data.room].length <= 2){
// 	  socket.join(data.room);
// 	  users[socket.id] = data.user;
// 	  var  JoinRes = {
// 		message: data.user+' has joined '+data.room+" room",
// 		users:users,
// 	};
// 	  socket.broadcast.to(data.room).emit('ha_jud_gya_hai', JoinRes);
// 	}else{
// 		socket.emit('judna', 'Room is full');
// 	}
// 	});
// });
connectDB();
app.use(test);
app.use(category);
app.use(user);
app.use(subcategory);
app.use(product);
app.use(reviewrating);
app.use('/product_upload', express.static('product_upload'));
console.log(moment(Date.now()).format('MM/ddd/YY H:m:s a'));

// app.use(router);
app.listen(process.env.PORT || 3001,(request,response) =>{
    console.log("Yes your server connected with PORT:3002");
})