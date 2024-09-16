import React from 'react';

function WCardDropdownLink({ text, icon }) {

    return (
        <div data-text={text}
            className="workout__card-dropdown-link px-4 py-2.5 hover:bg-purple-200 active:bg-purple-400 cursor-pointer flex flex-nowrap gap-4 items-center even:bg-gray-100">
            {icon}
            {text}
        </div>
    )
}

export default WCardDropdownLink;