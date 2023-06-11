import { useSeletor, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { deleteBookingThunk, getCurrentUserBookingsThunk } from '../../store/booking';


export default function DeleteBookingModal({ booking }) {

    const [errors, setErrors] = useState();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleBookingDelete = (e) => {
        e.preventDefault();

        return dispatch(deleteBookingThunk(booking.id))
            .then(dispatch(getCurrentUserBookingsThunk()))
            .then(closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors.apply(data.errors);
                }
            } );
    };

    

    return (
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this reservation?</p>
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