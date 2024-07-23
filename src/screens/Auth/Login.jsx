import React from 'react'
import Form from '../../components/Form'
import logo from '../../assets/images/FUNCLUB logo.png'
const Login = () => {
  return (
    <div className="flex w-full ">
      <div className="w-full flex items-center justify-center lg:w-1/2" style={{height: "100vh"}}>
        <Form />
      </div>
      <div className="hidden relative  lg:flex  w-1/2 items-center justify-center  bg-gradient-to-tr from-violet-500 to-pink-500">
        {/* <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"> */}
        {/* <img src={logo} width={250} height={250} />
        <h1 className="text-5xl font-semibold">Fan Club</h1> */}
        {/* </div> */}
        <div className=" lg:flex w-full h-1/2 bg-white/10 backdrop-blur-lg rounded-full items-center justify-center">
        <img src={logo} width={250} height={250} />
        <h1 className="text-5xl font-bold">FUN CLUB</h1>
        </div>
        {/* <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/> */}

      </div>
    </div>
  )
}

export default Login