import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBookingThunk, getCurrentUserBookingsThunk } from '../../store/booking'
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { fetchDetailedSpotThunk } from '../../store/spots';

export default function UpdateBookingMadal({ booking }) {

    console.log("booking in UpdateBooingModal: ", booking);

    const [editStartDate, setEditStartDate] = useState();
    const [editEndDate, setEditEndDate] = useState();
    const [errors, setErrors] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();


    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmit(true);

        const payload = {
            startDate: editStartDate,
            endDate: editEndDate,
        }

        const errors = {};
        if(!editStartDate) {
            errors.editStartDate = "Please enter new check-in date.";
            setErrors(errors);
        }
        if(!editEndDate) {
            errors.editEndDate = "Please enter new check-out date.";
            setErrors(errors);
        };

        console.log("editStartDate in UpdateBooking onSubmit function: ", editStartDate);
        console.log("editEndDate in UpdateBooking onSubmit function: ", editEndDate);

        const editBooking = await dispatch(editBookingThunk(booking.id, payload));

        console.log("EditBooking in UpdateBookingModal: ", editBooking)

        if(editBooking.message) {
            console.log("editBooking in onSubmit function: ", editBooking);
            setErrors(editBooking);
            console.log("errors : ", errors);
        } else {
            dispatch(getCurrentUserBookingsThunk());
            dispatch(fetchDetailedSpotThunk(booking.Spot.id));
            window.alert("Reservation Updated!");
            history.push(`/spots/${booking.Spot.id}/bookings`);
            closeModal();
        }

        // setEditStartDate("");
        // setEditEndDate("");
        // setErrors({});

    };


    return (
        <>
        <h3>Update Your Reservation at</h3>
        <h3>{booking.Spot.name}</h3>
        {hasSubmit && <p>{errors.editStartDate}</p>}
        {hasSubmit && <p>{errors.editEndDate}</p>}
        {hasSubmit && <p>{errors.message}</p>}
        <form
            onSubmit={onSubmit} 
        >
            <label>Check In Date</label>
            <input
                type="date"
                placeholder={booking.startDate}
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
            />
            <label>Check Out Date</label>
            <input 
                type="date"
                placeholder={booking.endDate}
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
            />
            <button>Update Reservation</button>
        </form>
        </>
    )

}