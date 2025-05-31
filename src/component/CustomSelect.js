'use client';

import { useState, useRef, useEffect } from 'react';

export default function CustomMultiSelect({ categorys, selectedCategoryIds, setSelectedCategoryIds }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSelect = (id) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((item) => item !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSelectedNames = () => {
    return categorys
      .filter((cat) => selectedCategoryIds.includes(cat.categoryId))
      .map((cat) => cat.categoryName);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block text-primary font-medium mb-1">
        Danh mục:<span className="text-red-500">*</span>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border bg-gray-50 placeholder-gray-400 border-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E] text-left"
      >
        {selectedCategoryIds.length > 0
          ? getSelectedNames().join(', ')
          : 'Chọn danh mục'}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {categorys.length > 0 ? (
            categorys.map((category) => (
              <div
                key={category.categoryId}
                onClick={() => toggleSelect(category.categoryId)}
                className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${selectedCategoryIds.includes(category.categoryId) ? 'bg-blue-500 text-white' : ''
                  }`}
              >
                {category.categoryName}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">Không có danh mục nào</div>
          )}
        </div>
      )}
    </div>
  );
}
