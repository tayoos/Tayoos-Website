import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class ReactGridLayout extends React.Component {
    render() {
        // Define layouts for different breakpoints
        const layouts = {
            lg: [
                { i: '1', x: 0, y: 0, w: 4, h: 2 },
                { i: '2', x: 4, y: 0, w: 4, h: 2 },
                { i: '3', x: 8, y: 0, w: 4, h: 2 },
            ],
            md: [
                { i: '1', x: 0, y: 0, w: 3, h: 2 },
                { i: '2', x: 3, y: 0, w: 3, h: 2 },
                { i: '3', x: 6, y: 0, w: 4, h: 2 },
            ],
            // Add similar layouts for sm, xs, xxs if needed
        };

        return (
            <ResponsiveGridLayout className="layout" layouts={layouts} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} rowHeight={100}>
                <div key="1">1</div>
                <div key="2">2</div>
                <div key="3asdas">3</div>
            </ResponsiveGridLayout>
        );
    }
}

export default ReactGridLayout;
