import { useNavigate } from 'react-router-dom';
import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { loginFields } from 'services/fields';
import { getUserLevel } from 'services/getUserLevel';
import { loginSchema } from 'services/schemas';
import { login } from 'services/userServices';

export default function LoginFormController() {
    const { setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const validateLogin = async ({ username, password }) => {
        const req = await login({ username, password });
        if (req.error) {
            setError(req.error);
        } else {
            const data = { ...req.user, level: getUserLevel(req.user.points) };
            setUserData(data);
            navigate('/');
        }
    };

    return Form({
        fields: loginFields,
        onSubmit: validateLogin,
        validationSchema: loginSchema,
    });
}
