import React from 'react';
import BallCanvas from '../../components/Ball/Ball';

import SWIcon from '../../assets/tech/SW.jpeg';
import VBAIcon from '../../assets/tech/VBA.png';
import CameoIcon from '../../assets/tech/Cameo_sm.png';
import SparxEAIcon from '../../assets/tech/SparxEA.png';
import ReactJSIcon from '../../assets/tech/reactjs.png';
import JavaScriptIcon from '../../assets/tech/Javascript.png';
import PythonIcon from '../../assets/tech/Python.png';
import SysMLIcon from '../../assets/tech/SysML.png';
import UMLIcon from '../../assets/tech/UML.png';
import AnsysIcon from '../../assets/tech/Ansys.png';
import MATLABIcon from '../../assets/tech/MATLAB.png';
import SimulinkIcon from '../../assets/tech/Simulink.png';
import ConfluenceIcon from '../../assets/tech/Confluence.jpg';
import CSSIcon from '../../assets/tech/css.png';
import DockerIcon from '../../assets/tech/Docker.png';
import GitIcon from '../../assets/tech/git.png';
import HTMLIcon from '../../assets/tech/HTML.png';
import MscPatranIcon from '../../assets/tech/Python.png';

const FallbackComponent = ({ error }) => {
    return (
        <div role="alert" className="p-4 bg-red-100 text-red-800">
            <p className="font-bold">Something went wrong:</p>
            <pre className="mt-2 bg-red-200 p-2 rounded">{error.message}</pre>
        </div>
    );
};

const TechSkillsModal = () => {
    const techItems = [
        { name: 'SolidWorks', icon: SWIcon },
        { name: 'Excel/VBA', icon: VBAIcon },
        { name: 'CAMEO SM', icon: CameoIcon },
        { name: 'Sparx EA', icon: SparxEAIcon },
        { name: 'ReactJS', icon: ReactJSIcon },
        { name: 'JavaScript', icon: JavaScriptIcon },
        { name: 'Python', icon: PythonIcon },
        { name: 'SysML', icon: SysMLIcon },
        { name: 'UML', icon: UMLIcon },
        { name: 'ANSYS', icon: AnsysIcon },
        { name: 'MATLAB', icon: MATLABIcon },
        { name: 'Simulink', icon: SimulinkIcon },
        { name: 'Confluence', icon: ConfluenceIcon },
        { name: 'CSS', icon: CSSIcon },
        { name: 'Docker', icon: DockerIcon },
        { name: 'git', icon: GitIcon },
        { name: 'HTML', icon: HTMLIcon },
        { name: 'Msc Patran', icon: MscPatranIcon },
    ];

    const skillItems = ['Problem Solving', 'Agile Methodology', 'Team Collaboration', 'Communication'];

    return (
        <ErrorBoundary FallbackComponent={FallbackComponent}>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-3">Tech</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {techItems.map((tech, index) => (
                            <div key={index} className="flex flex-col items-center justify-center">
                                <BallCanvas icon={tech.icon} />
                                <p className="mt-2 text-sm text-center">{tech.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Skills</h3>
                    <ul className="list-disc ml-6">
                        {skillItems.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default TechSkillsModal;
