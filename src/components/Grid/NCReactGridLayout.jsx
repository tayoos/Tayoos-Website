import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ items, cols }) => {
    const containerRef = useRef(null);

    // Helper function to generate initial non-overlapping layout
    const generateInitialLayout = (itemCount, columns) => {
        const layout = [];
        for (let i = 0; i < itemCount; i++) {
            const height = (i % 3) + 1;
            let x = 0;
            let y = 0;
            let positionFound = false;

            // Find first available position
            while (!positionFound) {
                positionFound = true;
                // Check against all existing items
                for (const existingItem of layout) {
                    const isOverlapping = !(x + 1 <= existingItem.x || x >= existingItem.x + existingItem.w || y + height <= existingItem.y || y >= existingItem.y + existingItem.h);

                    if (isOverlapping) {
                        positionFound = false;
                        x++;
                        if (x >= columns) {
                            x = 0;
                            y++;
                        }
                        break;
                    }
                }
            }

            layout.push({
                i: i.toString(),
                x,
                y,
                w: 1,
                h: height,
                static: false,
                minW: 1,
                minH: 1,
            });
        }
        return layout;
    };

    const [layouts, setLayouts] = useState(() => generateInitialLayout(items, cols));
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

    const checkCollision = (layout, item) => {
        return layout.some((existingItem) => {
            if (existingItem.i === item.i) return false;
            return !(item.x + item.w <= existingItem.x || item.x >= existingItem.x + existingItem.w || item.y + item.h <= existingItem.y || item.y >= existingItem.y + existingItem.h);
        });
    };

    const validatePosition = (layout) => {
        const validatedLayout = [];

        for (const item of layout) {
            // First ensure the item is within bounds
            const boundedItem = {
                ...item,
                x: Math.max(0, Math.min(item.x, cols - item.w)),
                y: Math.max(0, Math.min(item.y, maxHeight - item.h)),
                w: Math.min(item.w, cols),
                h: Math.min(item.h, maxHeight),
            };

            // If there's a collision, find a new position
            if (checkCollision(validatedLayout, boundedItem)) {
                let newX = 0;
                let newY = 0;
                let found = false;

                while (!found && newY < maxHeight) {
                    const testItem = { ...boundedItem, x: newX, y: newY };
                    if (!checkCollision(validatedLayout, testItem)) {
                        validatedLayout.push(testItem);
                        found = true;
                    } else {
                        newX++;
                        if (newX >= cols) {
                            newX = 0;
                            newY++;
                        }
                    }
                }
                if (!found) {
                    validatedLayout.push(boundedItem);
                }
            } else {
                validatedLayout.push(boundedItem);
            }
        }
        return validatedLayout;
    };

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
            className="w-full flex justify-center"
            ref={containerRef}
            style={{
                height: `${maxHeight * 100}px`,
                overflow: 'hidden',
            }}
        >
            <style>
                {`
                    .dragging-active {
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    .grid-item {
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        touch-action: none;
                    }
                `}
            </style>
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
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    onResizeStop={handleResizeStop}
                    preventCollision={true}
                    allowOverlap={false}
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
                        <div key={layout.i} className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 shadow cursor-move transition-colors duration-200 grid-item">
                            <div className="grid-item">Item {parseInt(layout.i) + 1}</div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </div>
    );
};

export default NCReactGridLayout;
