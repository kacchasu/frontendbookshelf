import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inviteUserToBookshelf, removeUserFromBookshelf } from '../store/bookshelfSlice';

const ManageAccessModal = ({ bookshelf, onClose }) => {
    const dispatch = useDispatch();
    const [inviteUsername, setInviteUsername] = useState('');
    const [removeUsername, setRemoveUsername] = useState('');

    const handleInviteUser = () => {
        if (inviteUsername.trim()) {
            dispatch(inviteUserToBookshelf({ bookshelfId: bookshelf.id, username: inviteUsername }));
            setInviteUsername('');
        }
    };

    const handleRemoveUser = () => {
        if (removeUsername.trim()) {
            dispatch(removeUserFromBookshelf({ bookshelfId: bookshelf.id, username: removeUsername }));
            setRemoveUsername('');
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
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ManageAccessModal;
