'use client';

import React from 'react';

const CustomCheckbox = ({ id, onChange, priority }) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id={`custom-checkbox-${id}`}
                className="custom-checkbox hidden"
                onChange={(e) => onChange(id, e.target.checked)}
            />
            <label
                htmlFor={`custom-checkbox-${id}`}
                className="relative flex items-center cursor-pointer"
            >
                <span className="w-6 h-6 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-sm font-bold text-black transition-colors custom-checkbox-label">
                    {priority ?? ""}
                </span>
            </label>
            <style jsx>{`
                .custom-checkbox:checked + label .custom-checkbox-label {
                    background-color: #3b82f6;
                    border-color: #3b82f6;
                    color: #ffffff;
                }
            `}</style>
        </div>
    );
};

export default CustomCheckbox;
