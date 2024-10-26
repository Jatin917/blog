import React, { useEffect, useState } from 'react';

interface propsTypes {
    title: string,
}

const BlogImage: React.FC<propsTypes> = React.memo(({ title }) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchImage = async () => {
            const encodedQuery = encodeURIComponent((title.split(":")[0]).trim()); // Encode query
            try {
                const response = await fetch(
                    `https://api.unsplash.com/search/photos?query=${encodedQuery}&client_id=${import.meta.env.VITE_ACCESS_KEY}&per_page=1&count=1`
                );
                const data = await response.json();
                if (data.results.length > 0) {
                    setImageUrl(data.results[0].urls.small_s3);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [title]);

    console.log(imageUrl); // For debugging purposes

    return (
        <>
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="rounded w-[220px] h-[150px]" />
            ) : (
                <p>Loading image...</p> // Optional loading state
            )}
        </>
    );
});

export default BlogImage;