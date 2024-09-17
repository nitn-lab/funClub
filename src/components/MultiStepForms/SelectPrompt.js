import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import Dropdown from "./Dropdown";

const SelectPrompt = ({ onInputChange }) => {
  const [formData, setFormData] = useState({});
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [stories, setStories] = useState({});
  const [charCounts, setCharCounts] = useState({});
  const [submittedPrompts, setSubmittedPrompts] = useState([]);

  useEffect(() => {
    onInputChange(formData);
  }, [formData]);

  const handleDropdownChange = (name, value) => {
    if (selectedPrompts.length < 3 && !selectedPrompts.includes(value)) {
      setSelectedPrompts([...selectedPrompts, value]);
    }
  };

  const handleStoryChange = (prompt, value) => {
    const charCount = value.length;
    if (charCount <= 150) {
      setStories((prevStories) => ({
        ...prevStories,
        [prompt]: value,
      }));
      setCharCounts((prevCounts) => ({
        ...prevCounts,
        [prompt]: charCount,
      }));
    }
  };

  const handleSubmit = (prompt) => {
    setFormData((prevData) => ({
      ...prevData,
      [prompt]: stories[prompt],
    }));
    setSubmittedPrompts((prevPrompts) => [...prevPrompts, prompt]);
  };

  const navigate = useNavigate()

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark">
       <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold xs:text-3xl">Prompts!</h1>
        <button
          className="w-max active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-3 rounded-xl bg-primary-light dark:bg-primary-dark text-lg font-bold dark:text-primary-light text-primary-dark"
          onClick={() => navigate('/Dashboard')}
        >
          Skip
        </button>
      </div>
      <p className="font-medium text-lg mt-4 md:mt-2">
        Please select a prompt!
      </p>
      <div className=" scrollable-div mt-2  h-72 md:h-64 overflow-auto">
        <div className="w-full">
          {submittedPrompts.length < 3 && (
            <Dropdown
              label="Prompts"
              options={[
                "My weird but true story is...",
                "The first item on my bucket list is...",
                "The hottest thing you can do is...",
                "My hidden talent is...",
                "A surprising thing about me is...",
                "The key to my heart is...",
                "My favorite playlist is called...",
                "My parents will like you if...",
                "I can beat you in a game of...",
                "People would describe me as...",
                "Perks of dating me...",
                "I want someone who...",
                "My weakness is...",
                "Two truths and a lie..."
              ]}
              onChange={(selectedOption) =>
                handleDropdownChange("prompt", selectedOption)
              }
            />
          )}
        </div>
        {selectedPrompts.map((prompt, index) => (
          <div key={index} className="mt-2.5">
            <h2 className="font-bold text-lg">{prompt}</h2>
            {submittedPrompts.includes(prompt) ? (
              <div className="mt-1">
                <p>{formData[prompt]}</p>
              </div>
            ) : (
              <>
                <div className="relative">
                  <textarea
                    className="w-full p-2 mt-2 relative text-primary-light rounded-lg border-2 border-black dark:border-none dark:outline-none bg-primary-dark"
                    rows="3"
                    value={stories[prompt] || ""}
                    onChange={(e) => handleStoryChange(prompt, e.target.value)}
                  ></textarea>
                  <div className="absolute bottom-2 right-2 dark:text-primary-dark text-primary-light text-sm">
                    {charCounts[prompt] || 0}/150
                  </div>
                </div>
                <button
                  className="mt-2 p-2 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light rounded-lg font-semibold float-right"
                  onClick={() => handleSubmit(prompt)}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPrompt;