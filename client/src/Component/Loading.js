import React from 'react';

function Loading() {
  return (
    <button type="button" className="grid place-content-center h-screen w-screen bg-indigo-500 ..." disabled>
        <svg className="w-5 h-5 text-white animate-spin" fill="none"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        </svg>
        Processing...
    </button>
  );
}

export default Loading;