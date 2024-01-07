// Define a local GraphQL mutation to update the cache

// Define the type for the question input (adjust as per your GraphQL types)

export const useCreateQuestionRestApi = () => {
  // Apollo client mutation to update the cache
  const createQuestion = async (
    title: string,
    content: string,
    authorId: string,
  ) => {
    const response = await fetch("http://localhost:3005/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, authorId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    // Update Apollo cache after successful REST API call
    // updateCache({
    //   variables: {
    //     question: {
    //       id: data.id,
    //       title: data.title,
    //       content: data.content,
    //       author: {
    //         id: authorId,
    //         name: data.author.name, // Assuming the response includes the author's name
    //       },
    //     },
    //   },
    // });

    return data;
  };

  return createQuestion;
};
