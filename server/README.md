// SELECT
//     r.room_id,
//     r.room_name,
//     s.sen_id,
//     s.sen_status,
//     s.timestamp
// FROM
//     rooms r
// JOIN
//     sensors s ON r.room_id = s.room_id
// WHERE
//     s.room_id IS NOT NULL;



two 
// SELECT
//     r.room_id,
//     r.room_name,
//     s.sen_id,
//     s.sen_status,
//     s.timestamp
// FROM
//     rooms r
// LEFT JOIN
//     sensors s ON r.room_id = s.room_id
// WHERE
//     s.sen_id IS NOT NULL
//     AND s.sen_id != 6
// ORDER BY
//     r.room_id, s.sen_id;
