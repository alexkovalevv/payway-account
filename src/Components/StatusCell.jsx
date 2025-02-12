import React from 'react';
import {Tag} from 'primereact/tag';

export const StatusCell = ({rowData, statuses}) => {
    const status = statuses.find((s) => s.value === rowData.status);
    return <Tag value={status ? status.label : rowData.status} severity={status ? status.severity : null}/>;
};