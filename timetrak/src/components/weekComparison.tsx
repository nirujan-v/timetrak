{/*}

import { useState, useEffect, SetStateAction } from "react";
import { supabase } from "@/lib/supabase";

export default function WeekComparison({ isOpen, onClose }) {
  const [week1, setWeek1] = useState(getCurrentWeek());
  const [week2, setWeek2] = useState(getLastWeek());
  const [week1Data, setWeek1Data] = useState(null);
  const [week2Data, setWeek2Data] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchWeekData(week1, setWeek1Data);
      fetchWeekData(week2, setWeek2Data);
    }
  }, [isOpen, week1, week2]);

  async function fetchWeekData(week: { start: any; end: any; }, setData: { (value: SetStateAction<null>): void; (value: SetStateAction<null>): void; (arg0: { date: any; study_time: any; }[]): void; }) {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("date, study_time")
        .gte("date", week.start)
        .lte("date", week.end);

      if (error) {
        console.error("Error fetching week data:", error);
      } else {
        setData(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  function getCurrentWeek() {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay()); // Get start of the week (Sunday)
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Get end of the week (Saturday)

    return { start: start.toISOString().split("T")[0], end: end.toISOString().split("T")[0] };
  }

  function getLastWeek() {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() - 7); // Last week's start
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Last week's end

    return { start: start.toISOString().split("T")[0], end: end.toISOString().split("T")[0] };
  }

  function getTotalStudyTime(sessions: any[] | null) {
    return sessions ? sessions.reduce((sum: any, session: { study_time: any; }) => sum + session.study_time, 0) : 0;
  }

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Compare Weekly Study Time</h2>
        
        <label className="block mb-2">Select Week 1:</label>
        <input
          type="week"
          value={week1.start}
          onChange={(e) => setWeek1(getWeekRange(e.target.value))}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Select Week 2:</label>
        <input
          type="week"
          value={week2.start}
          onChange={(e) => setWeek2(getWeekRange(e.target.value))}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="mb-4">
          <p>Week 1 Total Study Time: <strong>{getTotalStudyTime(week1Data)} minutes</strong></p>
          <p>Week 2 Total Study Time: <strong>{getTotalStudyTime(week2Data)} minutes</strong></p>
        </div>

        <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  ) : null;
}

function getWeekRange(weekValue: string) {
  const [year, week] = weekValue.split("-W");
  const start = new Date(year, 0, (week - 1) * 7 + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start: start.toISOString().split("T")[0], end: end.toISOString().split("T")[0] };
}
*/}