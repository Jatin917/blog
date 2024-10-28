import React, { useState } from 'react';
import { X } from 'lucide-react';

const WritingPopup = () => {
    const [open, setOpen] = useState(true);
  return (
    <div className={`w-64 bg-blue-50/80 rounded-lg shadow-lg border border-gray-200 ${open ? "" : "hidden"}`}>
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Writing on Medium</h2>
          <button onClick={()=> setOpen(false)}  className={`p-1 hover:bg-blue-100 rounded-full`}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 pt-2">
        <div className="space-y-3">
          <button className="w-full text-left px-3 py-2 text-gray-700 rounded-md">
            New writer FAQ
          </button>
          <button className="w-full text-left px-3 py-2 text-gray-700 rounded-md">
            Expert writing advice
          </button>
          <button className="w-full text-left px-3 py-2 text-gray-700 rounded-md">
            Grow your readership
          </button>
          <button className="w-full mt-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">
            Start writing
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingPopup;