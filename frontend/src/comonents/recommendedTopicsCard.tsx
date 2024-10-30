;

const RecommendedTopics = () => {
  const topics = [
    "Data Science",
    "Writing",
    "Relationships",
    "Productivity",
    "Cryptocurrency",
    "Politics",
    "Machine Learning"
  ];

  return (
    <div className="max-w-xl p-4">
      <h2 className="text-xl font-bold mb-3">Recommended topics</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {topics.map((topic, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-800 transition-colors"
          >
            {topic}
          </button>
        ))}
      </div>
      
      <a 
        href="#" 
        className="text-green-600 hover:underline text-sm"
      >
        See more topics
      </a>
    </div>
  );
};

export default RecommendedTopics;