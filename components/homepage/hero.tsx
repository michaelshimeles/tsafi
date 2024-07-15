"use client"
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from '../magicui/border-beam';
import { Button } from "../ui/button";

export default function HeroSection() {
    return (
        <div className='flex flex-col items-center justify-center mt-[7rem] mb-[3rem] p-3'>
            <h1 className="scroll-m-20 text-3xl sm:text-3xl md:text-5xl font-semibold tracking-tight lg:text-5xl text-center max-w-[550px]">
                Launch your blog with tsafi in just a few clicks
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg text-sm text-center mt-2 dark:text-gray-400">
                An opensource blog CMS built using Nextjs, Supabase & TipTap
            </p>
            <div className="flex gap-3">
                <Link href="/cms" className="mt-5">
                    <Button size="sm" className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-400 text-sm font-semibold text-white">Dashboard</Button>
                </Link>
                <Link href="https://www.youtube.com/watch?v=rUD3OYo6ziM" target='_blank' className="mt-5">
                    <Button size="sm" variant="ghost" className="flex gap-1 text-blue-600 hover:text-blue-600 hover:bg-blue-100">YouTube Video<ArrowRight className='w-4 h-4' /></Button>
                </Link>
            </div>
            <div>
                <div className="relative flex max-w-4xl justify-center overflow-hidden">
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 3 }}
                        className="relative flex max-w-4xl justify-center overflow-hidden"
                    >
                        <div className="relative flex max-w-4xl justify-center overflow-hidden mt-7">
                            <div className="relative rounded-xl">
                                <img
                                    src="/home.png"
                                    alt="Hero Image"
                                    className="block dark:hidden w-[1400px] rounded-[inherit] border object-contain shadow-lg"
                                />
                                <img
                                    src="/dash-dark.png"
                                    alt="Hero Image"
                                    className="hidden dark:block w-[1400px] rounded-[inherit] border object-contain shadow-lg"
                                />
                                <BorderBeam size={250} duration={12} delay={9} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}
