import { Card, CardContent, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { SearchForm } from 'controllers/FormControllers';
import { PaginatedList } from 'controllers';
import { ListQuestion, BlankProgress } from 'components';
import { searchQuestions } from 'services/questionsServices';
import { useState } from 'react';

export default function Search() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const getData = async ({ question_id }) => {
        let match = {};
        const regexMatch = {};
        const time = {};
        let newdate = searchParams.get('createdAt');

        if (newdate) {
            newdate = new Date(newdate);
            time['$gte'] = parseInt(newdate.getTime());
            newdate.setDate(newdate.getDate() + 1);
            time['$lte'] = newdate.getTime();
            match = JSON.stringify({ createdAt: time });
        }

        const creator = searchParams.get('creator');
        if (creator) regexMatch.creator = creator;

        const text = searchParams.get('text');
        if (text) regexMatch.text = text.replaceAll(' ', '|');

        const title = searchParams.get('title');
        if (title) regexMatch.title = title.replaceAll(' ', '|');

        const { questions } = await searchQuestions({ after: question_id, regexMatch, match });

        setLoading(() => false);
        return questions;
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant='h3' align='center'>
                        Search
                    </Typography>
                    <SearchForm />
                </CardContent>
            </Card>
            {loading && <BlankProgress />}
            <PaginatedList {...{ concat: true, Component: ListQuestion, getData, noData: false }} />
        </div>
    );
}
