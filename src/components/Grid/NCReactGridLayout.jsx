import React, { useState, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import PhotoWidget from './Widgets/PhotoWidget';
import TextCardWidget from './Widgets/TextCardWidget';
import MusicWidget from './Widgets/MusicWidget';
import CVWidget from './Widgets/CVWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const NCReactGridLayout = ({ isDarkMode }) => {
    const containerRef = useRef(null);
    const [rowHeight, setRowHeight] = useState(40);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('xxl');
    const [layouts, setLayouts] = useState(generateInitialLayout);
    const [containerWidth, setContainerWidth] = useState('1650px');
    const [maxRows, setMaxRows] = useState(20);
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
};

export default NCReactGridLayout;
