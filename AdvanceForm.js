import React, {useEffect} from 'react'

const AdvanceForm = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  return (
    <div className="w-full h-full bg-white px-4 py-10 mb-10   border-2 border-gray">
    <h1 className="text-5xl font-bold">Advance Details!</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">
      Please fill your Advance Details!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium">Ethnicity</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Enter Ethnicity"
        />
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Sexual Orientation</label>
        <div>
          <select  className="form-control  text-lg font-bold border border-gray-400 p-2 rounded-md  w-1/2 focus:outline-gray-500 focus:ring-gray-500 mt-3">
            <option value="male">Hetrosexual</option>
            <option value="female">Homosexual</option>
            <option value="female">Bisexual</option>
            <option value="female">Asexual</option>
            <option value="female">Pansexual</option>
            <option value="female">Aromantic</option>
           </select>
          </div>
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Excercise</label>
        <div>
          <select  className="form-control  text-lg font-bold border border-gray-400 p-2 rounded-md  w-1/2 focus:outline-gray-500 focus:ring-gray-500 mt-3">
            <option value="male">Yes</option>
            <option value="female">No</option>
            
           </select>
          </div>
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Drinking</label>
        <div>
          <select  className="form-control  text-lg font-bold border border-gray-400 p-2 rounded-md  w-1/2 focus:outline-gray-500 focus:ring-gray-500 mt-3">
            <option value="male">Yes</option>
            <option value="female">No</option>
            
           </select>
          </div>
      </div>
      <div className="mt-8 ">
        <label className="text-lg font-medium">Smoking</label>
        <div>
          <select  className="form-control  text-lg font-bold border border-gray-400 p-2 rounded-md  w-1/2 focus:outline-gray-500 focus:ring-gray-500 mt-3">
            <option value="male">Yes</option>
            <option value="female">No</option>
            
           </select>
          </div>
      </div>
      
    </div>
  </div>
  )
}

export default AdvanceForm