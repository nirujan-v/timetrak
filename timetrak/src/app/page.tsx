"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


export default function PomodoroTimer() {
  // State for the timer
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  
  const [isRunning, setIsRunning] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessions, setSessions] = useState<any[]>([]); // Store fetched sessions
  const [totalStudyTime, setTotalStudyTime] = useState(0); // Total study time for the selected day
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date

  

  // Format time (MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle start and pause functionality
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const logSessionToDatabase = async (studyTime: number) => {
    const date = new Date().toISOString().split("en-CA")[0]; // Get current date (YYYY-MM-DD)
    
    console.log(date);
    try {
      const { error } = await supabase
        .from("study_sessions")
        .insert([
          {
            date,            // Store the date
            study_time: studyTime, // Time spent studying for this session
          },
        ]);
  
      if (error) {
        console.error("Error saving study session:", error);
      } else {
        console.log("Study session logged successfully!");
        console.log("hello");
        
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const getSessionsForDay = async (selectedDate: string) => {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("date", selectedDate);

      if (error) {
        console.error("Error fetching sessions:", error);
        setSessions([]);
        setTotalStudyTime(0);
      } else {
        setSessions(data || []);
        const totalTime = (data || []).reduce((sum, session) => sum + session.study_time, 0);
        setTotalStudyTime(totalTime);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSessions([]);
      setTotalStudyTime(0);
    }
  };

  
  

  

  // Timer countdown logic
  useEffect(() => {
    document.title = `⏳ ${formatTime(timeLeft)} - Pomodoro Timer`
    getSessionsForDay(date);
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval
    } else if (timeLeft === 0 && isRunning) {
      setTimeLeft(30 * 60);
      setIsRunning(false);
      
      logSessionToDatabase(25);
    }
  }, [isRunning, timeLeft, date]);

  const setNewView = async () =>{

  };

  setNewView();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
        <p className="text-6xl font-mono mb-8">{formatTime(timeLeft)}</p>
        <div className="pb-10"><button
          onClick={toggleTimer}
          className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md ${
            isRunning ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button></div>
        
        
        <button
          onClick={() => setTimeLeft(5)}
          className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md 
          }`}
        >
          10 mins
        </button>

        


        

        <div className="mb-6">
        <label htmlFor="date" className="text-lg  font-medium mr-4">
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="bg-white text-black p-6 shadow-md rounded-lg">
        <h2 className="text-2xl text-black font-semibold mb-2">Stats for {date}</h2>
        <p className="text-lg">
          Total Sessions: <span className="font-bold">{sessions.length}</span>
        </p>
        <p className="text-lg">
          Total Study Time: <span className="font-bold">{totalStudyTime} minutes</span>
        </p>
      </div>
    

      


        
        
        
      </div>
    </div>
  );
}
