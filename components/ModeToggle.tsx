"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()


    return (
        <div>
            {/* {theme === "dark" ?
                <Button size="icon" onClick={() => setTheme("light")}><Sun className="w-5 h-5" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                :
                <Button size="icon" onClick={() => setTheme("dark")} ><Moon className="w-5 h-5" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            } */}
        </div>
    )
}
