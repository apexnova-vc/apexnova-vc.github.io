import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAppContext } from "../context/AppContext"; // Import your AppContext hook
import {
  CreateQuestion,
  CreateQuestionVariables,
} from "../generated/CreateQuestion";
import TextField from "@mui/material/TextField";

// Define your GraphQL mutation
export const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion(
    $title: String!
    $content: String!
    $authorId: String!
  ) {
    createQuestion(title: $title, content: $content, authorId: $authorId) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;

export default function QuestionForm() {
  const { user } = useAppContext(); // Access the user from context
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Ensure user is not null before attempting to create a question
  const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is not available in context");
  }

  const [createQuestion, { loading }] = useMutation<
    CreateQuestion,
    CreateQuestionVariables
  >(CREATE_QUESTION_MUTATION, {
    update(cache, { data }) {
      // Update the cache with the new question
      const newQuestionRef = cache.writeFragment({
        data: data?.createQuestion,
        fragment: gql`
          fragment NewQuestion on Question {
            id
            title
          }
        `,
      });
      cache.modify({
        fields: {
          questions(existingQuestions = []) {
            return [...existingQuestions, newQuestionRef];
          },
        },
      });
    },
    onCompleted() {
      setSuccess(true);
      setTitle("");
      setContent("");
    },
    onError(error) {
      setError(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (title && content && userId) {
      createQuestion({ variables: { title, content, authorId: userId } });
      setTitle("");
      setContent("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && <p>Error: {error}</p>}
      {success && <p>Question submitted successfully!</p>}
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        required
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        Submit
      </Button>
    </Box>
  );
}
