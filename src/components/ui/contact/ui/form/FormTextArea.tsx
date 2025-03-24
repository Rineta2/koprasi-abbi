import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-medium text-gray-700 dark:text-gray-200">{label}</span>
                </label>
                <textarea
                    ref={ref}
                    {...props}
                    className="textarea w-full h-32 resize-none bg-gray-50/50 text-white dark:bg-gray-700/50 border-0 border-b-2 border-gray-200 dark:border-gray-600 rounded-none focus:border-primary focus:ring-0 focus:bg-white dark:focus:bg-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:placeholder:text-gray-500"
                />
                {error && (
                    <span className="text-red-500 text-sm mt-1">{error.message}</span>
                )}
            </div>
        )
    }
)

FormTextarea.displayName = 'FormTextarea'