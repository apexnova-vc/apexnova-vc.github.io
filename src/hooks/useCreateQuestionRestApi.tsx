import axios from "axios";

export const useCreatePostRestApi = () => {
  const createPost = async (title: string, body: string, userId: number) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId,
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error: ${error.response?.status}`);
      } else {
        throw new Error("An error occurred while creating the post");
      }
    }
  };

  return { createPost };
};
