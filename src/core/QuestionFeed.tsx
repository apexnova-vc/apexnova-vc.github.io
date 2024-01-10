/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  List,
  ListItemText,
  IconButton,
  Paper,
  ListItemButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import { DeleteQuestion } from "../generated/DeleteQuestion";
import { GetQuestions } from "../generated/GetQuestions"; // Correct import for your generated types

// Define your GraphQL queries and mutations
const GET_QUESTIONS_QUERY = gql`
  query GetQuestions {
    questions {
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

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`;

const QuestionFeed: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<GetQuestions>(GET_QUESTIONS_QUERY);
  const [deleteQuestion] = useMutation<DeleteQuestion>(
    DELETE_QUESTION_MUTATION,
    {
      update(cache, { data: mutationData }) {
        const deleteId = mutationData?.deleteQuestion;
        cache.modify({
          fields: {
            questions(existingQuestionsRefs = [], { readField }) {
              return existingQuestionsRefs.filter(
                (questionRef: any) => deleteId !== readField("id", questionRef),
              );
            },
          },
        });
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.stopPropagation(); // Prevent ListItem click event from firing
    deleteQuestion({ variables: { id } });
  };

  const handleQuestionClick = (id: string) => {
    navigate(`/questions/${id}`); // Navigate to the detail view when a question is clicked
  };

  return (
    <Paper elevation={3} sx={{ my: 2 }}>
      <List>
        {data?.questions?.map((question) => {
          if (!question) return null;

          return (
            <ListItemButton
              key={question.id}
              onClick={() => handleQuestionClick(question.id)}
              sx={{
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "background.default" },
              }}
            >
              <ListItemText
                primary={question.title}
                secondary={`Asked by ${question.author?.name}`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => handleDelete(event, question.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
};

export default QuestionFeed;
