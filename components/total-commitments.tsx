"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users } from "lucide-react"

export default function TotalCommitments() {
  // Simulated total commitments data
  const [totalCommitments, setTotalCommitments] = useState({
    sol: 1250.75,
    participants: 328,
  })

  // Simulate increasing commitments
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCommitments((prev) => ({
        sol: prev.sol + Math.random() * 0.5,
        participants: prev.participants + (Math.random() > 0.7 ? 1 : 0),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 mb-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="text-xl font-bold text-green-500 mb-4 text-center">Total Commitments</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <motion.p
            className="text-3xl md:text-4xl font-bold text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {totalCommitments.sol.toFixed(2)} <span className="text-green-500">SOL</span>
          </motion.p>
          <p className="text-gray-400 text-sm mt-1">Total Raised</p>
        </div>
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          >
            <Users className="w-5 h-5 text-green-500" />
            <p className="text-3xl md:text-4xl font-bold text-white">{totalCommitments.participants}</p>
          </motion.div>
          <p className="text-gray-400 text-sm mt-1">Participants</p>
        </div>
      </div>
    </motion.div>
  )
}
