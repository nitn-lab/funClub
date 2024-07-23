import React from 'react'

const InterestForm = () => {
  return (
    <div className="w-full h-full bg-white px-10 py-20  border-2 border-gray">
    <h1 className="text-5xl font-bold">Interest Details!</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">
      Please fill your Interest Details!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium">Ethicity</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter Ethicity"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Sexual Orientation</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your sexual orientation"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Excercise</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="yes / no"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Drinking</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="yes / no"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Smoking</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="yes / no"
        //   type="password"
        />
      </div>
    </div>
  </div>
  )
}

export default InterestForm