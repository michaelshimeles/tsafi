"use client"
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from 'framer-motion';
import { AnimatedGradientTextComponent } from './AnimatedGradientComponent';
import { BorderBeam } from '../magicui/border-beam';

export default function HeroSection() {
    return (
        <div className='flex flex-col items-center justify-center mt-[1.5rem] p-3'>
            <div className="my-5">
                <AnimatedGradientTextComponent />
            </div>
            <h1 className="scroll-m-20 text-4xl sm:text-4xl md:text-6xl font-semibold tracking-tight lg:text-6xl text-center max-w-[1000px]">
                SupaNext CMS
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
                An opensource blog CMS built using Nextjs, Supabase & TipTap
            </p>
            <div className="flex gap-3">
                <Link href="/cms" className="mt-5">
                    <Button className="animate-buttonheartbeat rounded-md bg-blue-600 text-sm font-semibold text-white">Dashboard</Button>
                </Link>
                <Link href="/methodology" className="mt-5">
                    <Button variant="ghost" className="flex gap-1 text-blue-600 hover:text-blue-600 hover:bg-blue-100">YouTube Video<ArrowRight className='w-4 h-4' /></Button>
                </Link>
            </div>
            <div>
                <div className="relative flex max-w-6xl justify-center overflow-hidden">
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 3 }}
                        className="relative flex max-w-6xl justify-center overflow-hidden"
                    >
                        <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
                            <div className="relative rounded-xl">
                                <img
                                    src="/dash-light.png"
                                    alt="Hero Image"
                                    className="block w-[900px] rounded-[inherit] border object-contain shadow-lg dark:hidden"
                                />
                                <BorderBeam size={250} duration={12} delay={9} />
                            </div>
                        </div>
                    </motion.div>
                    {/* <div className="from-1% absolute inset-0 bg-gradient-to-t from-white to-35%" /> */}
                </div>
            </div>

        </div>
    )
}
