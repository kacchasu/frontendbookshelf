import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import bookshelfService from '../services/bookshelfService';

const ManageAccessModal = ({ bookshelf, onClose }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');

    const handleInvite = async () => {
        try {
            await bookshelfService.inviteUserToBookshelf(bookshelf.id, username);
            onClose();
        } catch (error) {
            console.error('Failed to invite user:', error);
        }
    };

    const handleRemoveUser = async (username) => {
        try {
            await bookshelfService.removeUserFromBookshelf(bookshelf.id, username);
            onClose();
        } catch (error) {
            console.error('Failed to remove user:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Manage Access</h2>
                <div>
                    <label>
                        Invite User:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <button onClick={handleInvite}>Invite</button>
                </div>
                <div>
                    <h3>Current Users:</h3>
                    <ul>
                        {bookshelf.users.map((user) => (
                            <li key={user.id}>
                                {user.username}
                                <button onClick={() => handleRemoveUser(user.username)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ManageAccessModal;
