import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const SelectPrompt = ({ onInputChange, onSkip }) => {
  const [formData, setFormData] = useState({});
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [stories, setStories] = useState({});
  const [charCounts, setCharCounts] = useState({});
  const [submittedPrompts, setSubmittedPrompts] = useState([]);
  const [promptOptions, setPromptOptions] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken')

  // Fetch prompts from API
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get("http://3.110.156.153:5000/api/v1/getPromptQues", {
          headers: { Authorization: `${token}` },
        });
        console.log(response)
        setPromptOptions(response.data); 
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    };

    fetchPrompts();
  }, []);

  useEffect(() => {
    onInputChange(formData); // Send form data to parent
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

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold xs:text-3xl">Prompts!</h1>
        <button
          className="w-max active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-2 rounded-md bg-primary-light dark:bg-primary-dark text-lg font-bold text-primary-dark dark:text-primary-light"
          onClick={onSkip}
        >
          Skip
        </button>
      </div>
      <p className="font-medium text-lg mt-2">Please select a prompt!</p>
      <div className="scrollable-div mt-3 h-72 md:h-64 overflow-auto">
        <div className="w-full">
          {submittedPrompts.length < 3 && (
            <Dropdown
              label="Prompts"
              options={promptOptions} 
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