db tables according to me;

Database changed
mysql> show tables;
+---------------+
| Tables_in_sus |
+---------------+
| rooms |
| sensors |
+---------------+
2 rows in set (0.05 sec)

mysql> select \* from rooms;
+---------+-----------+
| room_id | room_name |
+---------+-----------+
| 1 | Room 1 |
| 2 | Room 2 |
| 3 | Room 3 |
| 4 | Room 4 |
+---------+-----------+
4 rows in set (0.03 sec)

mysql> select \* from sensors;
+--------+------------+---------------------+------+---------+
| sen_id | sen_status | timestamp | room | room_id |
+--------+------------+---------------------+------+---------+
| 1 | 0 | 2025-04-10 17:39:04 | NULL | 1 |
| 2 | 0 | 2025-04-10 17:22:57 | NULL | 2 |
| 3 | 0 | 2025-04-10 17:23:14 | NULL | 2 |
| 4 | 0 | 2025-04-10 17:40:06 | NULL | 3 |
| 5 | 0 | 2025-04-10 15:36:16 | NULL | 4 |
| 6 | 1 | 2025-04-09 20:12:31 | NULL | NULL |
+--------+------------+---------------------+------+---------+
6 rows in set (0.02 sec)

mysql>

// SELECT
// r.room_id,
// r.room_name,
// s.sen_id,
// s.sen_status,
// s.timestamp
// FROM
// rooms r
// JOIN
// sensors s ON r.room_id = s.room_id
// WHERE
// s.room_id IS NOT NULL;

two
// SELECT
// r.room_id,
// r.room_name,
// s.sen_id,
// s.sen_status,
// s.timestamp
// FROM
// rooms r
// LEFT JOIN
// sensors s ON r.room_id = s.room_id
// WHERE
// s.sen_id IS NOT NULL
// AND s.sen_id != 6
// ORDER BY
// r.room_id, s.sen_id;
