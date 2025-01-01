import React, { useCallback } from 'react';
import { times } from 'lodash';
import './gridstyles.css';

const Grid = ({
    containerWidth,
    cols,
    rowHeight,
    padding,
    background = 'hsl(210, 44%, 91%)', // Default parameter instead of defaultProps
}) => {
    const renderPattern = useCallback(() => {
        if (!containerWidth) return null; // Guard against undefined width

        const [horizontalPadding, verticalPadding] = padding;
        const paddingWidth = verticalPadding * (cols - 1);
        const columnWidth = (containerWidth - paddingWidth) / cols;

        return (
            <pattern id="grid_layout_pattern" patternUnits="userSpaceOnUse" width="100%" height={rowHeight + horizontalPadding}>
                {times(cols).map((value, index) => {
                    const x = (columnWidth + verticalPadding) * index;
                    return (
                        <rect
                            key={index}
                            x={x.toString()} // Convert to string to avoid NaN warning
                            y="0"
                            width={columnWidth}
                            height={rowHeight}
                            fill={background}
                        />
                    );
                })}
            </pattern>
        );
    }, [containerWidth, cols, padding, rowHeight, background]);

    return (
        <div className="gridbackground-wrap">
            <svg width="100%" height="100%">
                <defs>{renderPattern()}</defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#grid_layout_pattern)" />
            </svg>
        </div>
    );
};

export default Grid;
