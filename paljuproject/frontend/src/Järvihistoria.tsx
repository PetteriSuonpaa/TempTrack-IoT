import './lib/App.css'
import './index.css'

import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { ChevronLeftIcon, CircleCheck } from 'lucide-react'

// Define chart colors
const chartConfig: ChartConfig = {
  desktop: {
    label: "Ylä-sensori",
    color: "var(--chart-1)",
  },
}

const ranges = [
  { label: "Viimeiset 5 minuuttia", minutes: 5 },
  { label: "Viimeiset 20 minuuttia", minutes: 20 },
  { label: "Viimeiset 30 minuuttia", minutes: 30 },
  { label: "Viimeinen 1 tunti", minutes: 60 },
  { label: "Viimeiset 2 tuntia", minutes: 120 },
  { label: "Viimeiset 3 tuntia", minutes: 180 },
  { label: "Viimeiset 4 tuntia", minutes: 240 },
]

function Järvihistoria() {
  const navigate = useNavigate()
  const [range, setRange] = useState(ranges[3]) // default 1 tunti
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://192.168.1.3:5000/api/history?range=${range.minutes}`)
        const data = await res.json()

        const formatted = data.map((entry: { timestamp: number; jarvi_temperature: any }) => ({
          time: new Date(entry.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: entry.jarvi_temperature,
        }))

        setChartData(formatted)
      } catch (err) {
        console.error("Failed to fetch temperature history:", err)
      }
    }

    fetchData()
  }, [range])

  return (
    <div className="flex flex-col items-start p-4 min-h-screen">
      <Button
        variant="default"
        className="!bg-[#DADADA] dark:!bg-[#181818]"
        onClick={() => navigate("/")}
      >
        <ChevronLeftIcon />
        Takaisin paneeliin
      </Button>

      <div className='mt-4 w-full'>
        <Card>
          <CardHeader>
            <div className='text-3xl'>
              <CardTitle>Järvi-lämpötila historia</CardTitle>
            </div>
            <CardDescription>{range.label}</CardDescription>
          </CardHeader>

          <CardContent className="min-w-[340px] md:min-w-[540px] lg:min-w-[640px] w-full">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={chartData}
                margin={{ left: 10, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}°C`}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="temperature"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-desktop)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex items-start gap-4">
            <div className="text-xl font-medium">Aikaväli</div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-[#DADADA] dark:!bg-[#181818]">
                    {range.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-[#DADADA] dark:!bg-[#181818] dropdown-scroll">
                    <ul className="grid w-[200px] gap-4 p-2">
                      {ranges.map(item => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <button
                              className={`w-full text-left !bg-[#DADADA] dark:!bg-[#181818] flex items-left gap-2 px-2 py-1 rounded ${
                                range.label === item.label ? "outline outline-2 outline-offset-1" : ""
                              }`}
                              style={range.label === item.label ? { outlineColor: "var(--chart-1)" } : {}}
                              onClick={() => setRange(item)}
                            >
                              {range.label === item.label && (
                                <CircleCheck
                                  aria-label="Selected"
                                  stroke="var(--chart-1)"
                                  className="flex-shrink-0 w-5 h-5"
                                />
                              )}
                              <span className="align-middle">{item.label}</span>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Järvihistoria
