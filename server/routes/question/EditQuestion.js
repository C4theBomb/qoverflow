const config = require('server/config.json');
const { getQuestion, refreshQuestion } = require('server/utils/question');
const createRequest = require('server/utils/api');


async function EditQuestion(req, res) {
    const { user } = req;
    const { text } = req.body;
    const { question_id } = req.params;

    if (!text) return res.status(400).send(config.errorIncomplete);

    // Verify user owns question
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);
    if (question.creator !== user.username) return res.status(403).send(config.errorForbidden);

    // Patch question with BDPA server
    const { success } = await createRequest(
        'patch',
        `/questions/${question_id}`,
        { text }
    );

    if (!success) return res.status(500).send(config.errorGeneric);
    
    await refreshQuestion(question_id);
    
    return res.sendStatus(200);
}

module.exports = EditQuestion;
