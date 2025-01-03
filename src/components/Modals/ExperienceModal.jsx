import React from 'react';

const ExperienceModal = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Senior Developer - Tech Corp</h3>
                <p className="text-gray-600 dark:text-gray-300">2020 - Present</p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Led development of core platform features</li>
                    <li>Managed team of 5 developers</li>
                </ul>
            </div>
            {/* Add more experience items as needed */}
        </div>
    );
};

export default ExperienceModal;
