import api from './api';

const addReview = (bookId, reviewData) => {
    return api.post(`books/${bookId}/reviews`, reviewData);
};

const getReviewsForBook = (bookId) => {
    return api.get(`books/${bookId}/reviews`);
};

export default {
    addReview,
    getReviewsForBook
};
