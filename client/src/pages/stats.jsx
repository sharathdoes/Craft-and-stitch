import { motion } from 'framer-motion'
import { Coffee, Cookie, Users } from 'lucide-react'

export function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 font-serif">Cracking Stats</h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <Coffee className="mr-2 h-5 w-5 text-[#8b4513]" />
          <span>Cups of Tea: 1,358</span>
        </li>
        <li className="flex items-center">
          <Cookie className="mr-2 h-5 w-5 text-[#d2691e]" />
          <span>Biscuits Dunked: 2,716</span>
        </li>
        <li className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-[#4682b4]" />
          <span>Queues Joined: 587</span>
        </li>
      </ul>
    </motion.div>
  )
}

