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
// Mobile Widget Configuration
const mobileWidgetConfig = {
    widgets: {
        0: {
            // PhotoWidget
            show: true,
            static: true,
            w: 3,
            h: 3,
            minW: 3,
            minH: 3,
            maxW: 3,
            maxH: 3,
            order: 1,
        },
        1: {
            // TextCardWidget
            show: true,
            static: false,
            w: 4,
            h: 3,
            minW: 4,
            minH: 2,
            maxW: 7,
            maxH: 4,
            order: 2,
        },
        2: {
            // MusicWidget
            show: true,
            static: true,
            w: 7,
            h: 2,
            minW: 4,
            minH: 2,
            maxW: 7,
            maxH: 3,
            order: 3,
        },
        3: {
            // CVWidget
            show: true,
            static: false,
            w: 7,
            h: 2,
            minW: 4,
            minH: 2,
            maxW: 7,
            maxH: 3,
            order: 4,
        },
        4: {
            // WeatherWidget
            show: true,
            static: true,
            w: 7,
            h: 2,
            minW: 4,
            minH: 2,
            maxW: 7,
            maxH: 3,
            order: 5,
        },
        5: {
            // TimezoneWidget
            show: false,
            static: true,
            w: 7,
            h: 2,
            minW: 4,
            minH: 2,
            maxW: 7,
            maxH: 3,
            order: 6,
        },
        6: {
            // StatusCard
            show: true,
            static: false,
            w: 7,
            h: 2,
            minW: 4,
            minH: 2,
            maxW: 7,
            maxH: 3,
            order: 7,
        },
    },
};
const NCReactGridLayoutMobile = ({ darkMode }) => {
    const containerRef = useRef(null);
    const dragBoundaryRef = useRef(null);
    const [maxRows, setMaxRows] = useState(22);
    const [isDragging, setIsDragging] = useState(false);
    const [layouts, setLayouts] = useState(generateInitialLayout());

    // Mobile Grid Configuration
    const mobileGridConfig = {
        cols: 7,
        cellSize: 50,
        gapSize: 20,
        containerPadding: 5,
    };

    function generateInitialLayout() {
        let currentY = 0;
        const visibleWidgets = Object.entries(mobileWidgetConfig.widgets)
            .filter(([_, config]) => config.show)
            .sort((a, b) => a[1].order - b[1].order);

        return visibleWidgets.map(([key, config]) => ({
            i: key,
            x: 0,
            y: currentY,
            w: config.w,
            h: config.h,
            static: config.static,
            minW: config.minW,
            minH: config.minH,
            maxW: config.maxW,
            maxH: config.maxH,
        }));
    }

    // Update maxRows based on container height
    useEffect(() => {
        const updateMaxRows = () => {
            if (containerRef.current) {
                const containerHeight = containerRef.current.offsetHeight;
                const { cellSize, gapSize, containerPadding } = mobileGridConfig;
                const availableHeight = containerHeight - containerPadding * 2;
                const maxPossibleRows = Math.floor((availableHeight + gapSize) / (cellSize + gapSize));
                setMaxRows(Math.max(1, maxPossibleRows));
            }
        };

        const resizeObserver = new ResizeObserver(updateMaxRows);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    // Boundary checking for drag and resize
    const isWithinBounds = (x, y, w, h) => {
        return x >= 0 && y >= 0 && x + w <= mobileGridConfig.cols && y + h <= maxRows;
    };

    const findNearestPosition = (width, height, layout, startX = 0, startY = 0) => {
        if (
            isWithinBounds(startX, startY, width, height) &&
            !layout.some((item) => {
                const itemRight = item.x + item.w;
                const itemBottom = item.y + item.h;
                const newRight = startX + width;
                const newBottom = startY + height;
                return !(startX >= itemRight || newRight <= item.x || startY >= itemBottom || newBottom <= item.y);
            })
        ) {
            return { x: startX, y: startY };
        }

        // Search vertically for the next available position
        for (let y = 0; y <= maxRows - height; y++) {
            if (
                !layout.some((item) => {
                    const itemBottom = item.y + item.h;
                    const newBottom = y + height;
                    return !(y >= itemBottom || newBottom <= item.y);
                })
            ) {
                return { x: 0, y };
            }
        }

        return { x: 0, y: 0 };
    };

    const handleDragStart = () => {
        setIsDragging(true);
        document.body.classList.add('dragging-active');
    };

    const handleDragStop = () => {
        setIsDragging(false);
        document.body.classList.remove('dragging-active');
    };

    const handleDrag = (layout, oldItem, newItem, placeholder, e, element) => {
        if (!dragBoundaryRef.current) return;

        const position = findNearestPosition(
            newItem.w,
            newItem.h,
            layout.filter((item) => item.i !== newItem.i),
            newItem.x,
            newItem.y
        );

        if (position.x !== newItem.x || position.y !== newItem.y) {
            const updatedLayout = layout.map((item) => (item.i === newItem.i ? { ...item, x: position.x, y: position.y } : item));
            setLayouts(updatedLayout);
        }
    };

    const handleResizeStop = (layout) => {
        const validatedLayout = layout.map((item) => {
            const position = findNearestPosition(
                item.w,
                item.h,
                layout.filter((l) => l.i !== item.i),
                item.x,
                item.y
            );
            return {
                ...item,
                x: position.x,
                y: position.y,
            };
        });
        setLayouts(validatedLayout);
    };

    // Apply transition styles
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

    const renderWidget = (key, widget) => {
        const config = mobileWidgetConfig.widgets[key];
        if (!config || !config.show) return null;

        return (
            <div key={key} className="grid-item rounded-lg shadow-lg overflow-hidden" data-static={config.static}>
                {widget}
            </div>
        );
    };

    // Calculate the container width based on columns and gaps
    const calculateContainerWidth = () => {
        const { cols, cellSize, gapSize, containerPadding } = mobileGridConfig;
        return cellSize * cols + gapSize * (cols - 1) + containerPadding * 2;
    };

    return (
        <div
            ref={containerRef}
            className={`w-full flex justify-center ${darkMode ? 'dark' : ''}`}
            style={{
                height: '100%',
                position: 'relative',
                padding: `${mobileGridConfig.containerPadding}px`,
                minWidth: `${calculateContainerWidth()}px`, // Add minimum width
            }}
        >
            <div
                ref={dragBoundaryRef}
                style={{
                    position: 'relative',
                    height: '100%',
                    width: `${calculateContainerWidth()}px`, // Set explicit width
                }}
            >
                <ResponsiveGridLayout
                    className="w-full"
                    layouts={{ xs: layouts }}
                    breakpoints={{ xs: 0 }}
                    cols={{ xs: mobileGridConfig.cols }}
                    rowHeight={mobileGridConfig.cellSize}
                    isDraggable={true}
                    isResizable={true}
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    onDrag={handleDrag}
                    onResizeStop={handleResizeStop}
                    preventCollision={true}
                    allowOverlap={false}
                    useCSSTransforms={true}
                    margin={[mobileGridConfig.gapSize, mobileGridConfig.gapSize]}
                    containerPadding={[mobileGridConfig.containerPadding, mobileGridConfig.containerPadding]}
                    maxRows={maxRows}
                >
                    {renderWidget('0', <PhotoWidget />)}
                    {renderWidget('1', <TextCardWidget darkMode={darkMode} title="Welcome" body="This is my workspace. I'm a MBS&S Engineering Consultant with a wide range of experience. I did this mostly for fun but also to get some traction for future job and business opportunities!" />)}
                    {renderWidget('2', <MusicWidget />)}
                    {renderWidget('3', <CVWidget darkMode={darkMode} />)}
                    {renderWidget('4', <WeatherWidget darkMode={darkMode} />)}
                    {renderWidget('5', <TimezoneWidget darkMode={darkMode} />)}
                    {renderWidget('6', <StatusCard darkMode={darkMode} />)}
                </ResponsiveGridLayout>
            </div>
        </div>
    );
};

export default NCReactGridLayoutMobile;
