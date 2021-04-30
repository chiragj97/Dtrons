import axios from 'axios';

const API = 'http://localhost:3004';

export const getTimeSlots = () => axios.get(`${API}/slots`);
export const updateSlot = (data, id) => axios.put(`${API}/slots/${id}`, data);
