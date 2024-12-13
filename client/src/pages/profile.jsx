import { motion } from 'framer-motion'
import { User, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 font-serif">Your Jolly Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <User className="mr-2 h-5 w-5 text-[#4682b4]" />
          <span>Sir Reginald Fancypants III</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 h-5 w-5 text-[#4682b4]" />
          <span>reginald@fancypants.co.uk</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-2 h-5 w-5 text-[#4682b4]" />
          <span>+44 1234 567890</span>
        </div>
      </div>
      <Button className="mt-6 bg-[#d4b78f] text-[#2d3748] hover:bg-[#c4a77f]">
        Update Profile
      </Button>
    </motion.div>
  )
}

