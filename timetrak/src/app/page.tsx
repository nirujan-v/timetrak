"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


export default function PomodoroTimer() {
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Current time left on timer
  const [sessionTime, setSessionTime] = useState(25); // Current time left on timer
  
  const [isRunning, setIsRunning] = useState(false); //check if timer is on
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessions, setSessions] = useState<any[]>([]); // Store fetched sessions
  const [totalStudyTime, setTotalStudyTime] = useState(0); // Total study time for the selected day
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA")); // Default to today's date
  


  const playSound = () => {
    const audio = new Audio("/jingle.wav"); // play sound when triggered
    audio.play();
  };
  

  // Format time (MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle start and pause functionality
  const toggleTimes = (time: number) => {
    
    setTimeLeft(time * 60);
    setSessionTime(time);
  };


  //log time to supabase database
  const logSessionToDatabase = async (studyTime: number) => {
    const date = new Date().toLocaleDateString("en-CA"); // Get current date (YYYY-MM-DD)
    
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
        
        
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };


  //display current # of sessions for selected day
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
        //get all sessions and sum up each of their study times
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

    //set tab title to current time remaining
    document.title = `timeTrak`

    //Update sessions for selected day
    getSessionsForDay(date);

    //update timer
    if (isRunning && timeLeft > 0) {
      document.title = `⏳ ${formatTime(timeLeft)} - Pomodoro Timer`
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval
    } else if (timeLeft === 0 && isRunning) { //if timer hits 0, reset timer and log to database
      logSessionToDatabase(sessionTime);
      setTimeLeft(30 * 60);
      setIsRunning(false);
      playSound();
      
      
      
    }
  }, [isRunning, timeLeft, date, sessionTime]);

  

  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Pomodoro Timer</h1>
        <p className="text-6xl text-white font-mono mb-8">{formatTime(timeLeft)}</p>
        <div className="pb-10"><button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md ${
            isRunning ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button></div>
        

        <button
          onClick={() => toggleTimes(1)}
          className={`m-6 px-6 py-2 bg-white text-black rounded-lg font-semibold shadow-md 
          }`}
        >
          20 mins
        </button>

        <button
          onClick={() => toggleTimes(4)}
          className={`m-6 px-6 py-2 bg-white text-black rounded-lg font-semibold shadow-md 
          }`}
        >
          30 mins
        </button>

        <button 
          onClick={() => toggleTimes(5)}
          className={`m-6 px-6 py-2 bg-white text-black rounded-lg font-semibold shadow-md 
          }`}
        >
          60 mins
        </button>

 
        <div className="mb-6">
        <label htmlFor="date" className="text-lg text-white font-medium mr-4">
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
