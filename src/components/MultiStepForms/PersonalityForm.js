import React from 'react'

const PersonalityForm = () => {
  return (
    <div className="w-full py-10 ">
    <h1 className="text-5xl font-bold text-white">Personality Type Details!</h1>
    <p className="font-medium text-lg text-gray-200 mt-4">
      Please fill your Personality Type Details!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium text-white">Personality</label>
        <div>
          <select  className="w-1/2 border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
          <option value="">Select your personality</option>
            <option value="male">Introvert</option>
            <option value="female">Extrovert</option>
            <option value="other">Ambivert</option>
           </select>
          </div>
      </div>
    </div>
  </div>
  )
}

export default PersonalityForm