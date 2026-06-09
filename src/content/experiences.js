/**
 * Work experience content for the Experience modal (taskbar → Experience).
 *
 * Edit roles, summaries, skills, and optional full-detail sections here.
 * Order in the array = order in the sidebar (first item opens by default; current role first).
 *
 * logoKey (optional) must match a key in EXPERIENCE_LOGOS below; omit to use site default logo.
 *
 * Titles (consultant roles):
 *   company, tabRole — sidebar / mobile list (actual role)
 *   pageRole — optional; defaults to tabRole in the modal header
 *   secondaryRole — optional second role on the same line as the job title (e.g. Enterprise Architect)
 *   secondaryRoleFirst — when true, secondaryRole appears before tabRole in the header (Jacobs: EA · SA)
 *   contractTitle — e.g. "Consultant Engineer", shown in brackets on the role line
 *   programmeLabel — e.g. "E-Fan X", purple key-project line below the role (detail header only, not nav)
 *
 * Nav grouping: consecutive entries with the same `company` auto-group in the sidebar (see buildExperienceNavSections in ExperienceModal.jsx).
 *
 * detail (optional): { lead, sections: [{ tone, heading, body }] }
 *   tone: iter | defence | aerospace | training | default
 */

import logoCapgem from '../assets/images/logos/Capgem';
import logoJacobs from '../assets/images/logos/Jacobs';
import logoAlten from '../assets/images/logos/Alten';
import logoRollsRoyce from '../assets/images/logos/RollsRoyce';
import logoAtkinsRealis from '../assets/images/logos/AtkinsRealis';

const EXPERIENCE_LOGOS = {
    capgemini: logoCapgem,
    jacobs: logoJacobs,
    alten: logoAlten,
    rollsRoyce: logoRollsRoyce,
    atkinsRealis: logoAtkinsRealis,
};

/** Site logo (public/logo2mcv4.svg) — used when logoKey is missing */
export const DEFAULT_EXPERIENCE_LOGO = '/logo2mcv4.svg';

