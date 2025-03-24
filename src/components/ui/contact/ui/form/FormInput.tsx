import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-medium text-gray-700 dark:text-gray-200">{label}</span>
                </label>
                <input
                    ref={ref}
                    {...props}
                    className="input w-full text-white bg-gray-50/50 dark:bg-gray-700/50 border-0 border-b-2 border-gray-200 dark:border-gray-600 rounded-none focus:border-primary focus:ring-0 focus:bg-white dark:focus:bg-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:placeholder:text-gray-500"
                />
                {error && (
                    <span className="text-red-500 text-sm mt-1">{error.message}</span>
                )}
            </div>
        )
    }
)

FormInput.displayName = 'FormInput'