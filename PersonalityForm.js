import React from 'react'

const PersonalityForm = () => {
  return (
    <div className="w-full h-full bg-white px-4 py-10 mb-10   border-2 border-gray">
    <h1 className="text-5xl font-bold">Personality Type Details!</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">
      Please fill your Personality Type Details!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium">Personality</label>
        <div>
          <select  className="form-control  text-lg font-bold border border-gray-400 p-2 rounded-md  w-1/2 focus:outline-gray-500 focus:ring-gray-500 mt-3">
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