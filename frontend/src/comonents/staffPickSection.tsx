;

const StaffPicks = () => {
  const articles = [
    {
      author: "Abi",
      title: "I shut down my startup. Here's the honest truth.",
      avatar: "/api/placeholder/32/32"
    },
    {
      author: "Tim Lou, PhD",
      context: "in Towards Data Science",
      title: "The Science Behind AI's First Nobel Prize",
      avatar: "/api/placeholder/32/32"
    },
    {
      author: "The Medium Newsletter",
      context: "in The Medium Blog",
      title: "Pursuing your passion feels like cheating",
      avatar: "/api/placeholder/32/32"
    }
  ];

  return (
    <div className="max-w-xl p-4">
      <h2 className="text-xl font-bold mb-4">Staff Picks</h2>
      
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="flex items-start space-x-3">
            <img 
              src={article.avatar}
              alt={`${article.author}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">{article.author}</span>
                {article.context && (
                  <>
                    <span className="text-gray-500 text-sm">
                      {article.context}
                    </span>
                  </>
                )}
              </div>
              <h3 className="font-bold hover:underline cursor-pointer">
                {article.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      <a 
        href="#" 
        className="block mt-4 text-green-600 hover:underline"
      >
        See the full list
      </a>
    </div>
  );
};

export default StaffPicks;