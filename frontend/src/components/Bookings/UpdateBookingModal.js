import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBookingThunk, getCurrentUserBookingsThunk } from '../../store/booking'
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { fetchDetailedSpotThunk } from '../../store/spots';
import './UpdateBookingModal.css'

export default function UpdateBookingMadal({ booking }) {

    // console.log("booking in UpdateBooingModal: ", booking);

    const [editStartDate, setEditStartDate] = useState();
    const [editEndDate, setEditEndDate] = useState();
    const [errors, setErrors] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    useEffect(() => {
        const errorLi = {};
        if(editStartDate === undefined) errorLi.editStartDate = "Please enter new check-in date.";
        if(editEndDate === undefined) errorLi.editEndDate = "Please enter new check-out date.";
            
        setErrors(errorLi);
    }, [editStartDate, editEndDate])
    

    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmit(true);

        const payload = {
            startDate: editStartDate,
            endDate: editEndDate,
        }
        console.log("editStartDate in UpdateBooking onSubmit function: ", editStartDate);
        console.log("editEndDate in UpdateBooking onSubmit function: ", editEndDate);
        // const errorLi = {};
        // if(editStartDate === undefined) errorLi.editStartDate = "Please enter new check-in date.";
        // if(editEndDate === undefined) errorLi.editEndDate = "Please enter new check-out date.";
            
        // setErrors(errorLi);

        // console.log("errors in submit function: ", Object.values(errors).length)
        const editBooking = await dispatch(editBookingThunk(booking.id, payload));

        // console.log("EditBooking in UpdateBookingModal: ", editBooking)

        if(editBooking.message) {
            console.log("editBooking in onSubmit function: ", editBooking);
            setErrors(editBooking);
            console.log("errors : ", errors);
        } else {
            dispatch(getCurrentUserBookingsThunk());
            dispatch(fetchDetailedSpotThunk(booking.Spot.id));
            window.alert("Reservation Updated!");
            // history.push(`/spots/${booking.Spot.id}/bookings`);
            history.push('/bookings/current');
            closeModal();
        }

        // setEditStartDate("");
        // setEditEndDate("");
        // setErrors({});

    };


    return (
        <>
        <div id='update-booking-title'>
            <h3>Update Your Reservation at</h3>
            <h3>{booking.Spot.name}</h3>
        </div>
        {hasSubmit && <p className='error'>{errors.editStartDate}</p>}
        {hasSubmit && <p className='error'>{errors.editEndDate}</p>}
        {hasSubmit && <p className='error'>{errors.message}</p>}
        <form
            onSubmit={onSubmit} 
            id='update-booking-form'
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
            <button 
            disabled={Object.values(errors).length > 0}
            id={Object.values(errors).length === 0 ? 'update-booking-button-active' : 'update-booking-button-disabled'}
            >Update Reservation</button>
        </form>
        </>
    )

}