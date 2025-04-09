const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/sensors", (req, res) => {
  db.query("SELECT sen_id, sen_status FROM sensors", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results); // { sen_id, sen_status }
  });
});

app.get("/sensor/:id", (req, res) => {
  const sensorId = req.params.id;

  db.query(
    "SELECT sen_status FROM sensors WHERE sen_id = ?",
    [sensorId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ error: "Sensor not found" });

      res.json({ sen_status: result[0].sen_status });
    }
  );
});

app.post("/sensor/toggle/:id", (req, res) => {
  const sensorId = req.params.id;

  db.query(
    "SELECT sen_status FROM sensors WHERE sen_id = ?",
    [sensorId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ error: "Sensor not found" });

      const currentStatus = result[0].sen_status;
      const newStatus = currentStatus === 1 ? 0 : 1;

      db.query(
        "UPDATE sensors SET sen_status = ? WHERE sen_id = ?",
        [newStatus, sensorId],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({ sen_status: newStatus });
        }
      );
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
