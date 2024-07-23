import React from 'react'

const LookingForForm = () => {
  return (
    <div className="w-full h-full bg-white px-10 py-20  border-2 border-gray">
    <h1 className="text-5xl font-bold">Looking For!</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">
      Please fill your Looking For!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium">Select</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter Ethicity"
        />
      </div>
    </div>
  </div>
  )
}

export default LookingForForm