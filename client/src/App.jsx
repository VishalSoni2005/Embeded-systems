import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:3000");

export default function App() {
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    socket.on("sensor-update", (data) => {
      const grouped = data.reduce((acc, sensor) => {
        if (!acc[sensor.room_id]) {
          acc[sensor.room_id] = {
            room_name: sensor.room_name,
            sensors: [],
          };
        }
        acc[sensor.room_id].sensors.push({
          sen_id: sensor.sen_id,
          sen_status: sensor.sen_status,
        });
        return acc;
      }, {});
      setRoomData(grouped);
      toast.info("🔔 Sensor status updated!");
    });

    return () => {
      socket.off("sensor-update");
    };
  }, []);

  const getRoomBgColor = (room_id, sensors) => {
    if (room_id === 2) {
      const activeCount = sensors.filter((s) => s.sen_status === 1).length;
      if (activeCount === 2) return "bg-red-400";
      if (activeCount === 1) return "bg-pink-300";
    }
    return sensors[0]?.sen_status === 1 ? "bg-yellow-200" : "bg-green-100";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" />
      <h1 className="text-4xl font-bold mb-8 text-center">
         Sensor Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(roomData).map(([roomId, room]) => (
          <div
            key={roomId}
            className={`rounded-xl shadow-lg p-4 text-center transition-colors duration-500 ${getRoomBgColor(
              Number(roomId),
              room.sensors
            )}`}>
            <h2 className="text-xl font-semibold mb-2">{room.room_name}</h2>
            <div className="space-y-1">
              {room.sensors.map((sensor) => (
                <p key={sensor.sen_id}>
                  Sensor {sensor.sen_id}:{" "}
                  <span
                    className={
                      sensor.sen_status === 1
                        ? "text-red-600"
                        : "text-green-700"
                    }>
                    {sensor.sen_status === 1 ? "Active 🔴" : "Inactive 🟢"}
                  </span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//! sex Room code
// /* eslint-disable no-unused-vars */
// import { useEffect, useState, useRef } from "react";

// const Room = ({ id, status }) => {
//   return (
//     <div
//       className={`w-32 h-32 border border-gray-400 shadow-md flex items-center justify-center text-lg font-semibold rounded-xl transition-all duration-500 relative overflow-hidden ${
//         status ? "bg-red-600 text-white" : "bg-gray-50 text-gray-800"
//       }`}>
//       <div className="absolute inset-0 border-4 border-gray-200 rounded-xl pointer-events-none"></div>
//       Room {id}
//     </div>
//   );
// };

// function App() {
//   const [sensors, setSensors] = useState([]);
//   const [prevStatuses, setPrevStatuses] = useState({});
//   const hasMounted = useRef(false);

//   const fetchSensors = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/sensors");
//       const data = await res.json();

//       if (hasMounted.current) {
//         data.forEach((sensor) => {
//           const prevStatus = prevStatuses[sensor.sen_id];
//         });
//       } else {
//         hasMounted.current = true;
//       }

//       setSensors(data);

//       const updatedStatuses = {};
//       data.forEach((sensor) => {
//         updatedStatuses[sensor.sen_id] = sensor.sen_status;
//       });
//       setPrevStatuses(updatedStatuses);
//     } catch (err) {
//       console.error("Error fetching sensors:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSensors();
//     const interval = setInterval(fetchSensors, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex flex-col font-sans">
//       <header className="w-full bg-gray-900 text-white py-6 shadow-lg">
//         <h1 className="text-center text-4xl font-bold tracking-wide">
//           Smart House Sensor Dashboard
//         </h1>
//       </header>

//       <div className="flex flex-1">
//         <main className="py-12 w-full flex justify-center">
//           <div className="grid grid-cols-3 gap-6 bg-white p-8 rounded-xl shadow-xl border border-gray-300">
//             {sensors.map((sensor) => (
//               <Room
//                 key={sensor.sen_id}
//                 id={sensor.sen_id}
//                 status={sensor.sen_status}
//               />
//             ))}
//           </div>
//         </main>
//       </div>

//     </div>
//   );
// }

// export default App;
