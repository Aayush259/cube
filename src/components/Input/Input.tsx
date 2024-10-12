"use client";
import React, { forwardRef } from 'react';
import ErrorMessage from '../Error/ErrorMessage';
import { InputProps } from '@/interfaces/interface';

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        id,
        label,
        name,
        type = 'text',
        labelclasses = '',
        className = '',
        error,
        ...rest
    }, ref) => {

        return (
            <div className="max-w-[90vw] mx-4 my-5 flex flex-col gap-2" >
                <div
                    className="flex flex-row justify-between items-center"
                >
                    {
                        label && (
                            <label
                                htmlFor={id}
                                className={`text-sm sm:text-lg ${labelclasses}`}
                            >
                                {label}
                            </label>
                        )
                    }
                    {
                        error && <ErrorMessage message={error} />
                    }
                </div>
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    name={name}
                    className={`max-w-full w-96 bg-transparent border border-[#cbd5e16E] rounded-md py-1 px-4 focus:border-white focus:outline-none ${className}`}
                    {...rest}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
