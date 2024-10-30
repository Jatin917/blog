
import Blog from './Blog'
import Sidebar from '../comonents/Sidebar'

const Home = () => {
  return (
    <div className='w-full flex mt-[100px] px-[100px] gap-[50px] z-0'>
        <Blog />
        <Sidebar />
    </div>
  )
}

export default Home