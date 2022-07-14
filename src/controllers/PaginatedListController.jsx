import { useEffect, useState } from 'react';
import { useQuestion } from '../contexts';
import { Answer, Comment, PaginatedList } from '../components';
import { getAnswers, getQuestionComments } from '../services/questionsServices';

const rowsPerPage = 5;
function PaginatedListController({ count = 0, Component, getData }) {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const loadData = async () => {
            setData(await getData() || [])
        }
        loadData();
    }, [getData]);

    return data && (
        <PaginatedList {...{
            count: Math.ceil(count / rowsPerPage),
            data: data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
            Component,
            handleChangePage,
            page,
            rowsPerPage
        }} />
    );
}

export function AnswersList() {
    const { questionData: { question_id, answers: count } } = useQuestion();

    const getData = () => getAnswers(question_id).then(({ answers }) => answers);

    return <PaginatedListController {...{ count, Component: Answer, getData }} />;
}

export function CommentsList() {
    const { questionData: { question_id, comments: count } } = useQuestion();

    const getData = () => getQuestionComments(question_id).then(({ comments }) => comments);

    return <PaginatedListController {...{ count, Component: Comment, getData }} />;
}
