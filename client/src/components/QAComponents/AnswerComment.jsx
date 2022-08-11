import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag } from 'controllers';
import { VoteControl } from 'controllers/QAControllers';

export default function AnswerComment({
    comment_id,
    creator,
    createdAt,
    downvotes,
    text,
    upvotes,
    getVote,
    updateVote,
    canVote,
}) {
    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                </ListItemText>
                <VoteControl {...{ downvotes, getVote, updateVote, upvotes, canVote }} />
            </ListItem>
            <Divider />
        </span>
    );
}
