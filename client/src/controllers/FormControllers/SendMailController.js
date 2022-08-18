import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';

export default function SendMailController() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/users/login', {
                state: {
                    name: 'ask',
                    msg: 'you need to be authenticated to access this feature',
                    prevPath: '/ask',
                },
            });
        }
    }, []);

    const sendMail = async (fields) => {
        const { error } = await postMail(fields);
        if (!error) window.location.reload(false);
    };

    return Form({
        fields: composeMailFields,
        onSubmit: sendMail,
        validationSchema: mailSchema,
    });
}
