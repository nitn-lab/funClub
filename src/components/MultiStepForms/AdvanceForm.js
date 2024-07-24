import React, {useEffect} from 'react'

const AdvanceForm = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  return (
    <div className="w-full py-10">
    <h1 className="text-5xl font-bold text-white">Advance Details!</h1>
    <p className="font-medium text-lg text-gray-200 mt-4">
      Please fill your Advance Details!
    </p>
    <div className="mt-8 flex gap-8">
      <div className='w-1/2'>
        <label className="text-lg font-medium text-white">Ethnicity</label>
        <input
          className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
          placeholder="Enter Ethnicity"
        />
      </div>
      
      <div className="w-1/2 ">
        <label className="text-lg font-medium text-white">Excercise</label>
        <div>
          <select  className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
            <option value="male">Yes</option>
            <option value="female">No</option>
            
           </select>
          </div>
      </div>
      </div>
      <div className="mt-8 flex gap-8">
       <div className="w-1/2">
       <label className="text-lg font-medium text-white">Drinking</label>
        <div className=''>
          <select  className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
            <option value="male">Yes</option>
            <option value="female">No</option>
            
           </select>
          </div>
       </div>
          <div className=" w-1/2">
        <label className="text-lg font-medium text-white">Smoking</label>
        <div>
          <select  className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
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