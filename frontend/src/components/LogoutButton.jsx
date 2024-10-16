import React from 'react';
import Cookies from 'js-cookie';

function LogoutButton() {
    const handleLogout = (e) => {
        e.preventDefault();

        const csrfToken = Cookies.get('csrftoken');

        fetch('/users/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,  // Itt adjuk hozzá a CSRF tokent
            },
            credentials: 'include',  // Fontos a sütik küldéséhez
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';  // Átirányítás a főoldalra sikeres kilépés után
            } else {
                console.error('Kilépési hiba!');
            }
        })
        .catch(error => {
            console.error('Hálózati hiba a kilépés során:', error);
        });
    };

    return (
        <form onSubmit={handleLogout}>
            <button type="submit">Kilépés</button>
        </form>
    );
}

export default LogoutButton;
