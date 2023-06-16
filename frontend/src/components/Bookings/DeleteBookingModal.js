import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { deleteBookingThunk, getCurrentUserBookingsThunk } from '../../store/booking';


export default function DeleteBookingModal({ booking }) {

    const [errors, setErrors] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleBookingDelete = async (e) => {
        e.preventDefault();

        setHasSubmit(true);

        const deleteBooking = await dispatch(deleteBookingThunk(booking.id));
        console.log("deleteBooking in DeleteBookingModal: ", deleteBooking)

        if(deleteBooking && deleteBooking.message) {
            console.log("deleteBooking in handleBookingDelete funciton: ", deleteBooking);
            setErrors(deleteBooking);
            console.log("errors: ", errors);
        } else {
            window.alert("Reservation deleted!");
            closeModal(); 
            dispatch(getCurrentUserBookingsThunk())
        }

    };

    

    return (
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this reservation?</p>
        {hasSubmit && <p>{errors.message}</p>}
        <div className='confirm-delete-review-div'>
            <button 
                type='submit'
                onClick={handleBookingDelete}
                id='confirm-delete-booking-button'
            >
                Yes (Delete Reservation)
            </button>
            <button 
                onClick={closeModal}
            >
                No (Keep Reservation)
            </button>
        </div>
        </>
    )
}