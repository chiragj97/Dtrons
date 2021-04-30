import React, { useEffect, useState } from 'react';
import { getTimeSlots, updateSlot } from '../api_helper';
import { Modal, Button, Form } from 'react-bootstrap';

const TimeSlot = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotDetails, setSlotDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [selectedTimeslot, setSelectedTimeslot] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = () => {
    getTimeSlots().then(({ data }) => setTimeSlots(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleModal = (timeslot) => {
    setSelectedTimeslot(timeslot);
    handleShow();
  };

  const update = () => {
    slotDetails['startTime'] = selectedTimeslot.startTime;
    slotDetails['endTime'] = selectedTimeslot.endTime;
    slotDetails['status'] = true;

    updateSlot(slotDetails, selectedTimeslot.id).then(() => {
      getData();
      handleClose();
    });
  };

  const cancelSlot = () => {
    selectedTimeslot['status'] = false;
    selectedTimeslot['firstName'] = null;
    selectedTimeslot['lastName'] = null;
    selectedTimeslot['phoneNumber'] = null;
    slotDetails['startTime'] = selectedTimeslot.startTime;
    slotDetails['endTime'] = selectedTimeslot.endTime;
    updateSlot(slotDetails, selectedTimeslot.id).then(() => {
      getData();
      handleClose();
    });
  };

  return (
    <div className="text-center">
      <div className="bg-light p-4">
        <h1>
          Slot Booking for<strong> {new Date().toDateString()}</strong>
        </h1>
      </div>
      <div>
        {timeSlots &&
          timeSlots.map((timeslot) => (
            <div key={timeslot.id} className="container">
              <div className=" p-2">
                <strong>
                  {timeslot.startTime} - {timeslot.endTime}
                </strong>
                {timeslot.status ? (
                  <div>
                    <button
                      onClick={() => handleModal(timeslot)}
                      className="btn btn-danger px-5"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleModal(timeslot)}
                      className="btn btn-primary px-5"
                    >
                      Book
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            Book your slot for {selectedTimeslot.startTime} to{' '}
            {selectedTimeslot.endTime}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              defaultValue={selectedTimeslot.firstName}
              onChange={(e) =>
                setSlotDetails({ ...slotDetails, firstName: e.target.value })
              }
            />
            <Form.Control
              className="mt-2"
              name="lastName"
              type="text"
              placeholder="Last Name"
              defaultValue={selectedTimeslot.lastName}
              onChange={(e) =>
                setSlotDetails({ ...slotDetails, lastName: e.target.value })
              }
            />
            <Form.Control
              className="mt-2"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              defaultValue={selectedTimeslot.phoneNumber}
              onChange={(e) =>
                setSlotDetails({ ...slotDetails, phoneNumber: e.target.value })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelSlot}>
            Cancel Slot
          </Button>
          <Button variant="primary" onClick={update}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TimeSlot;
