import React from 'react';

import logoCapgem from '../../assets/images/logos/Capgem.png';
import logoJacobs from '../../assets/images/logos/Jacobs.png';
import logoAlten from '../../assets/images/logos/Alten.png';
import logoRollsRoyce from '../../assets/images/logos/RollsRoyce.png';

const ExperienceModal = () => {
    const [activeExperienceId, setActiveExperienceId] = useState(null);

    const experiences = [
        {
            id: 1,
            title: 'Capgemini -Consultant Engineer (Senior MB Systems and Software Engineer)',
            location: 'Birmingham, England United Kingdom',
            shortdesc: 'Successfully implemented MBSE into the ITER project, conducted requirement change analysis for defense projects, and contributed to AIRBUS NextWing and OneHeart development.',
            longdesc: `
            <p>• Successfully implemented MBSE into the ITER project with Fusion4Energy, developing a pilot model and providing comprehensive training on its benefits and proper implementation.</p>
            <p>• Conducted requirement change analysis for a defence project, including initial change impact assessment, enhancing project adaptability and risk management.</p>
            <p>• Contributed to AIRBUS NextWing and OneHeart development:</p>
            <ul>
                <li>Programmed a robust interface between Cameo and Delmia using Java for end-to-end functionality.</li>
                <li>Developed a user-friendly Java plugin, enhancing accessibility and implemented efficient XML marshalling using a developed ontology, improving data handling, using kanban boards to task track completion.</li>
                <li>Conducted architecture development using AIRBUS’ proprietary language, MOFLT, modelling functional, logical, and technical layers for levels 1-4, streamlining project design.</li>
                <li>Developed an ontology and owned the adapter interface between Sparx EA and a Data Warehouse for XML data transfer using JavaScript, leading a team of 4 using an Agile Approach, managing workload and delivery, ensuring timely and high-quality outputs. Developed models for testing adapter using Sparx EA and NAF. Developed tool documentation.</li>
            </ul>
            <p>• Developed training packs for MBDA to train both external clients and internal employees.</p>
        `,

            skills: 'Software Design · Software Development · JavaScript · Java · System Architecture · SysML · Requirements',
            Tools: 'Cameo · Sparx EA · MOFLT · JavaScript',
            logo: logoCapgem,
        },
        {
            id: 2,
            title: 'Jacobs – Consultant Engineer (Enterprise Architect/Systems Engineer)',
            location: 'Derby, England United Kingdom',
            shortdesc: 'Developed Enterprise Architecture for Network Rail, using SWOT and PESTLE analysis for project design and risk management.',
            longdesc: `
            <p>• Engineering consultant contracted as a Systems/Enterprise Architect to Network Rail for the Transpennine Route Upgrade project in the railway industry.</p>
            <p>• Developed Enterprise Architecture for the whole project, individual systems, and at various key outputs in the design process as well as a WBS for the project based on business and systems requirements available:</p>
            <ul>
                <li>Developed Architecture Plan baselining with “As Is” architecture and “To-be” Architecture.</li>
                <li>Used SWOT Analysis to find the strengths and weaknesses of the business and PESTLE to find areas that could affect the project moving forward.</li>
                <li>Developed business architecture and aligning with business requirements set by NR.</li>
                <li>Carried out requirements analysis on the business requirements.</li>
            </ul>
            <p>• Addressed interfacing risks and applied mitigation strategies between components in architecture diagrams, reducing potential issues.</p>
            <p>• Ensured comprehensive system definition for architecture designs, facilitating accessibility of essential information.</p>
        `,
            skills: 'Enterprise Architecture · Systems Architecture · Requirements Analysis · SWOT Analysis · PESTLE · Risk Management',
            Tools: 'Architecture Design · WBS · Systems Modeling',
            logo: logoJacobs, // Replace with the appropriate image or logo
        },
        {
            id: 3,
            title: 'Alten Engineering – Consultant Engineer (Systems and Software Engineer)',
            location: 'Birmingham, England United Kingdom',
            shortdesc: 'Worked as a Systems and Software Verification Engineer for Rolls-Royce, utilizing Python and .ROBOT framework for engine maintenance projects.',
            longdesc: `
            <p>• Engineering consultant contracted to Rolls-Royce as a Systems and Software Verification Engineer for the ECOSIStem project, aimed at streamlining code testing and development for engine maintenance and enhancement.</p>
            <p>• Utilized Python and .ROBOT framework to develop and analyse test cases, ensuring easy testing of new code implementations.</p>
            <p>• Reviewed, revised and verified test cases, improving quality and ensuring compliance, facilitating necessary reworks for approval.</p>
            <p>• Initiated and developed a knowledge-sharing database, aiding integration of new consultants and enhancing information exchange among colleagues.</p>
        `,
            skills: 'Systems Verification · Python · .ROBOT Framework · Test Case Development · Knowledge Management · Software Testing',
            Tools: 'Python · .ROBOT · Knowledge Sharing Systems',
            logo: logoAlten, // Replace with the appropriate image or logo
        },
        {
            id: 5,
            title: 'Rolls-Royce - Performance Engineer',
            location: 'Bristol, England United Kingdom',
            shortdesc: 'Worked in the combat aftermarket division, improving data accuracy with MATLAB tools and managing multiple projects.',
            longdesc: `
            <p>• Performance Engineer in the combat aftermarket division, gaining hands-on experience in engineering and management tasks.</p>
            <p>• Reformed and implemented a MATLAB trending tool to analyse and present data, incorporating advanced analytical processes (using VBA for data storage), and validated the tool, significantly enhancing data accuracy and decision-making. Presented analysed data.</p>
            <p>• Managed two projects, including leading a team of two and also managing a larger project:</p>
            <ul>
                <li>Responsibilities included tracking project charters, managing resources, and ensuring deliverables were met, identifying and managing risks.</li>
            </ul>
            <p>• Wrote Pass-off trending reports and conducted analysis for Rolls-Royce-manufactured jet engines.</p>
        `,
            skills: 'MATLAB · VBA · Data Analysis · Project Management · Risk Management · Engineering Reporting',
            Tools: 'MATLAB · VBA · Engineering Tools',
            logo: logoRollsRoyce, // Replace with the appropriate image or logo
        },
        {
            id: 6,
            title: 'Rolls-Royce - E-Fan X Development Engineer',
            location: 'Bristol, England United Kingdom',
            shortdesc: 'Developed verification strategies for the Electric Propulsion Unit system and led key sub-systems in the E-Fan X project.',
            longdesc: `
            <p>• Defined verification strategies aligning with customer, business, and aviation authority (EASA) requirements for the Electric Propulsion Unit system.</p>
            <p>• Hosted workshops with system designers to define verification methods for various sub-systems.</p>
            <p>• Developed and sequenced the verification strategy.</p>
            <p>• Took ownership of delivering key sub-systems including Fan Systems, Structures & Flow paths, and Bypass & Exhausts:</p>
            <ul>
                <li>Led working groups and conducted meetings to ensure project delivery.</li>
            </ul>
            <p>• Acquired technical knowledge and capabilities, establishing standardized baselines for program and project management in a global, multifaceted company.</p>
        `,
            skills: 'Verification Strategies · Systems Engineering · Client Interaction · Workshop Facilitation · Sub-system Management',
            Tools: 'IBM DOORS · MATLAB · Excel · VBA',
            logo: logoRollsRoyce, // Replace with the appropriate image or logo
        },
    ];

    const handleExperienceClick = (experience) => {
        openModal(<ExperienceModalContent experience={experience} />);
    };

    return (
        <div className="ExperienceContainer">
            <div className="experience-list-modal">
                {experiences.map((experience) => (
                    <div key={experience.id} className={`experience-item-modal ${experience.id === experience.id ? 'active' : ''}`} onClick={() => handleExperienceClick(experience)}>
                        {experience.title}
                    </div>
                ))}
            </div>
            <div className="experience-detail-modal">
                <div className="modal-header">
                    <img src={experience.logo} alt={`${experience.title} logo`} className="company-logo" />
                    <div className="modal-text">
                        <h2>{experience.title}</h2>
                        <h3>{experience.location}</h3>
                    </div>
                </div>
                <div className="skills" dangerouslySetInnerHTML={{ __html: experience.skills }} />

                <div dangerouslySetInnerHTML={{ __html: experience.longdesc }} />
            </div>
        </div>
    );
};

export default ExperienceModal;
