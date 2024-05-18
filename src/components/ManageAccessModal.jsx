import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteUserToBookshelf, removeUserFromBookshelf } from '../store/bookshelfSlice';
import api from '../services/api';

const ManageAccessModal = ({ bookshelf, onClose }) => {
    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.user);
    const [inviteUsername, setInviteUsername] = useState('');
    const [removeUsername, setRemoveUsername] = useState('');
    const [bookshelfUsers, setBookshelfUsers] = useState([]);

    useEffect(() => {
        const fetchBookshelfUsers = async () => {
            try {
                const response = await api.get(`/user-bookshelf/bookshelf-info/${bookshelf.id}`);
                setBookshelfUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch bookshelf users:', error);
            }
        };

        fetchBookshelfUsers();
    }, [bookshelf.id]);

    const handleInviteUser = async () => {
        if (inviteUsername.trim() && inviteUsername !== username) {
            try {
                await dispatch(inviteUserToBookshelf({ bookshelfId: bookshelf.id, username: inviteUsername }));
                const response = await api.get(`/user-bookshelf/bookshelf-info/${bookshelf.id}`);
                setBookshelfUsers(response.data);
                setInviteUsername('');
            } catch (error) {
                console.error('Failed to invite user:', error);
            }
        }
    };

    const handleRemoveUser = async () => {
        if (removeUsername.trim()) {
            try {
                await dispatch(removeUserFromBookshelf({ bookshelfId: bookshelf.id, username: removeUsername }));
                const response = await api.get(`/user-bookshelf/bookshelf-info/${bookshelf.id}`);
                setBookshelfUsers(response.data);
                setRemoveUsername('');
            } catch (error) {
                console.error('Failed to remove user:', error);
            }
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Manage Access for {bookshelf.name}</h3>
                <div>
                    <input
                        type="text"
                        value={inviteUsername}
                        onChange={(e) => setInviteUsername(e.target.value)}
                        placeholder="Invite user by username"
                    />
                    <button onClick={handleInviteUser}>Invite</button>
                </div>
                <div>
                    <input
                        type="text"
                        value={removeUsername}
                        onChange={(e) => setRemoveUsername(e.target.value)}
                        placeholder="Remove user by username"
                    />
                    <button onClick={handleRemoveUser}>Remove</button>
                </div>
                <h4>Current Users</h4>
                <ul>
                    {bookshelfUsers.map(userBookshelf => (
                        <li key={userBookshelf.id}>
                            {userBookshelf.user.username} {userBookshelf.owner && '(Owner)'}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ManageAccessModal;
