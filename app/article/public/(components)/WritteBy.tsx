"use client"
import { BorderBeam } from '@/components/magicui/border-beam'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

export default function WritteBy() {
  return (
    <Link href='https://tsafi.xyz' target='_blank'>
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { duration: 1 },
        }}
        className="w-[225px] fixed bg-white dark:bg-black dark:bg-opacity-45  bottom-5 right-5 text-sm p-3 rounded-full border">
        <p className='text-center '>Written on <span className='font-semibold'>tsafi</span></p>
        <BorderBeam size={80} duration={5} delay={9} />
      </motion.div>
    </Link>)
}