export const experiences = [

        {
            id: 7,
            company: 'AtkinsRéalis',
            logoKey: 'atkinsRealis',
            tabRole: 'Senior Model-Based Systems and Software Engineer',
            secondaryRole: 'Enterprise Architect',
            contractTitle: 'Consultant Engineer',
            title: 'AtkinsRéalis – Senior Model-Based Systems and Software Engineer',
            location: 'Birmingham, England, United Kingdom',
            shortdesc:
                'Mission Engineering and Enterprise Architecture for MOD capability planning and system development. NAFv4, ArchiMate and SysML models linking operational need to systems design, layered EA across business, application and technology, architecture governance and stakeholder traceability from strategic intent to solution design, and training on Sparx EA, SysML and ArchiMate.',
            longdesc: `
            <p>At AtkinsRéalis I worked at the intersection of Mission Engineering and Enterprise Architecture, supporting MOD capability planning and system development across some of the UK's most complex defence programmes.</p>
            <p>Led Mission Engineering models using NAFv4 and ArchiMate (Navy and MOD frameworks), aligning operational capability needs with system development from strategic intent through to physical system realisation, and extended this into SysML to bridge enterprise operational architectures and downstream systems engineering design and improve cross-discipline traceability.</p>
            <p>Developed layered Enterprise Architectures for MOD programmes, including capability models, application landscapes and technology roadmaps to support investment decisions and capability planning, with stakeholder engagement across engineering and programme teams to translate operational needs into structured architecture views.</p>
            <p>Introduced Mission Engineering as a structured methodology across programmes to improve consistency and traceability from strategy through to design, and supported architecture governance including architecture review boards and decision authority frameworks in line with programme and MOD standards.</p>
            <p>Led internal training on Sparx EA, SysML, and ArchiMate to build team competency and consistency across architecture models.</p>
            `,
            skills:
                'Mission Engineering · Enterprise Architecture · NAFv4 · ArchiMate · SysML · Sparx EA · Capability Planning · Architecture Governance · Stakeholder Engagement',
            Tools: 'Sparx EA · ArchiMate · SysML · NAF',
            dates: 'June 2025 – Present',
            detail: {
                lead: '<p>At AtkinsRéalis I worked at the intersection of Mission Engineering and Enterprise Architecture, supporting MOD capability planning and system development across some of the UK\'s most complex defence programmes.</p>',
                sections: [
                    {
                        tone: 'defence',
                        heading: 'Mission Engineering',
                        body: '<p>I led the development of Mission Engineering models using NAFv4 and ArchiMate, applying both the Navy and MOD Mission Engineering frameworks to align operational capability needs with system development across the spectrum from strategic intent to physical system realisation. I extended this work into SysML, bridging enterprise-level operational architectures and the systems engineering design models used downstream to improve cross-discipline traceability where those disciplines had historically worked in silos.</p><p>I also drove adoption of Mission Engineering as a structured methodology across programmes, improving consistency and traceability from strategy through to design.</p>',
                    },
                    {
                        tone: 'default',
                        heading: 'Enterprise Architecture',
                        body: '<p>I developed layered Enterprise Architectures across business, application and technology layers for MOD programmes, producing capability models, application landscape views and technology roadmaps to inform investment decisions and capability planning.</p><p>Stakeholder engagement across engineering and programme teams was a core part of the role: translating operational needs into structured architecture views with coherent traceability from strategic intent through to solution design. I supported architecture governance processes, including architecture review boards and decision authority frameworks, ensuring compliance with programme and MOD standards.</p>',
                    },
                    {
                        tone: 'training',
                        heading: 'Training & Capability Building',
                        body: '<p>I delivered training and internal guidance on Sparx EA, SysML and ArchiMate, building team competency and driving consistency and quality across architecture models produced within the practice.</p>',
                    },
                ],
            },
        },
        {
            id: 1,
            company: 'Capgemini',
            tabRole: 'Senior Model-Based Software and Systems Engineer',
            contractTitle: 'Consultant Engineer',
            title: 'Capgemini – Senior Model-Based Software and Systems Engineer',
            location: 'Birmingham, England, United Kingdom',
            shortdesc:
                'Successfully implemented MBSE into the ITER Project with Fusion4Energy, developing a pilot model using MagicGrid in Cameo to create a digital twin of the Tokamak Building. Providing comprehensive training on its benefits and proper implementation, building MBSE understanding within Fusion4Energy and bring attention to its implementation within the company and executives.',
            longdesc: `
            <p>Successfully implemented MBSE into the ITER project with Fusion4Energy, developing a pilot model and providing comprehensive training on its benefits and proper implementation.</p>
            <p>Conducted requirement change analysis for a defence project, including initial impact assessment to identify risks and improve risk management by understanding the effects of proposed changes.</p>
            <p>Contributed to the development of AIRBUS NextWing, an Airbus-led initiative using digital tools to accelerate wing design through semantic integration, and OneHeart architecture models development:</p>
            <ul>
                <li>Designed and implemented an end-to-end Java interface between Cameo and Delmia, reducing manual effort in model updates, this allowed for faster transferring and updating of data between tools.</li>
                <li>Developed a user-friendly Java plugin, enhancing accessibility by implemented efficient XML marshalling using a developed ontology, improving data handling, and improved processing times by 15% between initial version and completed version – carried out using kanban boards to track task completion.</li>
                    <ul>
                        <li>Java front end plugin development improving the ease of access.</li>
                        <li>Use of JAXB package for XML marshalling using a developed ontology.</li>
                    </ul> 
                <li>Conducted architecture development using AIRBUS’ proprietary language, MOFLT, modelling functional, logical, and technical layers for ontological levels 1-4, to assist in realising their system design.</li>
                <li>Developed an ontology for use between the different tools as a template for both of them to understand each other. </li>
                <li>Led the development of an ontology-driven adapter interface between Sparx EA and a Neo4j Data Warehouse for XML data transfer using JavaScript, managing a team of 4 engineers using an Agile approach. Oversaw workload distribution, sprint planning, and delivery, ensuring high-quality outputs and improving data processing speed upon completion.</li>
                    <ul>
                        <li>Developed Architecture Models to give an understanding of what is being developed to the team and allow for quantifiable measures of success.</li>
                        <li>Developed base code that could be used by the team to carry out key functions.</li>
                        <li>Extracting information from the model using MySQL.</li>
                        <li>Carried out code reviews to ensure quality.</li>
                        <li>Developed models for testing adapter using Sparx EA and NAF.</li>
                        <li>Developed tool documentation.</li>
                        <li>Developed a graph database in Neo4j for use as a data warehouse for transferring data between the various tools.</li>
                    </ul> 
                </li>
            </ul>
            <p>Developed and delivered MBSE training packs for MBDA, training internal teams and external clients, improving MBSE competency across 5+ engineering departments.</p>
            <p>Developed an ontology for nuclear waste services designed to facilitate digital safety case integration.</p>
            <ul>
                <li>Developed integration strategies for the digital safety case</li>
                <li>Ensured interoperability with other parts of the organization</li>
                <li>Provided a strategy for configuration management</li>
            </ul>


            `,

            skills: 'Software Design · Software Architecture · Software Development · System Architecture · JavaScript · Java · MySQL · SysML ·  UML · NAF · Requirements',
            Tools: 'Cameo · Sparx EA · MOFLT · JavaScript',
            logoKey: 'capgemini',
            dates: 'November 2022 – June 2025',
            detail: {
                lead: '<p>During my time at Capgemini I worked across some of the most technically complex and high-profile engineering programmes in the nuclear, defence, and aerospace sectors, applying Model-Based Systems Engineering, software engineering, and architecture development to solve real integration and capability challenges.</p>',
                sections: [
                    {
                        tone: 'iter',
                        heading: 'ITER / Fusion4Energy — MBSE Pilot & Digital Twin',
                        body: '<p>Fusion4Energy needed to validate whether MBSE was a viable approach for managing the complexity of the ITER Tokamak Building before committing to wider adoption. I developed a pilot digital twin model using MagicGrid in Cameo, translating physical system complexity into a structured, queryable model. Alongside the technical delivery I designed and delivered training to build internal MBSE competency and secured executive awareness of its value — turning a proof of concept into a credible case for programme-wide adoption.</p>',
                    },
                    {
                        tone: 'defence',
                        heading: 'Defence — Requirements Change Analysis',
                        body: '<p>Working on a classified defence project, I conducted requirement change analysis and impact assessments to identify and manage the risks introduced by proposed changes to system requirements, supporting informed decision-making and improving overall risk management practice on the programme.</p>',
                    },
                    {
                        tone: 'aerospace',
                        heading: 'Airbus NextWing & OneHeart — Architecture & Tool Integration',
                        body: `<p>I contributed to two major Airbus initiatives aimed at transforming how aircraft are designed through digital tools and semantic integration. On the architecture side, I developed models using Airbus' proprietary MOFLT language across functional, logical, and technical layers at ontological levels 1–4, directly supporting the realisation of the NextWing system design.</p>
                        <p>On the software side, I designed and implemented an end-to-end Java interface between Cameo and Delmia, eliminating manual effort in model updates and significantly accelerating data transfer between the two tools. I also developed a Java plugin using XML marshalling against a custom ontology, improving data handling and delivering a 15% increase in processing speed between the initial and final versions, managed throughout using Kanban.</p>
                        <p>To underpin the data architecture, I led a team of four engineers in developing an ontology-driven adapter between Sparx EA and a Neo4j data warehouse, enabling XML data transfer via JavaScript. I oversaw sprint planning, workload distribution, and delivery using an Agile approach, and produced full tool documentation to ensure the solution was maintainable and transferable. I also designed and implemented the Neo4j graph database itself as the central data warehouse, with model data extracted and queried via MySQL, and architected supporting test models in Sparx EA using NAF.</p>`,
                    },
                    {
                        tone: 'training',
                        heading: 'MBDA — MBSE Training',
                        body: '<p>I developed and delivered MBSE training packs for MBDA, working with both internal Capgemini teams and external client engineers. The programme improved MBSE competency across more than five engineering departments, helping embed model-based practice into teams that had previously worked in document-centric ways.</p>',
                    },
                ],
            },
        },
        {
            id: 2,
            company: 'Jacobs',
            tabRole: 'Systems Architect',
            secondaryRole: 'Enterprise Architect',
            secondaryRoleFirst: true,
            contractTitle: 'Consultant Engineer',
            title: 'Jacobs – Systems Architect',
            location: 'Birmingham, England, United Kingdom',
            shortdesc:
                'Systems/Enterprise Architect embedded on Network Rail\'s Transpennine Route Upgrade (TRU) — layered EA with TOGAF and TraK, architecture governance, and interface architecture across a large interacting system landscape.',
            longdesc: `
            <p>At Jacobs I was contracted as a Systems/Enterprise Architect to Network Rail, embedded on the Transpennine Route Upgrade (TRU) — one of the UK's largest rail infrastructure programmes at the time.</p>
            <p>Developed layered Enterprise Architectures using TOGAF and Network Rail's TraK framework, with business capability models, roadmaps, and an Architecture Plan baselining As-Is and To-Be states.</p>
            <p>Defined system interface architecture and mitigation strategies; conducted SWOT and PESTLE analyses to inform integration decisions.</p>
            `,
            skills:
                'Enterprise Architecture · Business Architecture · TOGAF · TraK · Interface Architecture · SWOT · PESTLE · Risk Management · Stakeholder Mapping',
            Tools: 'Architecture Design · Capability Modelling · Roadmapping',
            logoKey: 'jacobs',
            dates: 'February 2022 – November 2022',
            detail: {
                lead: '<p>At Jacobs I was contracted as a Systems/Enterprise Architect to Network Rail, embedded on the Transpennine Route Upgrade (TRU) — one of the UK\'s largest rail infrastructure programmes at the time.</p>',
                sections: [
                    {
                        tone: 'default',
                        heading: 'Enterprise & Business Architecture',
                        body: '<p>Working across the full architecture stack, I developed layered Enterprise Architectures across business, application, and technology domains using TOGAF and Network Rail\'s TraK framework, producing architecture definitions for the overall programme and individual systems at key design milestones. At the business architecture level, stakeholder maps, business capability models, and architecture roadmaps were developed to align programme objectives with operational needs and surface strategic risks and opportunities early.</p>',
                    },
                    {
                        tone: 'defence',
                        heading: 'Architecture Governance & Planning',
                        body: '<p>To govern the architecture across the programme, I established an Architecture Plan defining the governance approach, baselining the As-Is and To-Be architectures, and producing capability roadmaps aligned to Network Rail\'s strategic business requirements.</p>',
                    },
                    {
                        tone: 'iter',
                        heading: 'Interface Architecture & Risk',
                        body: '<p>Across a programme with a very large number of interacting systems, I defined the system interface architecture, identifying interfacing risks and developing mitigation strategies to reduce cross-system integration issues. SWOT and PESTLE analyses were also conducted to assess external factors and programme strengths, directly shaping integration decisions and helping mitigate potential programme delays.</p>',
                    },
                ],
            },
        },
        {
            id: 3,
            company: 'Alten Engineering',
            tabRole: 'Systems and Software Engineer',
            contractTitle: 'Consultant Engineer',
            title: 'Alten Engineering – Systems and Software Engineer',
            location: 'Derby, England, United Kingdom',
            shortdesc: 'Worked as a Systems and Software Verification Engineer for Rolls-Royce, utilizing Python and .ROBOT framework for engine maintenance projects.',
            longdesc: `
            <p>Engineering consultant contracted to Rolls-Royce as a Systems and Software Verification Engineer for the ECOSIStem project, aimed at streamlining code testing and development for engine maintenance and enhancement.</p>
            <p>Utilized Python and .ROBOT framework to develop and analyse test cases as well as creating integration tests, ensuring easy testing of new code implementations.</p>
            <p>Reviewed, revised and verified test cases, improving quality and ensuring compliance, facilitating necessary reworks for approval.</p>
            <p>Created a knowledge-sharing database, improving onboarding efficiency for new consultants and enhancing collaborative information exchange, reducing onboarding time and improving knowledge retention.</p>
        `,
            skills: 'Software Development · Software Design · Software Testing · Integration Tests · Systems Verification · Python · .ROBOT Framework · Test Case Development',
            Tools: 'Python · .ROBOT · Knowledge Sharing Systems',
            logoKey: 'alten',
        },
        {
            id: 5,
            title: 'Rolls-Royce – Performance Engineer',
            location: 'Bristol, England, United Kingdom',
            shortdesc:
                'Combat Aftermarket placement — reformed a MATLAB performance trending tool, delivered analysis to BAE Systems, and led or co-managed projects with teams of two and twenty-plus.',
            longdesc: `
            <p>Reformed, rewrote, and validated a MATLAB performance trending tool used to analyse engine data, producing outputs and pass-off trending reports presented directly to BAE Systems.</p>
            <p>Led a team of two engineers on an independent workstream, and co-managed a programme-level project with a team of more than twenty, overseeing the project charter, resource management, and reporting to Project Team Leads.</p>
            <p>Completed formal technical training including the Adour Extended Familiarisation Course, Holistic Gas Turbine Course, and Gas Turbine Performance Course, building foundational engineering understanding across gas turbine systems and performance analysis.</p>
            `,
            skills:
                'MATLAB · Performance Analysis · Project Management · Gas Turbines · Engineering Reporting · Team Leadership',
            Tools: 'MATLAB · Engineering Analysis',
            logoKey: 'rollsRoyce',
            dates: 'January 2019 – August 2019',
            detail: {
                lead: '<p>Working in the Combat Aftermarket division, this role spanned both engineering delivery and project management on live defence programmes, providing early exposure to the rigour and pace of a global aerospace business.</p>',
                sections: [
                    {
                        tone: 'aerospace',
                        heading: 'MATLAB Trending Tool — Performance Analysis',
                        body: '<p>Tasked with improving an existing performance analysis capability, I reformed, rewrote, and validated a MATLAB trending tool used to analyse engine performance data, producing outputs and pass-off trending reports presented directly to BAE Systems.</p>',
                    },
                    {
                        tone: 'default',
                        heading: 'Project Management',
                        body: '<p>Across two concurrent workstreams, I led a team of two engineers on an independent task while co-managing a programme-level project with a team of more than twenty — overseeing the project charter, managing resource allocation, and relaying progress and decisions to Project Team Leads.</p>',
                    },
                    {
                        tone: 'training',
                        heading: 'Technical Development',
                        body: '<p>To deepen technical grounding in gas turbine systems, I completed formal training including the Adour Extended Familiarisation Course, Holistic Gas Turbine Course, and Gas Turbine Performance Course during the role.</p>',
                    },
                ],
            },
        },
        {
            id: 6,
            title: 'Rolls-Royce – Development Engineer',
            programmeLabel: 'E-Fan X',
            location: 'Bristol, England, United Kingdom',
            shortdesc:
                'Verification strategy for the E-Fan X Electric Propulsion Unit — workshops with system designers, EASA-aligned verification planning, and ownership of three sub-system verification areas.',
            longdesc: `
            <p>Contributed to the E-Fan X Hybrid Electric Propulsion System, a multi-million-pound joint aerospace initiative to develop hybrid electric flight technology.</p>
            <p>Defined verification strategies for customer, business, and EASA requirements across the Electric Propulsion Unit, hosting cross-functional workshops with system designers and sequencing the wider verification programme.</p>
            <p>Held direct ownership of verification across three sub-systems — Systems, Structures & Flow paths, and Bypass & Exhausts — delivering to the rigorous standards required of a safety-critical aerospace programme.</p>
            `,
            skills:
                'Verification Strategy · Systems Engineering · EASA Requirements · Workshop Facilitation · Sub-system Ownership · Safety-Critical Documentation',
            Tools: 'IBM DOORS · MATLAB · Excel · VBA',
            logoKey: 'rollsRoyce',
            dates: 'June 2018 – December 2018',
            detail: {
                lead: '<p>My first placement at Rolls-Royce placed me at the heart of one of the most ambitious aerospace programmes of its time — the E-Fan X Hybrid Electric Propulsion System, a multi-million-pound joint initiative to develop hybrid electric flight.</p>',
                sections: [
                    {
                        tone: 'defence',
                        heading: 'Verification Strategy — Electric Propulsion Unit',
                        body: '<p>My role centred on defining how customer, business, and EASA requirements would be verified across the Electric Propulsion Unit system. This involved hosting workshops with system designers across multiple sub-systems, gathering technical information, defining appropriate verification methods, and sequencing the wider verification programme. Outside of workshops I was responsible for populating the verification strategy documentation to the standard required for a safety-critical aerospace programme.</p>',
                    },
                    {
                        tone: 'aerospace',
                        heading: 'Sub-System Ownership',
                        body: '<p>I took direct ownership and responsibility for the verification of three sub-systems — Systems, Structures & Flow paths, and Bypass & Exhausts — giving me early and meaningful accountability on a programme of genuine international significance.</p>',
                    },
                ],
            },
        },
];

