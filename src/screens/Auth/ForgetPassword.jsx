import React from 'react'
import logo from '../../assets/images/FUNCLUB logo.png'
import ForgetPasswordForm from '../../components/ForgetPasswordForm'


const ForgetPassword = () => {
  return (
    <div className="flex w-full">
      <div className=" flex py-20 justify-center w-1/2 md:w-full" style={{height: "100vh"}}>
        <ForgetPasswordForm />
      </div>
      <div className="md:hidden relative flex  w-1/2 items-center justify-center  bg-gradient-to-tr from-violet-500 to-pink-500">
        <div className="flex w-full h-1/2 bg-white/10 backdrop-blur-lg rounded-full items-center justify-center">
          <img src={logo} height={250} className="w-64 lg:w-52"/>
          <div>
          <h1 className="text-5xl font-bold">FUN CLUB</h1>
          <h3 className='text-xl font-semibold mt-2.5 text-white text-center italic'>Make Friends, Have Fun</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;