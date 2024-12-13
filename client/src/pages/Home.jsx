'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Plus, Home, User, ListTodo, Menu, X, Briefcase, BarChart2, Folder } from 'lucide-react'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [goals, setGoals] = useState([
    { id: 1, text: 'Have a cuppa', completed: false },
    { id: 2, text: 'Queue politely', completed: false },
  ])
  const [newGoal, setNewGoal] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal.trim(), completed: false }])
      setNewGoal('')
    }
  }

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  return (
    <div className="flex min-h-screen bg-[#2596be] text-[#2d3748]">
      {isSidebarOpen && (
        <motion.aside 
          className="fixed top-0 left-0 w-64 h-full bg-[#157fa5] p-6 shadow-lg z-50"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-white">Workspace Menu</h2>
            <X className="h-6 w-6 text-white cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
          </div>
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="/" className="flex items-center text-white hover:text-gray-300 transition-colors">
                  <Home className="mr-2 h-5 w-5" /> Home
                </a>
              </li>
              <li>
                <a href="/profile" className="flex items-center text-white hover:text-gray-300 transition-colors">
                  <User className="mr-2 h-5 w-5" /> Profile
                </a>
              </li>
              <li>
                <a href="/tasks" className="flex items-center text-white hover:text-gray-300 transition-colors">
                  <ListTodo className="mr-2 h-5 w-5" /> Tasks
                </a>
              </li>
              <li>
                <a href="/projects" className="flex items-center text-white hover:text-gray-300 transition-colors">
                  <Briefcase className="mr-2 h-5 w-5" /> Projects
                </a>
              </li>
            </ul>
          </nav>
        </motion.aside>
      )}
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            className="bg-[#157fa5] text-white hover:bg-[#136d8c]"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-lg text-gray-500">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#2d3748]">Today's Goals</h2>
            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`goal-${goal.id}`} 
                    checked={goal.completed}
                    onCheckedChange={() => toggleGoal(goal.id)}
                  />
                  <label 
                    htmlFor={`goal-${goal.id}`}
                    className={`flex-1 ${goal.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    {goal.text}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex mt-6">
              <Input 
                type="text" 
                placeholder="Add a new goal" 
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button onClick={addGoal} className="bg-[#d4b78f] text-[#2d3748] hover:bg-[#c4a77f]">
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#2d3748]">Workspace Overview</h2>
            <ul className="space-y-2 text-gray-700">
              <li><BarChart2 className="inline h-5 w-5 mr-2" /> Task Completion: 75%</li>
              <li><Folder className="inline h-5 w-5 mr-2" /> Active Projects: 3</li>
              <li><Briefcase className="inline h-5 w-5 mr-2" /> Upcoming Deadlines: 2</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json"
              style={{ height: '300px', width: '300px' }}
            />
          </motion.div>
        </div>
      </main>

      <Button 
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-[#d4b78f] text-[#2d3748] hover:bg-[#c4a77f] shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
