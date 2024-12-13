import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png"

function Header() {
    const navigate = useNavigate()

  return (
    <div className="w-full justify-between flex items-center my-4 px-4 lg:px-2">
    <img src={Logo} alt="Logo" className='w-12 rounded-md'/>
    <div className="flex flex-row gap-2 items-center">
      <Button
        variant="outline"
        size="landing"
        className="!h-full"
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
      <Button
        onClick={() => navigate('/register')}
        className="!h-full"
        size="landing"
      >
        Signup
      </Button>
    </div>
  </div>
  )
}

export default Header