import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './NCReactGridLayout.css';

import PhotoWidget from './Widgets/PhotoWidget';
import TextCardWidget from './Widgets/TextCardWidget/TextCardWidget';
import MusicWidget from './Widgets/MusicWidget/MusicWidget';
import CVWidget from './Widgets/CVWidget';
import WeatherWidget from './Widgets/WeatherWidget/WeatherWidget';
import TimezoneWidget from './Widgets/TimezoneWidget';
import StatusCard from './Widgets/StatusCard/StatusCard';
import Device, { getDeviceType } from '../../utitlites/Device';

const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ darkMode }) => {
    const containerRef = useRef(null);
    const dragBoundaryRef = useRef(null);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('xxl');
    const [layouts, setLayouts] = useState(generateInitialLayout);
    const [containerWidth, setContainerWidth] = useState('1650px');
    const [maxRows, setMaxRows] = useState(19);
    const [isDragging, setIsDragging] = useState(false);

    const isMobile = getDeviceType() === 'Mobile';

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

    // Widgets with dynamic loading
    const widgets = [
        { key: '0', component: <PhotoWidget /> },
        { key: '1', component: <TextCardWidget darkMode={darkMode} title="Welcome" body="This is my workspace. I'm a MBS&S Engineering Consultant with a wide range of experience. I did this mostly for fun but also to get some traction for future job and business opportunities!" /> },
        { key: '2', component: <MusicWidget darkMode={darkMode} /> },
        { key: '3', component: <CVWidget darkMode={darkMode} /> },
        { key: '4', component: <WeatherWidget darkMode={darkMode} /> },
        { key: '5', component: <TimezoneWidget darkMode={darkMode} /> },
        { key: '6', component: <StatusCard darkMode={darkMode} /> },
    ];

    // Save and load layouts from localStorage
    useEffect(() => {
        const savedLayout = JSON.parse(localStorage.getItem('layout'));
        if (savedLayout) setLayouts(savedLayout);
    }, []);

    useEffect(() => {
        localStorage.setItem('layout', JSON.stringify(layouts));
    }, [layouts]);

    // Generate initial layout with error handling
    function generateInitialLayout() {
        const initialLayout = [
            { i: '0', x: 0, y: 0, w: 3, h: 6, static: false, minW: 3, minH: 6, maxW: 3, maxH: 6 },
            { i: '1', x: 3, y: 0, w: 5, h: 3, static: false, minW: 3, minH: 3, maxW: 6, maxH: 3 },
            { i: '2', x: 3, y: 3, w: 4, h: 2, static: false, minW: 3, minH: 2, maxW: 5, maxH: 2 },
            { i: '3', x: 7, y: 3, w: 1, h: 2, static: false, minW: 1, minH: 2, maxW: 1, maxH: 2 },
            { i: '4', x: 26, y: 4, w: 3, h: 2, static: false, minW: 3, minH: 2, maxW: 4, maxH: 2 },
            { i: '5', x: 26, y: 2, w: 3, h: 2, static: false, minW: 3, minH: 2, maxW: 4, maxH: 2 },
            { i: '6', x: 26, y: 0, w: 3, h: 2, static: false, minW: 3, minH: 2, maxW: 4, maxH: 2 },
        ];

        // Validate layout
        initialLayout.forEach((widget) => {
            if (!widget.i || !widget.x || !widget.y) {
                console.error('Invalid widget data:', widget);
                return null;
            }
        });

        return initialLayout;
    }

    // Specify xl-specific positions
    const xlLayout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 4 };
            case '1':
                return { ...item, x: 4, y: 1, w: 5 };
            case '2':
                return { ...item, x: 11, y: 1, w: 5 };
            case '3':
                return { ...item, x: 4, y: 4, w: 1 };
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

    // Specify sm-specific positions
    const smLayout = layouts.map((item) => {
        switch (item.i) {
            case '0':
                return { ...item, x: 0, y: 0, w: 4 };
            case '1':
                return { ...item, x: 0, y: 6, w: 4, h: 4 };
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

    // Calculate maxRows based on container height and cell size
    useEffect(() => {
        const calculateMaxRows = () => {
            if (containerRef.current) {
                const containerHeight = containerRef.current.clientHeight;
                const rowHeight = cellSizes[currentBreakpoint];
                const verticalMargin = 20; // Vertical margin between rows
                const totalCellHeight = rowHeight + verticalMargin;
                const calculatedMaxRows = Math.floor(containerHeight / totalCellHeight);
                setMaxRows(calculatedMaxRows);
            }
        };

        calculateMaxRows();

        // Recalculate maxRows on window resize
        window.addEventListener('resize', calculateMaxRows);
        return () => window.removeEventListener('resize', calculateMaxRows);
    }, [currentBreakpoint, cellSizes]);

    // Handle breakpoint change
    const onBreakpointChange = (newBreakpoint) => {
        setCurrentBreakpoint(newBreakpoint);
    };

    // Handle drag and drop constraints
    const onDrag = (layout, oldItem, newItem, placeholder, e) => {
        if (!dragBoundaryRef.current) return;

        const maxX = gridCols[currentBreakpoint] - newItem.w;
        const maxY = maxRows - newItem.h;

        const constrainedX = Math.max(0, Math.min(placeholder.x, maxX));
        const constrainedY = Math.max(0, Math.min(placeholder.y, maxY));

        if (constrainedX !== placeholder.x || constrainedY !== placeholder.y) {
            const updatedLayout = layout.map((item) => (item.i === newItem.i ? { ...item, x: constrainedX, y: constrainedY } : item));
            setLayouts(updatedLayout);
        }

        e.preventDefault();
    };

    // Handle drag start and stop
    const handleDragStart = () => {
        setIsDragging(true);
        document.body.classList.add('dragging-active');
    };

    const handleDragStop = () => {
        setIsDragging(false);
        document.body.classList.remove('dragging-active');
    };

    // Handle resize stop
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

    // Add animations
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .react-grid-item.react-draggable-dragging {
                transition: none !important;
                z-index: 3;
            }
            .react-grid-item {
                transition: transform 200ms ease, opacity 200ms ease;
            }
            .react-grid-layout {
                position: relative !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    //Endforce No scroll
    useEffect(() => {
        const preventScroll = (e) => {
            e.preventDefault();
        };

        if (containerRef.current) {
            containerRef.current.style.overflow = 'hidden';
            containerRef.current.addEventListener('wheel', preventScroll, { passive: false });
            containerRef.current.addEventListener('touchmove', preventScroll, { passive: false });
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', preventScroll);
                containerRef.current.removeEventListener('touchmove', preventScroll);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={`w-full flex justify-center ${darkMode ? 'dark' : ''}`} style={{ height: '97%', position: 'relative', padding: '5px', overflow: 'hidden' }}>
            <div style={{ width: containerWidth, maxWidth: '100%', margin: '0 auto', height: '100%', position: 'relative' }}>
                <div ref={dragBoundaryRef} style={{ position: 'relative', height: '100%' }}>
                    <ResponsiveGridLayout
                        className="w-full"
                        layouts={{
                            xl: xlLayout,
                            md: layouts,
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
                        {widgets.map((widget) => (
                            <div key={widget.key} className="grid-item rounded-lg shadow-lg overflow-hidden" aria-label={`Widget ${widget.key}`}>
                                {widget.component}
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NCReactGridLayout);
