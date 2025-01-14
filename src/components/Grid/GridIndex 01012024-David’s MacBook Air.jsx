import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// @ts-ignore
import { WidthProvider, Responsive } from 'react-grid-layout';
import './gridstyles.css';

import Grid from './Grid';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridIndex = (props) => {
    const { padding, cols, rowHeight, droppingItem, items, onEdit, onDrop, onRemove } = props;
    const [width, setWidth] = useState(0);

    const onWidthChange = (containerWidth) => {
        setWidth(containerWidth);
    };

    const onLayoutChange = (layout, ...rest) => {
        console.log('layout change: ', layout, rest);
    };

    const onDragStop = (layouts, oldItem, newItem) => {
        console.log('onDragStop: ', layouts, newItem);
    };

    const renderItem = (item) => {
        const { i, layout, children } = item;
        return (
            <div className="item" key={i} data-grid={layout}>
                {children}
                <div className="actions">
                    <EditOutlined onClick={() => onEdit(i)} />
                    <DeleteOutlined onClick={() => onRemove(i)} />
                </div>
            </div>
        );
    };

    return (
        <div className="gridindexcontainer">
            <Grid containerWidth={width} cols={cols} rowHeight={rowHeight} padding={padding} />
            <ResponsiveReactGridLayout margin={padding} cols={{ lg: cols }} rowHeight={rowHeight} breakpoints={{ lg: 600 }} compactType={null} isDroppable={true} droppingItem={droppingItem} onDragStop={onDragStop} onDrop={onDrop} onWidthChange={onWidthChange} onLayoutChange={onLayoutChange}>
                {items.map(renderItem)}
            </ResponsiveReactGridLayout>
        </div>
    );
};

GridIndex.defaultProps = {
    padding: [16, 16],
    cols: 12,
    rowHeight: 36,
};

export default GridIndex;
