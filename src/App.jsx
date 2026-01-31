// import { useEffect, useState} from "react";

// const tickSound = new Audio("/tick.mp3");
// const doneSound = new Audio("/done.mp3");


// export default function App() {
//   const MODES = {
//     focus: { label: "Focus", default: 25 },
//     short: { label: "Short Break", default: 5 },
//     long: { label: "Long Break", default: 15 },
//   };
 
//   const [mode, setMode] = useState("focus");
//   const [durations, setDurations] = useState({
//     focus: 25,
//     short: 5,
//     long: 15,
//   });

//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [isRunning, setIsRunning] = useState(false);

//   const [sessions, setSessions] = useState({
//     focus: 0,
//     short: 0,
//     long: 0,
//   });

//   /* ---------- TIMER ENGINE ---------- */
//   useEffect(() => {
//   if (!isRunning) return;

//   const interval = setInterval(() => {
//     setTimeLeft((prev) => {
//       if (prev <= 1) return 0;
//       tickSound.currentTime = 0;
//       tickSound.volume = 0.1;
//       tickSound.play();
//       return prev - 1;

//     });
//   }, 1000);

//   return () => clearInterval(interval);
// }, [isRunning]);

// useEffect(() => {
//   if (timeLeft === 0 && isRunning) {
//     handleComplete();
//   }
// }, [timeLeft]);

