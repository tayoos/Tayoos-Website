import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PhotoWidget from './Widgets/PhotoWidget';
import TextCardWidget from './Widgets/TextCardWidget';
import MusicWidget from './Widgets/MusicWidget';
import CVWidget from './Widgets/CVWidget';
import WeatherWidget from './Widgets/WeatherWidget';
import TimezoneWidget from './Widgets/TimezoneWidget';

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
        sm: 40,
        xs: 30,
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
        xl: 22,
        md: 13,
        sm: 6,
        xs: 6,
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
                h: 4,
                static: false,
                minW: 5,
                minH: 4,
                maxW: 6,
                maxH: 5,
            },
            {
                i: '2',
                x: 4,
                y: 5,
                w: 4,
                h: 2,
                static: false,
                minW: 4,
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
                static: false,
                minW: 1,
                minH: 1,
                maxW: 2,
                maxH: 2,
            },

            {
                i: '4',
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
                i: '5',
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
        const elementBounds = element.getBoundingClientRect();

        // Calculate grid metrics
        const cellWidth = cellSizes[currentBreakpoint];
        const cellHeight = cellSizes[currentBreakpoint];
        const gapSize = 20;

        // Calculate maximum positions in grid units
        const maxX = gridCols[currentBreakpoint] - newItem.w;
        const maxY = maxRows - newItem.h;

        // Get mouse position relative to container
        const mouseX = e.clientX - containerBounds.left;
        const mouseY = e.clientY - containerBounds.top;

        // Calculate the offset from mouse to item edge (to maintain grab position)
        const offsetX = mouseX - elementBounds.left + containerBounds.left;
        const offsetY = mouseY - elementBounds.top + containerBounds.top;

        // Calculate new position in grid units
        let gridX = Math.round((mouseX - offsetX) / (cellWidth + gapSize));
        let gridY = Math.round((mouseY - offsetY) / (cellHeight + gapSize));

        // Strictly enforce boundaries
        gridX = Math.max(0, Math.min(gridX, maxX));
        gridY = Math.max(0, Math.min(gridY, maxY));

        // Update layout with constrained position
        const updatedLayout = layout.map((item) => (item.i === newItem.i ? { ...item, x: gridX, y: gridY } : item));

        setLayouts(updatedLayout);

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
                            xxl: layouts,
                            xl: layouts,
                            md: layouts,
                            sm: layouts,
                            xs: layouts,
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
                    </ResponsiveGridLayout>
                </div>
            </div>
        </div>
    );
};

export default NCReactGridLayout;
