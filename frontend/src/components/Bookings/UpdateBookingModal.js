import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBookingThunk } from '../../store/booking'
import { useHistory } from 'react-router-dom';

export default function UpdateBooking({ spot, booking }) {

    console.log("spot in UpdateBookingModal: ", spot);

    const [editStartDate, setEditStartDate] = useState();
    const [editEndDate, setEditEndDate] = useState();
    const [errors, setErrors] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmit(true)

        const payload = {
            spotId: spot[0].id,
            userId: user.id,
            startDate: editStartDate,
            endDate: editEndDate,
        }

        const editBooking = await dispatch(editBookingThunk(booking.id, payload));

        if(editBooking.errors) {
            setErrors(editBooking.errors);
            console.log("errors : ", errors);
        } else {
            // dispatch(loadBookingThunk(spot.id));
            window.alert("Reservation Updated!");
            history.push(`/spots/${spot[0].id}/bookings`);
            closeModal();
        }

    };


    return (
        <>
        <h3>Update Your Reservation at</h3>
        <h3>spot name</h3>
        {hasSubmit && <p>{errors.startDate}</p>}
        {hasSubmit && <p>{errors.endDate}</p>}
        <form
            onSubmit={onSubmit} 
        >
            <label>Check In Date</label>
            <input
                type="date"
                placeholder='Please enter your check-in date'
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
            />
            <label>Check Out Date</label>
            <input 
                type="date"
                placeholder="Please enter your check-out date"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
            />
            <button>Update Reservation</button>
        </form>
        </>
    )

}