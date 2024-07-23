import React from 'react'

const BasicDetailsForm = () => {
  return (
    <div className="w-full h-full bg-white px-10 py-20  border-2 border-gray">
    <h1 className="text-5xl font-bold">Basic Details!</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">
      Please fill your Basic Details!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium">Height</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your height"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Religion</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your religion"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Zodiac</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your zodiac"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Qualification</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your qualification"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">School</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your school"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">College</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your college"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Job Title</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your job title"
        //   type="password"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Organisation Url</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter your organization url"
        //   type="password"
        />
      </div>
    </div>
  </div>
  )
}

export default BasicDetailsForm