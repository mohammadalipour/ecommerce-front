// src/pages/Profile/Profile.jsx
import React from "react";
import './Profile.css'; // Import the CSS file

const Profile = ({ profile }) => {
    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
            <p>First Name: {profile.firstName}</p>
            <p>Last Name: {profile.lastName}</p>
        </div>
    );
};

export default Profile;