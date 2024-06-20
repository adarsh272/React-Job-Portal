import React, { useState } from 'react';
import CandidateProfileEdit from '../../components/CandidateProfileEdit';
import CandidateProfileView from '../../components/CandidateProfileView';
import useFetchProfile from '../../hooks/useFetchProfile';

const CandidateProfile = () => {
    const { profile, loading, error, updateProfile, fetchProfile } = useFetchProfile();
    const [isEditing, setIsEditing] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile: {error.message}</p>;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async (updatedProfile) => {
        try {
            await fetchProfile(); // Re-fetch the profile data to get the updated profile
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div>
            {isEditing ? (
                <CandidateProfileEdit profile={profile} onSave={handleSaveProfile} />
            ) : (
                <CandidateProfileView profile={profile} onEdit={handleEditClick} />
            )}
        </div>
    );
};

export default CandidateProfile;
