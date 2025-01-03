import React from 'react';

const TechSkillsModal = () => {
    return (
        <div className="grid grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold mb-3">Programming Languages</h3>
                <ul className="list-disc ml-6">
                    <li>JavaScript/TypeScript</li>
                    <li>Python</li>
                    <li>Java</li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3">Frameworks</h3>
                <ul className="list-disc ml-6">
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Django</li>
                </ul>
            </div>
        </div>
    );
};

export default TechSkillsModal;
