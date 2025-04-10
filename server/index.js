const express = require("express");
const http = require("http");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let lastTimestamps = {};

function checkForSensorChanges() {
  const query = `
    SELECT 
      r.room_id,
      r.room_name,
      s.sen_id,
      s.sen_status,
      s.timestamp
    FROM 
      rooms r
    JOIN 
      sensors s ON r.room_id = s.room_id
    WHERE 
      s.room_id IS NOT NULL
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching sensor data:", err.message);
      return;
    }

    let changed = false;

    results.forEach((row) => {
      const key = row.sen_id;
      const newTime = row.timestamp?.toISOString();
      if (!lastTimestamps[key] || lastTimestamps[key] !== newTime) {
        lastTimestamps[key] = newTime;
        changed = true;
      }
    });

    if (changed) {
      io.emit("sensor-update", results); 
    }
  });
}

setInterval(checkForSensorChanges, 1000);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

//! 2 secpmd latency
// const express = require("express");
// const mysql = require("mysql2");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// app.get("/sensors", (req, res) => {
//   db.query("SELECT sen_id, sen_status FROM sensors", (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   const sendSensorRoomData = () => {
//     const query = `
//       SELECT
//           r.room_id,
//           r.room_name,
//           s.sen_id,
//           s.sen_status,
//           s.timestamp
//       FROM
//           rooms r
//       JOIN
//           sensors s ON r.room_id = s.room_id
//       WHERE
//           s.room_id IS NOT NULL;
//     `;

//     db.query(query, (err, results) => {
//       if (!err) {
//         console.log("Room sensor data:", results);

//         socket.emit("room-sensor-data", results);
//       }
//     });
//   };

//   sendSensorRoomData(); // send once on connect

//   const interval = setInterval(sendSensorRoomData, 2000); // 2 second latency

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//     clearInterval(interval);
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server + WebSocket running on http://localhost:${PORT}`);
// });
