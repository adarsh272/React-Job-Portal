import React from 'react';
import def from '../assets/images/default-profile.png';


const CompanyProfileView = ({ profile, onEdit }) => {
    const profilePic = profile?.profilePic ? `http://localhost:5000/${profile.profilePic?.replace('\\', '/')}` : def

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    Company Profile
                </h2>
                <div className="w-full bg-white rounded-lg shadow dark:border p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex justify-center mb-4">
                        <img src={profilePic} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{profile?.name}</h3>
                        <p className="text-gray-700">{profile?.website}</p>
                        <p className="text-gray-700">{profile?.phone}</p>
                        <p className="text-gray-700">{profile?.location}</p>
                        <p className="text-gray-700">{profile?.email}</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">About Us</h4>
                        <div>{profile?.description}</div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">No. of Employees</h4>
                        <div>{profile?.employeeCount}</div>
                    </div>
                    <button onClick={onEdit} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full">
                        Edit Profile
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CompanyProfileView;
