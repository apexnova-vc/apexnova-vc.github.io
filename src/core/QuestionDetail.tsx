import React, {useState, useEffect} from 'react';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useParams, useNavigate} from 'react-router-dom';
import {TextField, Button, Typography, Box, CircularProgress} from '@mui/material';
import {GetQuestionDetail, GetQuestionDetailVariables} from '../generated/GetQuestionDetail';
import {UpdateQuestion, UpdateQuestionVariables} from '../generated/UpdateQuestion';
import {DetailViewDeleteQuestion, DetailViewDeleteQuestionVariables} from '../generated/DetailViewDeleteQuestion';

// Define your GraphQL operations here...

const GET_QUESTION_DETAIL_QUERY = gql`
  query GetQuestionDetail($id: ID!) {
    question(id: $id) {
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

const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestion($id: ID!, $title: String!, $content: String!) {
    updateQuestion(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const DELETE_QUESTION_MUTATION = gql`
  mutation DetailViewDeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`;

export default function QuestionDetail () {
    let {id} = useParams<{id: string}>();
    id = id ?? "";
    const navigate = useNavigate();
    const {loading, data} = useQuery<GetQuestionDetail, GetQuestionDetailVariables>(GET_QUESTION_DETAIL_QUERY, {
        variables: {id},
    });

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    const [ updateQuestion ] = useMutation<UpdateQuestion, UpdateQuestionVariables>(UPDATE_QUESTION_MUTATION, {
        onCompleted: () => navigate('/'),
    });

    const [ deleteQuestion ] = useMutation<DetailViewDeleteQuestion, DetailViewDeleteQuestionVariables>(
        DELETE_QUESTION_MUTATION, {
        variables: {id: id ?? ""},
        update: (cache) => {
            cache.modify({
                fields: {
                    questions (existingQuestionsRefs, {readField}) {
                        return existingQuestionsRefs.filter(
                            (questionRef: any) => id !== readField('id', questionRef)
                        );
                    }
                }
            });
        },
        onCompleted: () => navigate('/')
    }
    );

    useEffect(() => {
        if (data && data.question) {
            setTitle(data.question.title);
            setContent(data.question.content);
        }
    }, [ data ]);

    if (loading) return <CircularProgress />;

    const handleUpdate = () => {
        if (title && content) {
            updateQuestion({variables: {id: id ?? "", title, content}});
        }
    };

    const handleDelete = () => {
        deleteQuestion({variables: {id: id ?? ""}});
    };

    return (
        <Box sx={styles.container}>
            {data?.question && (
                <>
                    <Typography variant="h5" component="h2" sx={{mb: 2}}>
                        {data.question.title}
                    </Typography>
                    <Box sx={styles.form}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={styles.input}
                        />
                        <TextField
                            fullWidth
                            label="Content"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            sx={styles.input}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="contained" color="primary" onClick={handleUpdate} sx={styles.button}>
                                Update
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleDelete} sx={styles.button}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Use 100% width for smaller devices
        maxWidth: '500px', // Set a max-width for larger devices
        marginBottom: '20px'
    },
    input: {
        marginBottom: '16px',
    },
    button: {
        margin: '8px',
        padding: '10px 15px',
    },
};

