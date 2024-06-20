import React, { useState } from 'react';
import CompanyProfileEdit from '../../components/CompanyProfileEdit';
import CompanyProfileView from '../../components/CompanyProfileView';
import useFetchProfile from '../../hooks/useFetchProfile';
import { ToastContainer, toast } from 'react-toastify';

const CompanyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { profile, loading, error, updateProfile, fetchProfile } = useFetchProfile();


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        try {
            debugger
            const res = await fetchProfile(); // Re-fetch the profile data to get the updated profile
            if (res.status == 200) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message || 'Please try again')
            }
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div>
            {isEditing ? (
                <CompanyProfileEdit profile={profile} onSave={handleSaveProfile} />
            ) : (
                <CompanyProfileView profile={profile} onEdit={handleEditClick} />
            )}
            <ToastContainer />
        </div>
    );
};

export default CompanyProfile;
