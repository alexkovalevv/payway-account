import React from 'react';

export const AmountAndPaymentTypeCell = ({rowData, icons}) => {
    const icon = icons[rowData.payment_type] || 'pi pi-question-circle';

    return (
        <div className="flex align-items-center gap-2">
            <span>${rowData.amount}</span>
            <i className="pi pi-arrow-right" style={{fontSize: '1rem'}}></i>
            <i className={`${icon}`} style={{fontSize: '1.5rem'}}></i>
            <span>{rowData.payment_type}</span>
        </div>
    );
};