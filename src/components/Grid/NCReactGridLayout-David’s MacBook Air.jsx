import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ items, cols }) => {
    const containerRef = useRef(null);
    const [layouts, setLayouts] = useState(
        Array.from({ length: items }, (_, i) => ({
            i: i.toString(),
            x: Math.min((i * 2) % cols, cols - 1),
            y: Math.floor(i / cols) * 2,
            w: 1,
            h: (i % 3) + 1,
            static: false,
            minW: 1,
            minH: 1,
        }))
    );

    const [containerWidth, setContainerWidth] = useState('1650px');
    const [maxHeight, setMaxHeight] = useState(0);

    const breakpoints = {
        xxl: 1650,
        xl: 1200,
        md: 768,
        sm: 480,
        xs: 0,
    };

    useEffect(() => {
        const updateContainerSize = () => {
            const width = window.innerWidth;
            if (width >= breakpoints.xxl) {
                setContainerWidth('1650px');
            } else if (width >= breakpoints.xl) {
                setContainerWidth('1200px');
            } else if (width >= breakpoints.md) {
                setContainerWidth('768px');
            } else if (width >= breakpoints.sm) {
                setContainerWidth('480px');
            } else {
                setContainerWidth('100%');
            }

            if (containerRef.current) {
                const taskbar = document.querySelector('.taskbar');
                const containerTop = containerRef.current.getBoundingClientRect().top;
                const taskbarTop = taskbar ? taskbar.getBoundingClientRect().top : window.innerHeight;
                const availableHeight = taskbarTop - containerTop;
                const rowHeightUnits = Math.floor(availableHeight / 100);
                setMaxHeight(rowHeightUnits);
            }
        };

        updateContainerSize();
        window.addEventListener('resize', updateContainerSize);
        return () => window.removeEventListener('resize', updateContainerSize);
    }, []);

    // Prevent page scroll during drag
    useEffect(() => {
        const preventScroll = (e) => {
            e.preventDefault();
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', preventScroll, { passive: false });
            container.addEventListener('touchmove', preventScroll, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', preventScroll);
                container.removeEventListener('touchmove', preventScroll);
            }
        };
    }, []);

    const validatePosition = (layout) => {
        return layout.map((item) => ({
            ...item,
            x: Math.max(0, Math.min(item.x, cols - item.w)),
            y: Math.max(0, Math.min(item.y, maxHeight - item.h)),
            w: Math.min(item.w, cols - item.x),
            h: Math.min(item.h, maxHeight - item.y),
        }));
    };

    const handleLayoutChange = (newLayout) => {
        const validatedLayout = validatePosition(newLayout);
        setLayouts(validatedLayout);
    };

    const handleDragStop = (layout, oldItem, newItem) => {
        const validatedLayout = validatePosition(layout);
        setLayouts(validatedLayout);
    };

    const handleResizeStop = (layout, oldItem, newItem) => {
        const validatedLayout = validatePosition(layout);
        setLayouts(validatedLayout);
    };

    return (
        <div
            className="w-full flex justify-center"
            ref={containerRef}
            style={{
                height: `${maxHeight * 100}px`, // Set fixed height based on maxHeight
                overflow: 'hidden', // Prevent scrolling
            }}
        >
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
                    cols={{
                        xxl: cols,
                        xl: cols,
                        md: cols,
                        sm: cols,
                        xs: cols,
                    }}
                    rowHeight={100}
                    isDraggable={true}
                    isResizable={true}
                    onLayoutChange={handleLayoutChange}
                    onDragStop={handleDragStop}
                    onResizeStop={handleResizeStop}
                    preventCollision={false}
                    allowOverlap={true}
                    useCSSTransforms={true}
                    compactType={null}
                    margin={[10, 10]}
                    maxRows={maxHeight}
                    width={parseInt(containerWidth)}
                    containerPadding={[0, 0]}
                    bounds="parent"
                    style={{ height: '100%' }}
                >
                    {layouts.map((layout) => (
                        <div key={layout.i} className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 shadow cursor-move transition-colors duration-200">
                            <div className="select-none">Item {parseInt(layout.i) + 1}</div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </div>
    );
};

export default NCReactGridLayout;
