import superagent from 'superagent';
import Throttle from 'superagent-throttle';
import { API, API_KEY } from '../var';

const throttle = new Throttle({
    active: true,
    rate: 3,
    ratePer: 1500,
    concurrent: 2
});

const createEndpoint = (path) => async (op, endpoint, data) =>
    superagent[op](`${API}${path}${endpoint}`)
        .use(throttle.plugin())
        .set('Authorization', `bearer ${API_KEY}`)
        .query(data)
        .send(data)
        .then(({ body }) => {
            console.log('api', op, endpoint, data, body);
            return body;
        })
        .catch(({ response = {}, status }) => {
            console.log('err', op, endpoint, data, response, status)
            return { ...response.body, status };
        })

export { createEndpoint };
