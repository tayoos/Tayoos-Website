import React from 'react';

const EducationCertificationModal = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Computer Science Degree</h3>
                <p className="text-gray-600 dark:text-gray-300">University Name, 2016-2020</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                <ul className="list-disc ml-6">
                    <li>AWS Certified Solutions Architect</li>
                    <li>Google Cloud Professional</li>
                </ul>
            </div>
        </div>
    );
};

export default EducationCertificationModal;
