import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBookingThunk } from '../../store/booking';
import { useModal } from '../../context/Modal';
import { loadBookingThunk } from '../../store/booking';
import { useHistory } from 'react-router-dom';

export default function CreateBookingModal({ spot }) {

    console.log("spot in CreateBookingModal: ", spot);
    const [bookingStartDate, setBookingStartDate] = useState("");
    const [bookingEndDate, setBookingEndDate] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    
    const user = useSelector((state) => state.session.user);
    console.log("user in createBookingModal: ", user);

   
    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmit(true)

        const booking = {
            spotId: spot[0].id,
            userId: user.id,
            startDate: bookingStartDate,
            endDate: bookingEndDate,
        }

        const newBooking = await dispatch(createBookingThunk(spot[0].id, booking));

        if(newBooking.errors) {
            setErrors(newBooking.errors);
            console.log("errors : ", errors);
        } else {
            // dispatch(loadBookingThunk(spot.id));
            window.alert("Reservation success!");
            history.push(`/spots/${spot[0].id}/bookings`)
            closeModal();
        }

    };


    return (
        <>
        <h2>Make a reservation at</h2> 
        <h2>{spot[0].name}!</h2>
        {hasSubmit && <p>{errors.startDate}</p>}
        {hasSubmit && <p>{errors.endDate}</p>}
        <form
            onSubmit={onSubmit} 
        >
            <label>Check In Date</label>
            <input
                type="date"
                placeholder='Please enter your check-in date'
                value={bookingStartDate}
                onChange={(e) => setBookingStartDate(e.target.value)}
            />
            <label>Check Out Date</label>
            <input 
                type="date"
                placeholder="Please enter your check-out date"
                value={bookingEndDate}
                onChange={(e) => setBookingEndDate(e.target.value)}
            />
            <button>Reserve</button>
        </form>
        </>
    );
};