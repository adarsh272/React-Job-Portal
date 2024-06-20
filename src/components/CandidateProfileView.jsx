import React from 'react';
import def from '../assets/images/default-profile.png';

const CandidateProfileView = ({ profile, onEdit }) => {
    const profilePic = profile.profilePic ? `http://localhost:5000/${profile.profilePic?.replace('\\', '/')}` : def

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    Candidate Profile
                </h2>
                <div className="w-full bg-white rounded-lg shadow dark:border p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex justify-center mb-4">
                        <img src={profilePic} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                        <h5 className="text-xl font-bold text-gray">{profile.designation}</h5>
                        <p className="text-gray-700">{profile.email}</p>
                        <p className="text-gray-700">{profile.phoneNumber}</p>
                        <p className="text-gray-700">{profile.location}</p>
                        <p className="text-gray-700">{profile.website}</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Work Experience</h4>
                        {profile.workExperience.length > 0 ? profile.workExperience.map((exp, index) => (
                            <div key={index} className="mt-4">
                                <h5 className="text-lg font-bold text-gray-900">{exp.companyName}</h5>
                                <strong className="text-gray-700">{exp.designation}</strong>
                                <p className="text-gray-700">{exp.startDate.split('T')[0]} - {exp.endDate.split('T')[0] || 'Present'}</p>
                                <p className="text-gray-700">{exp.responsibilities}</p>
                            </div>
                        )) : <div>Please add your work experience/projects by editing your profile</div>}
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Skills</h4>
                        <ul className="list-disc list-inside">
                            {profile.skills.length > 0 ? profile.skills.map((skill, index) => (
                                <li key={index} className="text-gray-700">{skill}</li>
                            )) : <div>Please add your skills by editing your profile</div>}
                        </ul>
                    </div>
                    <button onClick={onEdit} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full">
                        Edit Profile
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CandidateProfileView;
