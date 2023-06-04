import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import { login } from '../../store/session';
import { useModal } from '../../context/Modal';

export default function GetDemoUser({credential, password}) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.users);
    // console.log("user in demoUser: ", user);
    const history = useHistory();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
       
        return dispatch(login({ credential, password }))
          .then(closeModal)
          .then (history.push('/'))
      };

    return (
        <>
        <div
        onClick={handleSubmit}
        >
            Demo User
        </div>
        </>
    )

};