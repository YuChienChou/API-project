import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUserThunk } from "../../store/users";



const GetUser = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.users[userId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserThunk(userId));
    }, [dispatch, userId]);

    return (
        <>
        </>
    )


}