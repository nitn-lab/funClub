import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

const SelectPrompt = ({ onInputChange }) => {
  const [formData, setFormData] = useState({});
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [stories, setStories] = useState({});
  const [charCounts, setCharCounts] = useState({});
  const [submittedPrompts, setSubmittedPrompts] = useState([]);

  useEffect(() => {
    onInputChange(formData);
  }, [formData, onInputChange]);

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
    <div className="w-full py-5 text-white">
      <h1 className="text-4xl font-bold xs:text-3xl">Prompts!</h1>
      <p className="font-medium text-lg text-gray-200 mt-4 md:mt-2">
        Please select a prompt!
      </p>
      <div className="mt-2  h-72 md:h-64 overflow-auto">
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
              onSelect={(selectedOption) =>
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
                    className="w-full p-2 mt-2 text-black relative rounded-lg border-none outline-none bg-white"
                    rows="3"
                    value={stories[prompt] || ""}
                    onChange={(e) => handleStoryChange(prompt, e.target.value)}
                  ></textarea>
                  <div className="absolute bottom-2 right-2 text-black text-sm">
                    {charCounts[prompt] || 0}/150
                  </div>
                </div>
                <button
                  className="mt-2 p-2 bg-white text-black rounded-lg font-semibold float-right"
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