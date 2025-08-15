import './lib/App.css';
import './index.css';

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import { Box, Box2, Box3 } from "./Box.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [ylaTemp, setYlaTemp] = useState<number | null>(null);
  const [alaTemp, setAlaTemp] = useState<number | null>(null);
  const [jarviTemp, setJarviTemp] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null); // timestamp from backend

  useEffect(() => {
    const fetchTemperatures = async () => {
      try {
        const res = await fetch("http://192.168.1.3:5000/api/current");
        if (!res.ok) throw new Error("No data");
        const data = await res.json();
        setYlaTemp(data.yla_temperature ?? null);
        setAlaTemp(data.ala_temperature ?? null);
        setJarviTemp(data.jarvi_temperature ?? null);

        // Set timestamp from backend (converted from seconds to milliseconds)
        setLastUpdate(data.timestamp ? data.timestamp * 1000 : null);
      } catch (e) {
        console.error("Error fetching temperatures:", e);
        setYlaTemp(null);
        setAlaTemp(null);
        setJarviTemp(null);
        setLastUpdate(null);
      }
    };


    fetchTemperatures();
    const interval = setInterval(fetchTemperatures, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const isStale = (lastUpdate && Date.now() - lastUpdate > 6 * 60 * 1000); // > 5 minute old

  return (
    <>
      {/* Top-right toggle */}
      <div className="grid grid-flow-col justify-items-end-safe pt-8 pe-4">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
        </ThemeProvider>
      </div>

      {/* Header */}
      <div
        className="
          grid grid-flow-col justify-items-center-safe py-8
          text-4xl xss:text-5xl md:text-7xl lg:text-8xl
          font-extrabold tracking-tight 
          grid grid-flow-col justify-items-center 
        "
      >
        Lämpötilapaneeli
      </div>

      {/* Main Box */}
      <Box title="Paljunlämpötilat" className="grid grid-flow-col justify-items-center py-10 ">
        {/* Box2 for Ylä-Lämpötila */}
        <Box2 title="Ylä-Lämpötila" className="grid grid-cols-1 ">
          <div className="absolute bottom-8 left-4">
            {ylaTemp !== null ? (
              <>
                <p className={`text-3xl ${isStale ? "text-yellow-500" : ""}`}>
                  {ylaTemp.toFixed(1)} °C
                </p>
                {isStale && (
                  <p className="text-xs text-yellow-500">Tieto voi olla vanhentunut</p>
                )}
              </>
            ) : (
              <p className="text-sm xss:text-sm md:text-base lg:text-2xl">lämpötilaa ei havaittu</p>
            )}
          </div>
          <Button
            variant="default"
            className="absolute bottom-8 right-4 !bg-[#DADADA] dark:!bg-[#181818]"
            onClick={() => navigate("/Ylähistoria")}
          >
            Näytä historia
          </Button>
        </Box2>

        {/* Box2 for Ala-Lämpötila */}
        <Box2 title="Ala-Lämpötila" className="grid grid-cols-1 ">
          <div className="absolute bottom-8 left-4">
            {alaTemp !== null ? (
              <>
                <p className={`text-3xl ${isStale ? "text-yellow-500" : ""}`}>
                  {alaTemp.toFixed(1)} °C
                </p>
                {isStale && (
                  <p className="text-xs text-yellow-500">Tieto voi olla vanhentunut</p>
                )}
              </>
            ) : (
              <p className="text-sm xss:text-sm md:text-base lg:text-2xl">lämpötilaa ei havaittu</p>
            )}
          </div>
          <Button
            variant="default"
            className="absolute bottom-8 right-4 !bg-[#DADADA] dark:!bg-[#181818]"
            onClick={() => navigate("/Alahistoria")}
          >
            Näytä historia
          </Button>
        </Box2>
      </Box>

      {/* Järvi Box */}
      <Box3 title="Järvi" className="grid grid-flow-col justify-items-center-safe py-8 mt-10">
        {/* Box2 for Järvi-lämpötila */}
        <Box2 title="Lämpötila" className="grid grid-cols-1">
          <div className="absolute bottom-8 left-4">
            {jarviTemp !== null ? (
              <>
                <p className={`text-3xl ${isStale ? "text-yellow-500" : ""}`}>
                  {jarviTemp.toFixed(1)} °C
                </p>
                {isStale && (
                  <p className="text-xs text-yellow-500">Tieto voi olla vanhentunut</p>
                )}
              </>
            ) : (
              <p className="text-sm xss:text-sm md:text-base lg:text-2xl">lämpötilaa ei havaittu</p>
            )}
          </div>
          <Button
            variant="default"
            className="absolute bottom-8 right-4 !bg-[#DADADA] dark:!bg-[#181818]"
            onClick={() => navigate("/Järvihistoria")}
          >
            Näytä historia
          </Button>
        </Box2>
      </Box3>
    </>
  );
}

export default Home;

