import React from 'react';
import {Tooltip} from 'primereact/tooltip';

export const CommentsCell = ({rowData}) => {
    const comment = rowData.comments || 'Нет примечания';
    const isTruncated = comment.length > 55;
    const truncatedComment = isTruncated ? `${comment.substring(0, 55)}...` : comment;

    return (
        <>
            {isTruncated && (
                <Tooltip
                    target=".comments-cell"
                    showDelay="100"
                    position="bottom"
                    style={{width: '25rem', fontSize: '0.7rem'}}
                />
            )}
            <div className="comments-cell" data-pr-tooltip={isTruncated ? comment : null}>
                <span>{truncatedComment}</span>
            </div>
        </>
    );
};