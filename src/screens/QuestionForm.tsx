import React, {useState} from 'react';
import {useMutation, gql} from '@apollo/client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {CreateQuestion, CreateQuestionVariables} from '../generated/CreateQuestion';

// Define your GraphQL mutation
const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion($title: String!, $content: String!) {
    createQuestion(title: $title, content: $content, authorId: "1") {
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

export default function QuestionForm () {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    const [ createQuestion, {loading} ] = useMutation<CreateQuestion, CreateQuestionVariables>(CREATE_QUESTION_MUTATION, {
        update (cache, {data}) {
            cache.modify({
                fields: {
                    questions (existingQuestions = []) {
                        const newQuestionRef = cache.writeFragment({
                            data: data?.createQuestion,
                            fragment: gql`
                                fragment NewQuestion on Question {
                                    id
                                    title
                                }
                            `
                        });
                        return [ ...existingQuestions, newQuestionRef ];
                    }
                }
            });
        }
    });

    const handleSubmit = () => {
        createQuestion({variables: {title, content}});
        setTitle('');
        setContent('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                sx={{mt: 3, mb: 2}}
                disabled={loading}
            >
                Submit
            </Button>
        </Box>
    );
}
