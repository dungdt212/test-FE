import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';

interface SearchBarProps {
  value: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgcolor?: string;
  radius?: string;
  autoFocus?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  onSearch,
  placeholder = 'Tìm kiếm theo tên khách hàng hoặc mã hóa đơn...',
  leftIcon,
  rightIcon,
  bgcolor = 'bg-[#f7faf9]', 
  radius = 'rounded-xl',    
  autoFocus = false,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) onSearch(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    /* VIỀN WRAP BÊN NGOÀI: Định nghĩa ở đây */
    <div
      className={`
        flex items-center border border-[#e5efeb] transition-all duration-200
        ${bgcolor} ${radius} px-4 py-2
        ${focused ? 'shadow-sm ring-1 ring-[#6b9685]/20 border-[#6b9685]/40' : ''} 
        ${className}
      `}
    >
      {/* Icon trái */}
      <div className='mr-3 text-[#6b9685] flex items-center shrink-0'>
        {leftIcon || <HiOutlineSearch className='h-5 w-5 stroke-[2px]' />}
      </div>

      {/* INPUT FIELD: Bỏ hoàn toàn viền và outline */}
      <input
        type='text'
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        /* outline-none và border-none đảm bảo không có viền riêng của input */
        className='flex-1 bg-transparent border-none outline-none ring-0 text-[#2d3a35] placeholder-[#93ada3] text-[15px] py-1'
      />

      {/* Icon phải / Nút xóa */}
      {value ? (
        <button
          type="button"
          onClick={() => onClear?.()}
          className='ml-2 text-[#93ada3] hover:text-red-500 transition-colors shrink-0'
        >
          <HiX className='h-4 w-4' />
        </button>
      ) : (
        rightIcon && <div className='ml-2 text-[#93ada3] shrink-0'>{rightIcon}</div>
      )}
    </div>
  );
};

export default SearchBar;