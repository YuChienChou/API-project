import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Booking() {
    const [bookingStartDate, setBookingStartDate] = useState("");
    const [bookingEndDate, setBookingEndDate] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        const booking = {
            startDate: bookingStartDate,
            endDate: bookingEndDate
        }

    }


    return (
        <>
        <h2>spot name booking status</h2>
        <div>show all bookings for this spot ( or should be in single spot??)</div>
        <form>
            <label>Start Date</label>
            <input
                type="date"
                placeholder='Please enter your check-in date'
                value={bookingStartDate}
                onChange={(e) => setBookingStartDate(e.target.value)}
            />
            <label>End Date</label>
            <input 
                type="date"
                placeholder="Please enter your check-out date"
                value={bookingEndDate}
                onChange={(e) => setBookingEndDate(e.target.value)}
            />
        </form>


        </>
    );
};