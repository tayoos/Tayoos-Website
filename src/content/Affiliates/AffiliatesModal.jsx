import React from 'react';

const AffiliatesModal = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Professional Memberships</h3>
                <ul className="list-disc ml-6">
                    <li>IEEE Member</li>
                    <li>ACM Member</li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Partner Organizations</h3>
                <ul className="list-disc ml-6">
                    <li>Tech Community Group</li>
                    <li>Local Developer Meetup</li>
                </ul>
            </div>
            <p className="text-lg font-semibold mb-2">More to Come</p>
        </div>
    );
};

export default AffiliatesModal;
