/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";

const Room = ({ id, status }) => {
  return (
    <div
      className={`w-32 h-32 border border-gray-400 shadow-md flex items-center justify-center text-lg font-semibold rounded-xl transition-all duration-500 relative overflow-hidden ${
        status ? "bg-red-600 text-white" : "bg-gray-50 text-gray-800"
      }`}>
      <div className="absolute inset-0 border-4 border-gray-200 rounded-xl pointer-events-none"></div>
      Room {id}
    </div>
  );
};

function App() {
  const [sensors, setSensors] = useState([]);
  const [prevStatuses, setPrevStatuses] = useState({});
  const hasMounted = useRef(false);

  const fetchSensors = async () => {
    try {
      const res = await fetch("http://localhost:3000/sensors");
      const data = await res.json();

      if (hasMounted.current) {
        data.forEach((sensor) => {
          const prevStatus = prevStatuses[sensor.sen_id];
        });
      } else {
        hasMounted.current = true;
      }

      setSensors(data);

      const updatedStatuses = {};
      data.forEach((sensor) => {
        updatedStatuses[sensor.sen_id] = sensor.sen_status;
      });
      setPrevStatuses(updatedStatuses);
    } catch (err) {
      console.error("Error fetching sensors:", err);
    }
  };

  useEffect(() => {
    fetchSensors();
    const interval = setInterval(fetchSensors, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex flex-col font-sans">
      <header className="w-full bg-gray-900 text-white py-6 shadow-lg">
        <h1 className="text-center text-4xl font-bold tracking-wide">
          🏠 Smart House Sensor Dashboard
        </h1>
      </header>

      <div className="flex flex-1">
        <main className="py-12 w-full flex justify-center">
          <div className="grid grid-cols-3 gap-6 bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            {sensors.map((sensor) => (
              <Room
                key={sensor.sen_id}
                id={sensor.sen_id}
                status={sensor.sen_status}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

//todo: removing react hot toast

// import { useEffect, useState, useRef } from "react";
// // import { Toaster, toast } from "react-hot-toast";

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
// //   const [logs, setLogs] = useState([]);
//   const hasMounted = useRef(false);

//   const fetchSensors = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/sensors");

//       // NOTE: backend response
//       //   [
//       //     { sen_id: 1, sen_status: 0 },
//       //     { sen_id: 2, sen_status: 0 },
//       //     { sen_id: 3, sen_status: 0 },
//       //     { sen_id: 4, sen_status: 0 },
//       //     { sen_id: 5, sen_status: 0 },
//       //     { sen_id: 6, sen_status: 0 },
//       //   ];

//       const data = await res.json();

//       if (hasMounted.current) {
//         const newLogs = [];
//         data.forEach((sensor) => {
//           const prevStatus = prevStatuses[sensor.sen_id];
//           if (
//             prevStatus !== undefined &&
//             prevStatus === 0 &&
//             sensor.sen_status === 1
//           ) {
//             const message = `Sensor in Room ${sensor.sen_id} is triggered!`;
//             toast.success(message, {
//               position: "bottom-right",
//               duration: 4000,
//             });
//             newLogs.push({ id: Date.now() + sensor.sen_id, message });
//           }
//         });
//         if (newLogs.length > 0)
//         //   setLogs((prev) => [...newLogs, ...prev].slice(0, 10));
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col font-sans">
//       <header className="w-full bg-gray-900 text-white py-6 shadow-lg">
//         <h1 className="text-center text-4xl font-bold tracking-wide">
//           🏠 Smart House Sensor Dashboard
//         </h1>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         <main className="py-12 w-3/4 flex justify-center overflow-y-auto">
//           <div className="grid grid-cols-3 gap-3 bg-grey-100  p-8 rounded-xl shadow-xl border border-gray-800">
//             {sensors.map((sensor) => (
//               <Room
//                 key={sensor.sen_id}
//                 id={sensor.sen_id}
//                 status={sensor.sen_status}
//               />
//             ))}
//           </div>
//         </main>

//         {/* <aside className="w-1/4 p-6 bg-white border-l border-gray-300 overflow-y-auto h-full max-h-screen rounded-2xl shadow-2xl">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             📋 Trigger Logs
//           </h2>
//           <ul className="space-y-2 text-sm text-gray-700">
//             {logs.map((log) => (
//               <li
//                 key={log.id}
//                 className="bg-gray-100 p-2 rounded-md shadow-sm border-l-4 border-red-500">
//                 {log.message}
//               </li>
//             ))}
//           </ul>
//         </aside> */}
//       </div>

//       <Toaster
//         position="bottom-right"
//         toastOptions={{ duration: 4000 }}
//       />
//     </div>
//   );
// }

// export default App;
