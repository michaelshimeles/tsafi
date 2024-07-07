"use client"

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Separator className="w-10 h-10 rounded"/>
        )
    };

    return (
        <div>
            {theme === "dark" ? (
                <Button variant="ghost" className="hover:bg-inherit border-zinc-900 bg-[#0c0c0d]" size="icon" onClick={() => setTheme("light")}>
                    <Sun className="w-5 h-5" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            ) : (
                <Button variant="ghost" size="icon" className="hover:bg-inherit border-zinc-100 bg-inherit" onClick={() => setTheme("dark")}>
                    <Moon className="w-5 h-5" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            )}
        </div>
    );
}
