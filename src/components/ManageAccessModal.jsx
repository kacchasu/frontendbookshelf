import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteUserToBookshelf, removeUserFromBookshelf, fetchBookshelfUsers } from '../store/bookshelfSlice';

const ManageAccessModal = ({ bookshelf, onClose }) => {
    const dispatch = useDispatch();
    const [inviteUsername, setInviteUsername] = useState('');
    const [removeUsername, setRemoveUsername] = useState('');
    const { bookshelfUsers } = useSelector((state) => state.bookshelves);
    const { username } = useSelector((state) => state.user);

    useEffect(() => {
        if (bookshelf) {
            dispatch(fetchBookshelfUsers(bookshelf.id));
        }
    }, [dispatch, bookshelf]);

    const handleInviteUser = () => {
        if (inviteUsername.trim() && inviteUsername !== username) {
            dispatch(inviteUserToBookshelf({ bookshelfId: bookshelf.id, username: inviteUsername }));
            setInviteUsername('');
        } else {
            alert("You cannot invite yourself to your own bookshelf.");
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
                <h4>Users in this Bookshelf:</h4>
                <ul>
                    {bookshelfUsers.map(user => (
                        <li key={user.id}>
                            {user.user.username} {user.owner ? "(Owner)" : ""}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ManageAccessModal;
