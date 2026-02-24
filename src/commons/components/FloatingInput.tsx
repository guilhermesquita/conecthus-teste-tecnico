import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
    ({ label, error, hint, type, className, value, onBlur, onFocus, onChange, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const localRef = React.useRef<HTMLInputElement>(null);
        const inputId = React.useId();

        // Merge the forwarded ref with our local ref
        React.useImperativeHandle(ref, () => localRef.current!);

        const isPassword = type === 'password';
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        React.useLayoutEffect(() => {
            if (localRef.current) {
                setHasValue(localRef.current.value !== '');
            }
        }, [value, props.defaultValue]);

        const isFloating = isFocused || hasValue || !!error;
        const isActive = isFocused || hasValue;

        return (
            <div className="flex flex-col w-full font-sans">
                <div
                    className={cn(
                        "relative w-full h-[65px] bg-background rounded-t-lg border-b-2 transition-all duration-200 px-4 flex items-center",
                        error
                            ? "border-main-red shadow-[inset_0_-2px_0_#B00020] border-b-2!"
                            : isActive
                                ? "border-main-cyan-100 shadow-[inset_0_-2px_0_#00AAC1]"
                                : "border-[#86868645]"
                    )}
                >
                    <div className="flex-1 relative h-full flex flex-col justify-center">
                        <input
                            id={inputId}
                            ref={localRef}
                            type={inputType}
                            placeholder=" "
                            className={cn(
                                "w-full bg-transparent border-none outline-none text-[16px] text-main-green-300 font-bold transition-all duration-200 z-10",
                                "placeholder-transparent",
                                isFloating ? "mt-4" : "mt-0",
                                className
                            )}
                            onFocus={(e) => {
                                setIsFocused(true);
                                onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                onBlur?.(e);
                            }}
                            onChange={(e) => {
                                setHasValue(e.target.value !== '');
                                onChange?.(e);
                            }}
                            value={value}
                            {...props}
                        />
                        <label
                            htmlFor={inputId}
                            className={cn(
                                "absolute left-0 transition-all duration-200 pointer-events-none z-0",
                                isFloating
                                    ? "top-2 text-[12px] font-bold opacity-100 visible"
                                    : "top-1/2 -translate-y-1/2 text-[16px] font-medium text-main-gray",
                                (isFloating && !error) && "text-main-cyan-100",
                                error && "text-main-red"
                            )}
                        >
                            {label}
                        </label>
                    </div>

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-main-gray hover:text-main-green-300 transition-colors cursor-pointer z-20"
                        >
                            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                    )}

                </div>

                <div className="flex justify-between mt-1 h-5">
                    {error ? (
                        <span className="text-[12px] font-bold text-main-red uppercase tracking-wider">
                            {error}
                        </span>
                    ) : (
                        <span />
                    )}
                    {hint && !error && (
                        <span className="text-[12px] font-medium text-main-gray lowercase">
                            • {hint}
                        </span>
                    )}

                </div>
            </div >
        );
    }
);

FloatingInput.displayName = 'FloatingInput';
