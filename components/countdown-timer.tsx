"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 69,
    seconds: 0,
    totalSeconds: 69 * 60,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTotalSeconds = prev.totalSeconds - 1

        if (newTotalSeconds <= 0) {
          clearInterval(timer)
          return { minutes: 0, seconds: 0, totalSeconds: 0 }
        }

        const minutes = Math.floor(newTotalSeconds / 60)
        const seconds = newTotalSeconds % 60

        return { minutes, seconds, totalSeconds: newTotalSeconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 mb-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      <h3 className="text-xl font-bold text-green-500 mb-4 text-center">Launch Ends In</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <motion.div
            className="relative"
            animate={{
              scale: timeRemaining.totalSeconds < 300 ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: timeRemaining.totalSeconds < 300 ? 0.5 : 0,
              repeat: timeRemaining.totalSeconds < 300 ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
          >
            <div className="bg-black/80 border border-green-500/50 rounded-lg p-3">
              <p className="text-4xl md:text-5xl font-bold text-white">
                {String(timeRemaining.minutes).padStart(2, "0")}
              </p>
            </div>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-1 bg-green-500"
              initial={{ width: "100%" }}
              animate={{
                width: `${(timeRemaining.minutes / 69) * 100}%`,
                backgroundColor: timeRemaining.minutes < 5 ? "#ef4444" : "#22c55e",
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <p className="text-gray-400 text-sm mt-2">Minutes</p>
        </div>
        <div className="text-center">
          <motion.div
            className="relative"
            animate={{
              scale: timeRemaining.totalSeconds < 300 ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: timeRemaining.totalSeconds < 300 ? 0.5 : 0,
              repeat: timeRemaining.totalSeconds < 300 ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
          >
            <div className="bg-black/80 border border-green-500/50 rounded-lg p-3">
              <p className="text-4xl md:text-5xl font-bold text-white">
                {String(timeRemaining.seconds).padStart(2, "0")}
              </p>
            </div>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-1 bg-green-500"
              initial={{ width: "100%" }}
              animate={{
                width: `${(timeRemaining.seconds / 60) * 100}%`,
                backgroundColor: timeRemaining.totalSeconds < 60 ? "#ef4444" : "#22c55e",
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <p className="text-gray-400 text-sm mt-2">Seconds</p>
        </div>
      </div>
      {timeRemaining.totalSeconds < 300 && (
        <motion.p
          className="text-center text-red-500 mt-4 font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          Hurry! Launch ending soon
        </motion.p>
      )}
    </motion.div>
  )
}
