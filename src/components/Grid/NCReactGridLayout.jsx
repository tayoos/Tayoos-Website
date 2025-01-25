import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import './NCReactGridLayout.css';

import PhotoWidget from './Widgets/PhotoWidget';
import TextCardWidget from './Widgets/TextCardWidget';
import MusicWidget from './Widgets/MusicWidget';
import CVWidget from './Widgets/CVWidget';
import WeatherWidget from './Widgets/WeatherWidget';
import TimezoneWidget from './Widgets/TimezoneWidget';
import StatusCard from './Widgets/StatusCard/StatusCard';

const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ isDarkMode }) => {
    const containerRef = useRef(null);
    const dragBoundaryRef = useRef(null);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('xxl');
    const [layouts, setLayouts] = useState(generateInitialLayout);
    const [containerWidth, setContainerWidth] = useState('1650px');
    const [maxRows, setMaxRows] = useState(22);
    const [isDragging, setIsDragging] = useState(false);

    const cellSizes = {
        xxl: 50,
        xl: 50,
        md: 50,
        sm: 50,
        xs: 50,
    };

    const breakpoints = {
        xxl: 1650,
        xl: 1200,
        md: 768,
        sm: 480,
        xs: 0,
    };

    const gridCols = {
        xxl: 30,
        xl: 20,
        md: 11,
        sm: 7,
        xs: 6,
    };

    // Specify xs-specific positions
    const xxlLayout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 3 };
            case '1':
                return { ...item, x: 3, y: 1, w: 6 };
            case '2':
                return { ...item, x: 11, y: 1, w: 5 };
            case '3':
                return { ...item, x: 20, y: 8, w: 1 };
            case '4':
                return { ...item, x: 16, y: 4, w: 4 };
            case '5':
                return { ...item, x: 16, y: 2, w: 4 };
            case '6':
                return { ...item, x: 16, y: 0, w: 4 };
            default:
                return item;
        }
    });

    // Specify xs-specific positions
    const xl_Layout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 3 };
            case '1':
                return { ...item, x: 3, y: 1, w: 5 };
            case '2':
                return { ...item, x: 11, y: 1, w: 5 };
            case '3':
                return { ...item, x: 20, y: 8, w: 1 };
            case '4':
                return { ...item, x: 16, y: 4, w: 4 };
            case '5':
                return { ...item, x: 16, y: 2, w: 4 };
            case '6':
                return { ...item, x: 16, y: 0, w: 4 };
            default:
                return item;
        }
    });

    // Specify xs-specific positions
    const mdLayout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 3 };
            case '1':
                return { ...item, x: 3, y: 1, w: 5 };
            case '2':
                return { ...item, x: 6, y: 7, w: 5 };
            case '3':
                return { ...item, x: 11, y: 8, w: 1 };
            case '4':
                return { ...item, x: 8, y: 4, w: 3 };
            case '5':
                return { ...item, x: 8, y: 2, w: 3 };
            case '6':
                return { ...item, x: 8, y: 0, w: 3 };
            default:
                return item;
        }
    });

    // Specify xs-specific positions
    const smLayout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 3 };
            case '1':
                return { ...item, x: 0, y: 6, w: 4 };
            case '2':
                return { ...item, x: 4, y: 6, w: 3 };
            case '3':
                return { ...item, x: 6, y: 8, w: 1 };
            case '4':
                return { ...item, x: 4, y: 4, w: 3 };
            case '5':
                return { ...item, x: 4, y: 2, w: 3 };
            case '6':
                return { ...item, x: 4, y: 0, w: 3 };
            default:
                return item;
        }
    });

    // Specify xs-specific positions
    const xsLayout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 3 };
            case '1':
                return { ...item, x: 0, y: 6, w: 6 };
            case '2':
                return { ...item, x: 0, y: 9, w: 5 };
            case '3':
                return { ...item, x: 6, y: 9, w: 1 };
            case '4':
                return { ...item, x: 3, y: 4, w: 3 };
            case '5':
                return { ...item, x: 3, y: 2, w: 3 };
            case '6':
                return { ...item, x: 3, y: 0, w: 3 };
            default:
                return item;
        }
    });

    // Function to check if a position is within grid boundaries
    const isWithinBounds = (x, y, w, h, maxCols, maxRows) => {
        return x >= 0 && y >= 0 && x + w <= maxCols && y + h <= maxRows;
    };

    // Function to check if a position is occupied
    const isPositionOccupied = (x, y, w, h, layout, excludeId = null) => {
        return layout.some((item) => {
            if (item.i === excludeId) return false;
            const itemRight = item.x + item.w;
            const itemBottom = item.y + item.h;
            const newRight = x + w;
            const newBottom = y + h;

            return !(x >= itemRight || newRight <= item.x || y >= itemBottom || newBottom <= item.y);
        });
    };

    // Function to find the nearest available position
    const findNearestPosition = (width, height, layout, maxCols, maxRows, startX = 0, startY = 0) => {
        // Ensure starting position is within bounds
        startX = Math.min(Math.max(0, startX), maxCols - width);
        startY = Math.min(Math.max(0, startY), maxRows - height);

        // First try the original position if it's within bounds and not occupied
        if (isWithinBounds(startX, startY, width, height, maxCols, maxRows) && !isPositionOccupied(startX, startY, width, height, layout)) {
            return { x: startX, y: startY };
        }

        let layer = 1;
        const maxLayer = Math.max(maxCols, maxRows);

        while (layer < maxLayer) {
            // Search in a spiral pattern from the start position
            for (let dx = -layer; dx <= layer; dx++) {
                for (let dy = -layer; dy <= layer; dy++) {
                    const x = startX + dx;
                    const y = startY + dy;

                    if (isWithinBounds(x, y, width, height, maxCols, maxRows) && !isPositionOccupied(x, y, width, height, layout)) {
                        return { x, y };
                    }
                }
            }
            layer++;
        }

        // If no position found, search systematically from top-left
        for (let y = 0; y <= maxRows - height; y++) {
            for (let x = 0; x <= maxCols - width; x++) {
                if (!isPositionOccupied(x, y, width, height, layout)) {
                    return { x, y };
                }
            }
        }

        // Absolute fallback to top-left
        return { x: 0, y: 0 };
    };

    // Handle breakpoint change
    const onBreakpointChange = (newBreakpoint) => {
        const previousCols = gridCols[currentBreakpoint];
        const newCols = gridCols[newBreakpoint];
        setCurrentBreakpoint(newBreakpoint);

        // Check and adjust positions regardless of whether the grid is growing or shrinking
        const newLayout = [...layouts];

        // Sort items by size (larger items first) to better handle placement
        const sortedItems = [...layouts].map((item, index) => ({ ...item, originalIndex: index })).sort((a, b) => b.w * b.h - a.w * a.h);

        let needsUpdate = false;

        sortedItems.forEach((item) => {
            // Check if item is out of bounds in the new grid
            if (!isWithinBounds(item.x, item.y, item.w, item.h, newCols, maxRows)) {
                needsUpdate = true;
                const position = findNearestPosition(item.w, item.h, newLayout, newCols, maxRows, item.x, item.y);

                // Update the item in our layout copy
                newLayout[item.originalIndex] = {
                    ...item,
                    x: position.x,
                    y: position.y,
                };
            }
        });

        // Only update the layout if changes were needed
        if (needsUpdate) {
            setLayouts(newLayout);
        }
    };

    useEffect(() => {
        const updateMaxRows = () => {
            if (containerRef.current) {
                const containerHeight = containerRef.current.offsetHeight;
                const gapSize = 20;
                const cellHeight = cellSizes[currentBreakpoint];
                const containerPadding = 10;

                const availableHeight = containerHeight - containerPadding;
                const maxPossibleRows = Math.floor((availableHeight + gapSize) / (cellHeight + gapSize));

                setMaxRows(Math.max(1, maxPossibleRows));
            }
        };

        updateMaxRows();

        const resizeObserver = new ResizeObserver(updateMaxRows);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [currentBreakpoint, cellSizes]);

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
                minH: 6,
                maxW: 3,
                maxH: 6,
            },
            {
                i: '1',
                x: 3,
                y: 1,
                w: 5,
                h: 3,
                static: true,
                minW: 3,
                minH: 3,
                maxW: 6,
                maxH: 3,
            },
            {
                i: '2',
                x: 4,
                y: 5,
                w: 4,
                h: 2,
                static: true,
                minW: 3,
                minH: 2,
                maxW: 6,
                maxH: 6,
            },
            {
                i: '3',
                x: 10,
                y: 10,
                w: 1,
                h: 2,
                static: true,
                minW: 1,
                minH: 1,
                maxW: 2,
                maxH: 2,
            },

            {
                i: '4',
                x: 10,
                y: 5,
                w: 3,
                h: 2,
                static: false,
                minW: 3,
                minH: 2,
                maxW: 4,
                maxH: 2,
            },

            {
                i: '5',
                x: 10,
                y: 3,
                w: 3,
                h: 2,
                static: false,
                minW: 3,
                minH: 2,
                maxW: 4,
                maxH: 2,
            },

            {
                i: '6',
                x: 10,
                y: 1,
                w: 3,
                h: 2,
                static: false,
                minW: 3,
                minH: 2,
                maxW: 4,
                maxH: 2,
            },
        ];
    }

    const onDrag = (layout, oldItem, newItem, placeholder, e, element) => {
        if (!dragBoundaryRef.current) return;

        const containerBounds = dragBoundaryRef.current.getBoundingClientRect();

        // Calculate grid metrics
        const cellWidth = cellSizes[currentBreakpoint];
        const cellHeight = cellSizes[currentBreakpoint];
        const gapSize = 20;

        // Calculate maximum positions in grid units
        const maxX = gridCols[currentBreakpoint] - newItem.w;
        const maxY = maxRows - newItem.h;

        // Use the placeholder position if available, otherwise use newItem position
        // The placeholder represents where the item would be dropped
        const gridX = placeholder ? placeholder.x : newItem.x;
        const gridY = placeholder ? placeholder.y : newItem.y;

        // Strictly enforce boundaries
        const constrainedX = Math.max(0, Math.min(gridX, maxX));
        const constrainedY = Math.max(0, Math.min(gridY, maxY));

        // Only update if position has changed after constraints
        if (constrainedX !== gridX || constrainedY !== gridY) {
            // Update layout with constrained position
            const updatedLayout = layout.map((item) => (item.i === newItem.i ? { ...item, x: constrainedX, y: constrainedY } : item));

            setLayouts(updatedLayout);
        }

        // Prevent default to stop any potential dragging beyond bounds
        e.preventDefault();
    };

    const handleDragStart = () => {
        setIsDragging(true);
        document.body.classList.add('dragging-active');
    };

    const handleDragStop = () => {
        setIsDragging(false);
        document.body.classList.remove('dragging-active');
    };

    const handleResizeStop = (layout) => {
        const validatedLayout = layout.map((item) => {
            const maxX = gridCols[currentBreakpoint] - item.w;
            const maxY = maxRows - item.h;

            return {
                ...item,
                x: Math.max(0, Math.min(item.x, maxX)),
                y: Math.max(0, Math.min(item.y, maxY)),
            };
        });

        setLayouts(validatedLayout);
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .react-grid-item.react-draggable-dragging {
                transition: none !important;
                z-index: 3;
            }
            .react-grid-item {
                transition: transform 200ms ease;
            }
            .react-grid-layout {
                position: relative !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full flex justify-center ${isDarkMode ? 'dark' : ''}`}
            style={{
                height: '100%',
                position: 'relative',
                padding: '5px',
            }}
        >
            <div
                style={{
                    width: containerWidth,
                    maxWidth: '100%',
                    margin: '0 auto',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <div ref={dragBoundaryRef} style={{ position: 'relative', height: '100%' }}>
                    <ResponsiveGridLayout
                        className="w-full"
                        layouts={{
                            xxl: xxlLayout,
                            xl: xl_Layout,
                            md: mdLayout,
                            sm: smLayout,
                            xs: xsLayout,
                        }}
                        breakpoints={breakpoints}
                        cols={gridCols}
                        rowHeight={cellSizes[currentBreakpoint]}
                        isDraggable={true}
                        isResizable={true}
                        onDragStart={handleDragStart}
                        onDragStop={handleDragStop}
                        onResizeStop={handleResizeStop}
                        onDrag={onDrag}
                        onBreakpointChange={onBreakpointChange}
                        preventCollision={true}
                        allowOverlap={false}
                        useCSSTransforms={true}
                        compactType={null}
                        margin={[20, 20]}
                        maxRows={maxRows}
                        width={parseInt(containerWidth)}
                        containerPadding={[5, 5]}
                        style={{ height: '100%' }}
                        transformScale={1}
                    >
                        <div key="0" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <PhotoWidget />
                        </div>
                        <div key="1" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <TextCardWidget isDarkMode={isDarkMode} title="Welcome" body="This is my workspace. I'm a MBS&S Engineering Consultant with a wide range of experience. I did this mostly for fun but also to get some traction for future job and business opportunities!" />
                        </div>
                        <div key="2" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <MusicWidget />
                        </div>
                        <div key="3" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <CVWidget isDarkMode={isDarkMode} />
                        </div>
                        <div key="4" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <WeatherWidget isDarkMode={isDarkMode} />
                        </div>
                        <div key="5" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <TimezoneWidget isDarkMode={isDarkMode} />
                        </div>
                        <div key="6" className="grid-item rounded-lg shadow-lg overflow-hidden">
                            <StatusCard isDarkMode={isDarkMode} />
                        </div>
                    </ResponsiveGridLayout>
                </div>
            </div>
        </div>
    );
};

export default NCReactGridLayout;
