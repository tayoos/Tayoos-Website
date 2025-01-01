import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class ReactGridLayout extends React.Component {
    render() {
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
        };

        return (
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1650, md: 14, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={100}
                width={1200} // Add this
            >
                <div key="1" style={itemStyle}>
                    1
                </div>
                <div key="2" style={itemStyle}>
                    2
                </div>
                <div key="3" style={itemStyle}>
                    3
                </div>
            </ResponsiveGridLayout>
        );
    }
}

// Add some basic styling for the grid items
const itemStyle = {
    background: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
};

export default ReactGridLayout;
