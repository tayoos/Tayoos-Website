import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import PhotoWidget from './Widgets/PhotoWidget';
import TextCardWidget from './Widgets/TextCardWidget';
import MusicWidget from './Widgets/MusicWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ isDarkMode }) => {
    const containerRef = useRef(null);

    // Add rowHeight state
    const [rowHeight, setRowHeight] = useState(40);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('xxl');
    const [layouts, setLayouts] = useState(generateInitialLayout);
    const [containerWidth, setContainerWidth] = useState('1650px');
    const [maxHeight, setMaxHeight] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const breakpoints = {
        xxl: 1650,
        xl: 1200,
        md: 768,
        sm: 480,
        xs: 0,
    };

    const gridCols = {
        xxl: 20,
        xl: 20,
        md: 16,
        sm: 12,
        xs: 8,
    };

    const gridRows = {
        xxl: 20,
        xl: 18,
        md: 16,
        sm: 12,
        xs: 8,
    };

    useEffect(() => {
        const updateContainerSize = () => {
            const width = window.innerWidth;
            let newBreakpoint = 'xs';

            // Update container width and breakpoint
            if (width >= breakpoints.xxl) {
                setContainerWidth('1650px');
                newBreakpoint = 'xxl';
            } else if (width >= breakpoints.xl) {
                setContainerWidth('1200px');
                newBreakpoint = 'xl';
            } else if (width >= breakpoints.md) {
                setContainerWidth('768px');
                newBreakpoint = 'md';
            } else if (width >= breakpoints.sm) {
                setContainerWidth('480px');
                newBreakpoint = 'sm';
            } else {
                setContainerWidth('100%');
                newBreakpoint = 'xs';
            }

            setCurrentBreakpoint(newBreakpoint);

            if (containerRef.current) {
                const taskbar = document.querySelector('.taskbar');
                const containerTop = containerRef.current.getBoundingClientRect().top;
                const taskbarTop = taskbar ? taskbar.getBoundingClientRect().top : window.innerHeight;
                const availableHeight = taskbarTop - containerTop;

                // Calculate row height based on available height and current breakpoint's row count
                const currentRowCount = gridRows[newBreakpoint];
                const calculatedRowHeight = Math.floor(availableHeight / currentRowCount);

                // Set minimum row height to maintain usability
                const finalRowHeight = Math.max(calculatedRowHeight, 50);
                setRowHeight(finalRowHeight);

                // Update maxHeight based on new row height
                const rowHeightUnits = Math.floor(availableHeight / finalRowHeight);
                setMaxHeight(rowHeightUnits);
            }
        };

        updateContainerSize();
        window.addEventListener('resize', updateContainerSize);
        return () => window.removeEventListener('resize', updateContainerSize);
    }, []);

    // Update validatePosition to use current breakpoint's constraints
    const validatePosition = (layout) => {
        return layout.map((item) => ({
            ...item,
            x: Math.max(0, Math.min(item.x, gridCols[currentBreakpoint] - item.w)),
            y: Math.max(0, Math.min(item.y, gridRows[currentBreakpoint] - item.h)),
            w: Math.max(item.minW || 1, Math.min(item.w, item.maxW || gridCols[currentBreakpoint])),
            h: Math.max(item.minH || 1, Math.min(item.h, item.maxH || gridRows[currentBreakpoint])),
        }));
    };

    function generateInitialLayout() {
        return [
            {
                i: '0',
                x: 0,
                y: 0,
                w: 3,
                h: 6,
                static: false,
                minW: 3,
                minH: 5,
                maxW: 5,
                maxH: 8,
            },
            {
                i: '1',
                x: 3,
                y: 1,
                w: 5,
                h: 4,
                static: false,
                minW: 2,
                minH: 2,
            },
            {
                i: '2',
                x: 4,
                y: 5,
                w: 5,
                h: 4,
                static: false,
                minW: 3,
                minH: 3,
                maxW: 6,
                maxH: 6,
            },
        ];
    }

    // Rest of the handlers remain the same
    const handleLayoutChange = (newLayout) => {
        setLayouts(validatePosition(newLayout));
    };

    const handleDragStart = () => {
        setIsDragging(true);
        document.body.classList.add('dragging-active');
    };

    const handleDragStop = (layout) => {
        setIsDragging(false);
        document.body.classList.remove('dragging-active');
        setLayouts(validatePosition(layout));
    };

    const handleResizeStop = (layout) => {
        setLayouts(validatePosition(layout));
    };

    return (
        <div
            className={`w-full flex justify-center ${isDarkMode ? 'dark' : ''}`}
            ref={containerRef}
            style={{
                height: `${gridRows[currentBreakpoint] * rowHeight}px`,
                overflow: 'hidden',
            }}
        >
            {/* Rest of the component remains the same */}
            <style>{/* ... existing styles ... */}</style>
            <div
                style={{
                    width: containerWidth,
                    maxWidth: '100%',
                    margin: '0 auto',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <ResponsiveGridLayout
                    className="w-full"
                    layouts={{
                        xxl: layouts,
                        xl: layouts,
                        md: layouts,
                        sm: layouts,
                        xs: layouts,
                    }}
                    breakpoints={breakpoints}
                    cols={gridCols}
                    rowHeight={rowHeight}
                    isDraggable={true}
                    isResizable={true}
                    onLayoutChange={handleLayoutChange}
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    onResizeStop={handleResizeStop}
                    preventCollision={true}
                    allowOverlap={false}
                    useCSSTransforms={true}
                    compactType={null}
                    margin={[5, 5]}
                    maxRows={gridRows[currentBreakpoint]}
                    width={parseInt(containerWidth)}
                    containerPadding={[0, 0]}
                    bounds="parent"
                    style={{ height: '100%' }}
                >
                    <div key="0" className="grid-item">
                        <PhotoWidget />
                    </div>
                    <div key="1" className="grid-item">
                        <TextCardWidget isDarkMode={isDarkMode} title="Welcome" body="This is my workspace. I'm a MBS&S Engineering Consultant with a wide range of experience. I did this mostly for fun but also to get some traction for future job and business opportunities!" />
                    </div>
                    <div key="2" className="grid-item">
                        <MusicWidget />
                    </div>
                </ResponsiveGridLayout>
            </div>
        </div>
    );
};

export default NCReactGridLayout;
