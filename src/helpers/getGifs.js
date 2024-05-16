export const getGifs = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=FuquiPoCz3sKT3QPXtw8PKIqfiRnHg9M&q=${category}&limit=10`;

  //   try {
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       if (response.status === 429) {
  //         throw new Error("Too many requests");
  //       } else {
  //         throw new Error("Error fetching gifs");
  //       }
  //     }

  //     const { data } = await response.json();
  //     return data.map((img) => ({
  //       id: img.id,
  //       title: img.title,
  //       url: img.images.downsized_medium.url,
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }

  const resp = await fetch(url);
  const { data } = await resp.json();

  const gifs = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));

  return gifs;
};
