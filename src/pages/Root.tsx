import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header.tsx"
import Footer from "../components/Footer.tsx"

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root
