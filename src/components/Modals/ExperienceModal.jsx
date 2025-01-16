import React from 'react';

import logoCapgem from '../../assets/images/logos/Capgem.png';

const ExperienceModal = () => {
    const experiences = [
        {
            id: 1,
            title: 'Software Engineer // ETAS (Bosch Automotive Service Solutions)',
            location: 'Manchester, England, United Kingdom',
            shortdesc: 'Development of diagnostic insight tools leveraging machine learning for predictive maintenance, and optimization of data processing pipelines for enhanced system efficiency.',
            longdesc: `<p>• Successfully implemented MBSE into the ITER project with Fusion4Energy, developing a pilot model and providing comprehensive training on its benefits and proper implementation.</p>  

    <p>•    Conducted requirement change analysis for a defence project, including initial change impact assessment, enhancing project adaptability and risk management.</p>  
    <p>•	Contributed to AIRBUS NextWing and OneHeart development:</p>  

    <ul>  
        <li>Programmed a robust interface between Cameo and Delmia using Java for end-to-end functionality.</li>  
        <li>Developed a user-friendly Java plugin, enhancing accessibility and implemented efficient XML marshalling using a developed ontology, improving data handling, using kanban boards to task track completion.</li>  
        <li>Conducted architecture development using AIRBUS’ proprietary language, MOFLT, modelling functional, logical, and technical layers for levels 1-4, streamlining project design.</li>  
        <li>Developed an ontology and owned the adapter interface between Sparx EA and a Data Warehouse for XML data transfer using JavaScript, leading a team of 4 using an Agile Approach, managing workload and delivery, ensuring timely and high-quality outputs. Developed models for testing adapter using Sparx EA and NAF. Developed tool documentation.</li>  
    </ul>`,
            skills: 'Software Design · Software Development · JavaScript · Java · System Architecture · SysML · Requirements',
            Tools: 'Cameo · Sparx EA',
            logo: logoCapgem,
        },
    ];
    return <div className="space-y-6">{/* Add more experience items as needed */}</div>;
};

export default ExperienceModal;
