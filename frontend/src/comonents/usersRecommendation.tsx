import React from 'react';

const WhoToFollow = () => {
  const suggestions = [
    {
      name: "Arnold Gunter",
      description: "Hey there! I'm Arnold, a tech enthusiast who loves to stay...",
      avatar: "/api/placeholder/48/48",
      type: "person"
    },
    {
      name: "In Fitness And In Health",
      description: "A vibrant community sharing science & experience-backe...",
      avatar: "/api/placeholder/48/48",
      type: "publication"
    },
    {
      name: "The Useful Tech",
      description: "passionfroot.me/the-useful-tech | Everything about Appl...",
      avatar: "/api/placeholder/48/48",
      type: "publication"
    }
  ];

  return (
    <div className="max-w-xl p-4">
      <h2 className="text-xl font-bold mb-4">Who to follow</h2>
      
      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div key={index} className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <img 
                src={item.avatar}
                alt={`${item.name}'s avatar`}
                className={`w-12 h-12 ${item.type === 'publication' ? 'rounded' : 'rounded-full'}`}
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                {item.type === 'publication' && (
                  <div className="text-sm text-gray-600 mb-1">Publication</div>
                )}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
            
            <button className="px-4 py-1.5 border border-gray-800 rounded-full text-sm hover:bg-gray-100 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
      
      <a 
        href="#" 
        className="block mt-4 text-green-600 hover:underline text-sm"
      >
        See more suggestions
      </a>
    </div>
  );
};

export default WhoToFollow;