// useEffect(() => {
//   const saved = JSON.parse(localStorage.getItem("pomodoro"));
//   if (saved) {
//     setMode(saved.mode);
//     setDurations(saved.durations);
//     setSessions(saved.sessions);
//     setTimeLeft(saved.timeLeft);
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem(
//     "pomodoro",
//     JSON.stringify({ mode, durations, sessions, timeLeft })
//   );
// }, [mode, durations, sessions, timeLeft]);


//   function handleComplete() {
//     doneSound.currentTime = 0;
//     doneSound.play();

//   setIsRunning(false);

//   setSessions((prev) => {
//     const updated = { ...prev, [mode]: prev[mode] + 1 };

//     // Long break after every 4 focus sessions
//     if (mode === "focus" && updated.focus % 4 === 0) {
//       switchMode("long");
//     } else if (mode === "focus") {
//       switchMode("short");
//     } else {
//       switchMode("focus");
//     }

//     return updated;
//   });
// }


//   function switchMode(newMode) {
//     setMode(newMode);
//     setIsRunning(false);
//     setTimeLeft(durations[newMode] * 60);
//   }


//   function toggleTimer() {
//     setIsRunning((p) => !p);
//   }

//   function resetTimer() {
//     setIsRunning(false);
//     setTimeLeft(durations[mode] * 60);
//   }

//   function resetSessions() {
//     setSessions({ focus: 0, short: 0, long: 0 });
//   }

//   function changeDuration(type, delta) {
//     setDurations((prev) => {
//       const updated = Math.max(1, prev[type] + delta);

//       if (type === mode && !isRunning) {
//         setTimeLeft(updated * 60);
//       }

//       return { ...prev, [type]: updated };
//     });
//   }

//   function formatTime(sec) {
//     const m = String(Math.floor(sec / 60)).padStart(2, "0");
//     const s = String(sec % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   }

//   return (
//     <div className="relative min-h-screen w-full bg-[#1e232e] flex items-center justify-center">

//       {/* Bokeh */}
//       <div className="bokeh-layer">
//         <div className="bokeh b1"></div>
//         <div className="bokeh b2"></div>
//         <div className="bokeh b3"></div>
//         <div className="bokeh b4"></div>
//         <div className="bokeh b5"></div>
//       </div>

//       <div className="relative z-10 w-[380px] sm:w-[500px] min-h-[520px] bg-[#252c3a] rounded-3xl shadow-2xl border-1 border-white/25 shadow-[0_8px_10px_rgba(0,0,0,0.6)]">

//         {/* Header */}
//         <h1 className="h-[64px] flex items-center justify-center text-white text-3xl mb-4 font-bold border-b-2 border-[#49525c] gap-3">
//           <i className="fa-solid fa-clock"></i> Pomodoro Timer
//         </h1>

//         <div className="flex flex-col items-center">

//           {/* Mode Selector */}
//           <div className="flex gap-3 mb-2 w-full overflow-hidden rounded-xl px-6">

//             {/* FOCUS */}
//             <div onClick={() => switchMode("focus")}
//               className={`flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col cursor-pointer
//                 ${mode === "focus" ? 
//                 "scale-[1.03] shadow-[0_0_20px_rgba(255,150,60,0.45)]" 
//                 : "opacity-80 hover:opacity-100"}

//               bg-[#6b4733] border border-[#3a4150]
//               shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]`}>

//               <div className="text-lg font-semibold bg-[#c06b2c] text-white text-center py-1 border-b-2 border-[#5e3012] flex items-center justify-center gap-2">
//                 <i className="fa-solid fa-clock text-sm"></i> Focus Time
//               </div>

//               <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center gap-2">
//                 {mode === "focus" && (
//                   <button onClick={(e) => { e.stopPropagation(); changeDuration("focus", -1); }}
//                     className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">−</button>
//                 )}
//                 {durations.focus} min
//                 {mode === "focus" && (
//                   <button onClick={(e) => { e.stopPropagation(); changeDuration("focus", 1); }}
//                     className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">+</button>
//                 )}
//               </div>
//             </div>

//             {/* SHORT */}
//             <div onClick={() => switchMode("short")}
//               className={`flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col cursor-pointer
//                 ${mode === "short" ? 
//                 "scale-[1.03] shadow-[0_0_20px_rgba(120,255,120,0.45)]" 
//                 : "opacity-80 hover:opacity-100"}

//               bg-[#395633] border border-[#3a4150]
//               shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]`}>

//               <div className="text-lg font-semibold bg-[#4e752e] text-white text-center py-1 border-b-2 border-[#233f15] flex items-center justify-center gap-2">
//                 <i className="fa-solid fa-mug-hot text-sm"></i> Short Break
//               </div>

//               <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center gap-2">
//                 {mode === "short" && (
//                   <button onClick={(e) => { e.stopPropagation(); changeDuration("short", -1); }}
//                     className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">−</button>
//                 )}
//                 {durations.short} min
//                 {mode === "short" && (
//                   <button onClick={(e) => { e.stopPropagation(); changeDuration("short", 1); }}
//                     className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">+</button>
//                 )}
//               </div>
//             </div>

//             {/* LONG */}
//             <div onClick={() => switchMode("long")}
//               className={`flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col cursor-pointer
//                 ${mode === "long" ? 
//                 "scale-[1.03] shadow-[0_0_20px_rgba(120,170,255,0.45)]" 
//                 : "opacity-80 hover:opacity-100"}

//               bg-[#223d61] border border-[#3a4150]
//               shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]`}>

//               <div className="text-lg font-semibold bg-[#3e628d] text-white text-center py-1 border-b-2 border-[#0c2347] flex items-center justify-center gap-2">
//                 <i className="fa-solid fa-moon text-sm"></i> Long Break
//               </div>

//               <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center gap-2">
//                 {mode === "long" && (
//                   <button onClick={(e) => { e.stopPropagation(); changeDuration("long", -1); }}
//                     className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">−</button>
//                 )}
//                 {durations.long} min
//                 {mode === "long" && (
//                   <button onClick={(e) => { e.stopPropagation(); changeDuration("long", 1); }}
//                     className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">+</button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Timer */}
//           <div className="relative flex items-center justify-center w-full" style={{ height: "170px" }}>
//             <div className="absolute w-70 h-70 rounded-full border border-white/20 bg-[#363b47]" style={{ transform: "scaleY(0.6)" }} />
//             <div className="absolute w-67 h-69 rounded-full border border-white/10 bg-[#1b212b]" style={{ transform: "scaleY(0.6)" }} />
//             <div className="w-66 h-63 rounded-full bg-gradient-to-b from-[#3e4556] to-[#1d2531] border-t-4 border-white/50" style={{ transform: "scaleY(0.6)" }} />
//             <div className="absolute text-6xl font-mono text-white tracking-wider">
//               {formatTime(timeLeft)}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="relative flex justify-center gap-2 -mt-8 z-10 mb-3">
//             <button onClick={toggleTimer}
//               className="w-35 h-10 rounded-xl bg-gradient-to-b from-[#5aa23f] to-[#255d23] text-white font-semibold shadow-lg hover:scale-105 transition flex items-center justify-center gap-2">
//               <i className={`fa-solid ${isRunning ? "fa-pause" : "fa-play"} text-sm`}></i>
//               {isRunning ? "Pause" : "Start"}
//             </button>

//             <button onClick={resetTimer}
//               className="w-35 h-10 rounded-xl bg-gradient-to-b from-[#de4638] to-[#91241d] text-white font-semibold shadow-lg hover:scale-105 transition flex items-center justify-center gap-2">
//               <i className="fa-solid fa-rotate-right text-sm"></i> Reset
//             </button>
//           </div>

//           {/* Sessions */}
//           <div className="border-b-2 border-[#49525c] border-t-2 border-[#49525c] 
//                           shadow-[0_4px_6px_rgba(0,0,0,0.6)] pt-1 w-full mb-4 px-6">
//             <div className="relative flex items-center text-white">
//               <span className="z-10 bg-[#252c3a] pr-3">Sessions Today</span>
//               <div className="absolute left-0 right-0 top-1/2 h-[2px] w-[66%] bg-white/40"></div>
//               <button onClick={resetSessions}
//                 className="ml-auto z-10 bg-[#252c3a] pl-3 text-sm bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 flex items-center gap-1 mt-2">
//                 <i className="fa-solid fa-rotate text-xs"></i> Reset Sessions
//               </button>
//             </div>

//             <div className="flex items-center gap-2 mb-2 text-white">
//               <span>Completed:</span>
//               <span>{sessions.focus + sessions.short + sessions.long}</span>
//             </div>
//           </div>

//           {/* Bottom Counters */}
//           <div className="flex gap-3 mb-2 w-full overflow-hidden rounded-xl px-6">
//             {["focus", "short", "long"].map((m) => (
//               <div key={m}
//                 className="flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col
//                            bg-[#242b36] border border-[#3a4150]
//                            shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]">
//                 <div className="text-lg font-semibold bg-[#383d49] text-white text-center py-1 border-b border-[#161c27]">
//                   {MODES[m].label}
//                 </div>
//                 <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center">
//                   ×{sessions[m]}
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState, useRef } from "react";

const tickSound = new Audio("/tick.mp3");
const doneSound = new Audio("/done.mp3");

export default function App() {
  const MODES = {
    focus: { label: "Focus", default: 25 },
    short: { label: "Short Break", default: 5 },
    long: { label: "Long Break", default: 15 },
  };

  const completedRef = useRef(false);

  const [mode, setMode] = useState("focus");
  const [durations, setDurations] = useState({
    focus: 25,
    short: 5,
    long: 15,
  });

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState({
    focus: 0,
    short: 0,
    long: 0,
  });

  /* ---------- TIMER ENGINE ---------- */
  useEffect(() => {
    if (!isRunning) return;

    completedRef.current = false;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!completedRef.current) {
            completedRef.current = true;
            handleComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  /* ---------- LOCAL STORAGE ---------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pomodoro"));
    if (saved) {
      setMode(saved.mode);
      setDurations(saved.durations);
      setSessions(saved.sessions);
      setTimeLeft(saved.timeLeft);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pomodoro",
      JSON.stringify({ mode, durations, sessions, timeLeft })
    );
  }, [mode, durations, sessions, timeLeft]);

  function playClick() {
    tickSound.currentTime = 0;
    tickSound.volume = 0.25;
    tickSound.play().catch(() => {});
  }


  /* ---------- LOGIC ---------- */
  function handleComplete() {
    playDone(8);
    setIsRunning(false);

    setSessions((prev) => {
      const updated = { ...prev, [mode]: prev[mode] + 1 };

      if (mode === "focus" && updated.focus % 4 === 0) {
        switchMode("long");
      } else if (mode === "focus") {
        switchMode("short");
      } else {
        switchMode("focus");
      }

      return updated;
    });
  }

  function switchMode(newMode) {
    playClick();
    completedRef.current = false;
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(durations[newMode] * 60);
  }

  function toggleTimer() {
    playClick();
    setIsRunning((p) => !p);
  }

  function resetTimer() {
    playClick();
    setIsRunning(false);
    setTimeLeft(durations[mode] * 60);
  }

  function resetSessions() {
    playClick();
    setSessions({ focus: 0, short: 0, long: 0 });
  }

  function changeDuration(type, delta) {
    playClick();
    setDurations((prev) => {
      const updated = Math.max(1, prev[type] + delta);

      if (type === mode && !isRunning) {
        setTimeLeft(updated * 60);
      }

      return { ...prev, [type]: updated };
    });
  }

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function playDone(seconds = 3) {
    doneSound.currentTime = 0;
    doneSound.volume = 0.7;
    doneSound.play().catch(() => {});

    setTimeout(() => {
      doneSound.pause();
      doneSound.currentTime = 0;
    }, seconds * 1000);
  }

  return (
    <div className="relative min-h-screen w-full bg-[#1e232e] flex items-center justify-center">

      {/* Bokeh */}
      <div className="bokeh-layer">
        <div className="bokeh b1"></div>
        <div className="bokeh b2"></div>
        <div className="bokeh b3"></div>
        <div className="bokeh b4"></div>
        <div className="bokeh b5"></div>
      </div>

      <div className="relative z-10 w-[380px] sm:w-[500px] min-h-[520px] bg-[#252c3a] rounded-3xl shadow-2xl border-1 border-white/25 shadow-[0_8px_10px_rgba(0,0,0,0.6)]">

        {/* Header */}
        <h1 className="h-[64px] flex items-center justify-center text-white text-3xl mb-4 font-bold border-b-2 border-[#49525c] gap-3">
          <i className="fa-solid fa-clock"></i> Pomodoro Timer
        </h1>

        <div className="flex flex-col items-center">

          {/* Mode Selector */}
          <div className="flex gap-3 mb-2 w-full overflow-hidden rounded-xl px-6">

            {/* FOCUS */}
            <div onClick={() => switchMode("focus")}
              className={`flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col cursor-pointer
                ${mode === "focus" ? 
                "scale-[1.03] shadow-[0_0_20px_rgba(255,150,60,0.45)]" 
                : "opacity-80 hover:opacity-100"}

              bg-[#6b4733] border border-[#3a4150]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]`}>

              <div className="text-lg font-semibold bg-[#c06b2c] text-white text-center py-1 border-b-2 border-[#5e3012] flex items-center justify-center gap-2">
                <i className="fa-solid fa-clock text-sm"></i> Focus Time
              </div>

              <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center gap-2">
                {mode === "focus" && (
                  <button onClick={(e) => { e.stopPropagation(); changeDuration("focus", -1); }}
                    className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">−</button>
                )}
                {durations.focus} min
                {mode === "focus" && (
                  <button onClick={(e) => { e.stopPropagation(); changeDuration("focus", 1); }}
                    className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">+</button>
                )}
              </div>
            </div>

            {/* SHORT */}
            <div onClick={() => switchMode("short")}
              className={`flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col cursor-pointer
                ${mode === "short" ? 
                "scale-[1.03] shadow-[0_0_20px_rgba(120,255,120,0.45)]" 
                : "opacity-80 hover:opacity-100"}

              bg-[#395633] border border-[#3a4150]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]`}>

              <div className="text-lg font-semibold bg-[#4e752e] text-white text-center py-1 border-b-2 border-[#233f15] flex items-center justify-center gap-2">
                <i className="fa-solid fa-mug-hot text-sm"></i> Short Break
              </div>

              <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center gap-2">
                {mode === "short" && (
                  <button onClick={(e) => { e.stopPropagation(); changeDuration("short", -1); }}
                    className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">−</button>
                )}
                {durations.short} min
                {mode === "short" && (
                  <button onClick={(e) => { e.stopPropagation(); changeDuration("short", 1); }}
                    className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">+</button>
                )}
              </div>
            </div>

            {/* LONG */}
            <div onClick={() => switchMode("long")}
              className={`flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col cursor-pointer
                ${mode === "long" ? 
                "scale-[1.03] shadow-[0_0_20px_rgba(120,170,255,0.45)]" 
                : "opacity-80 hover:opacity-100"}

              bg-[#223d61] border border-[#3a4150]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]`}>

              <div className="text-lg font-semibold bg-[#3e628d] text-white text-center py-1 border-b-2 border-[#0c2347] flex items-center justify-center gap-2">
                <i className="fa-solid fa-moon text-sm"></i> Long Break
              </div>

              <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center gap-2">
                {mode === "long" && (
                  <button onClick={(e) => { e.stopPropagation(); changeDuration("long", -1); }}
                    className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">−</button>
                )}
                {durations.long} min
                {mode === "long" && (
                  <button onClick={(e) => { e.stopPropagation(); changeDuration("long", 1); }}
                    className="w-6 h-6 rounded bg-white/20 hover:bg-white/30">+</button>
                )}
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="relative flex items-center justify-center w-full" style={{ height: "170px" }}>
            <div className="absolute w-70 h-70 rounded-full border border-white/20 bg-[#363b47]" style={{ transform: "scaleY(0.6)" }} />
            <div className="absolute w-67 h-69 rounded-full border border-white/10 bg-[#1b212b]" style={{ transform: "scaleY(0.6)" }} />
            <div className="w-66 h-63 rounded-full bg-gradient-to-b from-[#3e4556] to-[#1d2531] border-t-4 border-white/50" style={{ transform: "scaleY(0.6)" }} />
            <div className="absolute text-6xl font-bold text-white tracking-wider">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Buttons */}
          <div className="relative flex justify-center gap-2 -mt-8 z-10 mb-3">
            <button onClick={toggleTimer}
              className="w-35 h-10 rounded-xl bg-gradient-to-b from-[#5aa23f] to-[#255d23] text-white font-semibold shadow-lg hover:scale-105 transition flex items-center justify-center gap-2">
              <i className={`fa-solid ${isRunning ? "fa-pause" : "fa-play"} text-sm`}></i>
              {isRunning ? "Pause" : "Start"}
            </button>

            <button onClick={resetTimer}
              className="w-35 h-10 rounded-xl bg-gradient-to-b from-[#de4638] to-[#91241d] text-white font-semibold shadow-lg hover:scale-105 transition flex items-center justify-center gap-2">
              <i className="fa-solid fa-rotate-right text-sm"></i> Reset
            </button>
          </div>

          {/* Sessions */}
          <div className="border-b-2 border-[#49525c] border-t-2 border-[#49525c] 
                          shadow-[0_4px_6px_rgba(0,0,0,0.6)] pt-1 w-full mb-4 px-6">
            <div className="relative flex items-center text-white">
              <span className="z-10 bg-[#252c3a] pr-3">Sessions Today</span>
              <div className="absolute left-0 right-0 top-1/2 h-[2px] w-[66%] bg-white/40"></div>
              <button onClick={resetSessions}
                className="ml-auto z-10 bg-[#252c3a] pl-3 text-sm bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 flex items-center gap-1 mt-2">
                <i className="fa-solid fa-rotate text-xs"></i> Reset Sessions
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2 text-white">
              <span>Completed:</span>
              <span>{sessions.focus + sessions.short + sessions.long}</span>
            </div>
          </div>

          {/* Bottom Counters */}
          <div className="flex gap-3 mb-2 w-full overflow-hidden rounded-xl px-6">
            {["focus", "short", "long"].map((m) => (
              <div key={m}
                className="flex-1 h-[70px] rounded-xl overflow-hidden flex flex-col
                           bg-[#242b36] border border-[#3a4150]
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.6)]">
                <div className="text-lg font-semibold bg-[#383d49] text-white text-center py-1 border-b border-[#161c27]">
                  {MODES[m].label}
                </div>
                <div className="text-lg font-bold text-white text-center flex-1 flex items-center justify-center">
                  ×{sessions[m]}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}


