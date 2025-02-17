"use client"

import { TrendingUp } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



const chartConfig = {
    sessions: {
      label: "Study Sessions",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

export function StatsChart() {
    const [chartData, setChartData] = useState<{date: string; sessions: number}[]>([]);

    useEffect(() => {
    const fetchStudySessions = async () => {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 6); // Get 7 days including today

      const { data, error } = await supabase
        .from("study_sessions")
        .select("date")
        .gte("date", lastWeek.toLocaleDateString("en-CA"))
        .lte("date", today.toLocaleDateString("en-CA"));

      if (error) {
        console.error("Error fetching study sessions:", error);
        return;
      }

      // Process data to count sessions per day
      const sessionCounts = data.reduce<Record<string, number>>((acc, session) => {
        acc[session.date] = (acc[session.date] || 0) + 1;
        return acc;
      }, {});

      const timeCounts = data.reduce<Record<string, number>>((acc, session) => {
        acc[session.date] = (acc[session.date] || 0) + 1;
        return acc;
      }, {});

      // Format data for chart
      const formattedData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toLocaleDateString("en-CA");

        return {
          date: dateString,
          sessions: sessionCounts[dateString] || 0, // Default to 0 if no sessions
        };
      }).reverse(); // Reverse so earliest date appears first

      setChartData(formattedData);

      console.log("Formatted Data:", formattedData);
      console.table(formattedData);

      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    };

    fetchStudySessions();
  }, [chartData]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing study sessions for past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
        
        {chartData.length > 0 ? (
  <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
    <Area dataKey="sessions" type="monotone" fill="var(--color-desktop)" stroke="var(--color-desktop)" />
  </AreaChart>
) : (
  <p>Loading chart...</p>
)}

          
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
