import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ items, cols, rowHeight }) => {
    const [layouts, setLayouts] = useState(
        Array.from({ length: items }, (_, i) => ({
            i: i.toString(),
            x: i % cols,
            y: Math.floor(i / cols),
            w: 1,
            h: 1,
        }))
    );

    return (
        <ResponsiveGridLayout className="layout" layouts={{ lg: layouts }} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} cols={{ lg: cols, md: cols, sm: cols, xs: cols, xxs: cols }} rowHeight={rowHeight} isDraggable={true} isResizable={true} onLayoutChange={(layout) => setLayouts(layout)} preventCollision={false}>
            {layouts.map((layout) => (
                <div key={layout.i} className="bg-gray-200 rounded-lg p-2 shadow cursor-move">
                    Item {parseInt(layout.i) + 1}
                </div>
            ))}
        </ResponsiveGridLayout>
    );
};

export default NCReactGridLayout;
