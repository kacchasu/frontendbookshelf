import axios from 'axios';
import api from './api';


const API_URL = '/reviews';

const getReviewsByBookId = async (bookId) => {
    const response = await api.get(`${API_URL}/book/${bookId}`);
    return response.data;
};

const saveReview = async (review) => {
    const response = await api.post(API_URL, review);
    return response.data;
};

export default { getReviewsByBookId, saveReview };