/** Company, role line, optional secondary role, contract, key-project label */
export function getExperienceHeaderMeta(experience) {
    if (experience?.company) {
        return {
            company: experience.company,
            role: experience.pageRole ?? experience.tabRole ?? '',
            secondaryRole: experience.secondaryRole || null,
            secondaryRoleFirst: Boolean(experience.secondaryRoleFirst),
            contractTitle: experience.contractTitle || null,
            programmeLabel: experience.programmeLabel || null,
        };
    }
    const parts = (experience?.title ?? '').split(' – ');
    if (parts.length >= 2) {
        return {
            company: parts[0].trim(),
            role: parts
                .slice(1)
                .join(' – ')
                .replace(/\s*\([^)]*\)\s*$/, '')
                .trim(),
            secondaryRole: experience.secondaryRole || null,
            secondaryRoleFirst: Boolean(experience.secondaryRoleFirst),
            contractTitle: experience.contractTitle || null,
            programmeLabel: experience.programmeLabel || null,
        };
    }
    return {
        company: null,
        role: experience?.title ?? '',
        secondaryRole: experience.secondaryRole || null,
        secondaryRoleFirst: Boolean(experience.secondaryRoleFirst),
        contractTitle: experience.contractTitle || null,
        programmeLabel: experience.programmeLabel || null,
    };
}

/** Sidebar / mobile list: company on top, full role line below (both roles when set; no programme label) */
export function getExperienceTabParts(experience) {
    const { company, role, secondaryRole, secondaryRoleFirst } = getExperienceHeaderMeta(experience);
    const leadRole = secondaryRoleFirst && secondaryRole ? secondaryRole : role;
    const trailRole = secondaryRoleFirst && secondaryRole ? role : secondaryRole;
    const roleLine = trailRole ? `${leadRole} · ${trailRole}` : leadRole;
    if (company) return { company, role: roleLine };
    return { role: roleLine || experience?.title || '', company: null };
}

/** Resolves logoKey → imported image for components */
export function getExperiences() {
    return experiences.map(({ logoKey, ...experience }) => ({
        ...experience,
        logo: (logoKey && EXPERIENCE_LOGOS[logoKey]) || DEFAULT_EXPERIENCE_LOGO,
        title:
            experience.title ??
            (experience.company && experience.tabRole ? `${experience.company} – ${experience.tabRole}` : experience.title),
    }));
}
