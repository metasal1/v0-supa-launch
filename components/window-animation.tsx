"use client"

import { motion } from "framer-motion"

export default function WindowAnimation() {
  return (
    <motion.div
      className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 mb-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      <h3 className="text-xl font-bold text-green-500 mb-4 text-center">Launch Window</h3>
      <div className="flex justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="bg-black/80 border border-green-500/50 rounded-lg p-6">
            <p className="text-6xl md:text-7xl font-bold text-white text-center">69</p>
          </div>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-1 bg-green-500"
            animate={{
              boxShadow: ["0 0 5px rgba(34,197,94,0.5)", "0 0 15px rgba(34,197,94,0.8)", "0 0 5px rgba(34,197,94,0.5)"],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </div>
      <p className="text-center text-gray-400 text-sm mt-4">Minutes to participate</p>
    </motion.div>
  )
}
