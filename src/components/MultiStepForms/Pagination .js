import React from 'react';

const Pagination = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mt-4">
      <span className="w-max active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-3 rounded-xl  text-lg font-bold flex items-center justify-between gap-2 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light absolute bottom-0">{`${currentStep + 1} / ${totalSteps}`}</span>
    </div>
  );
};

export default Pagination;