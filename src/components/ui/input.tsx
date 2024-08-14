import * as React from "react";
import { Eye, EyeOff, Search } from "lucide-react";

import { cn } from "@/lib/utils";

// TODO : Remove the the eye icon from the edge, cause the fucking edge add it by itself

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "fancyLabel";
    label?: string;
    labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, disabled, type, variant, label, labelClassName, ...props },
        ref
    ) => {
        const [show, setShow] = React.useState<"show" | "hide">("hide");

        if (variant === "fancyLabel") {
            const { id } = props;
            return (
                <div className={cn(`relative flex rounded-md`, className)}>
                    <input
                        {...props}
                        id={id}
                        ref={ref}
                        type={type}
                        disabled={disabled}
                        className={
                            "border-input placeholder:text-muted-foreground focus-visible:ring-ring peer flex h-12 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 shadow-sm ring-primary/75 transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                        }
                    />
                    <label
                        htmlFor={id}
                        className={cn(
                            `absolute left-4 top-1/2 translate-y-[-50%] bg-white text-base font-light duration-150 peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-primary peer-focus:left-3 peer-focus:top-0 peer-focus:px-2 peer-focus:text-sm peer-focus:text-primary`,
                            labelClassName
                        )}
                    >
                        {label}
                    </label>
                </div>
            );
        }

        if (type === "search") {
            return (
                <div
                    className={cn(
                        "border-input focus-within:ring-ring flex h-10 w-full items-center rounded-md border px-3 py-1 transition-colors focus-within:outline-none focus-within:ring-1",
                        disabled ? "cursor-not-allowed opacity-50" : "",
                        className
                    )}
                >
                    <input
                        {...props}
                        ref={ref}
                        // here the disabled could be undefined if the component does'nt receive the disabled prop so thats why we need to pass the true and false value by checking if disabled is true or not
                        disabled={disabled ? true : false}
                        type={"search"}
                        className={cn(
                            "placeholder:text-muted-foreground w-full bg-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    />
                    <button
                        type="button"
                        className={cn(
                            "grid size-[20px] h-full place-content-center border-l border-black pl-6 pr-3 outline-none transition-colors focus-visible:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        disabled={disabled ? true : false}
                    >
                        <Search />
                    </button>
                </div>
            );
        }

        if (type === "password") {
            return (
                <div
                    className={cn(
                        "border-input focus-within:ring-ring flex h-10 w-full items-center rounded-md border px-3 py-1 transition-colors focus-within:outline-none focus-within:ring-1",
                        disabled ? "cursor-not-allowed opacity-50" : "",
                        className
                    )}
                >
                    <input
                        {...props}
                        ref={ref}
                        // here the disabled could be undefined if the component does'nt receive the disabled prop so thats why we need to pass the true and false value by checking if disabled is true or not
                        disabled={disabled ? true : false}
                        type={
                            !disabled
                                ? show === "hide"
                                    ? "password"
                                    : "text"
                                : "password"
                        }
                        className={cn(
                            "placeholder:text-muted-foreground w-full bg-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    />
                    <button
                        type="button"
                        className={cn(
                            "ml-3 grid size-[20px] place-content-center rounded-full outline-none transition-colors focus-visible:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        onClick={() => {
                            show === "hide" ? setShow("show") : setShow("hide");
                        }}
                        disabled={disabled ? true : false}
                    >
                        {!disabled ? (
                            show === "hide" ? (
                                <Eye />
                            ) : (
                                <EyeOff />
                            )
                        ) : (
                            <Eye></Eye>
                        )}
                    </button>
                </div>
            );
        }

        return (
            <input
                {...props}
                ref={ref}
                type={type}
                disabled={disabled ? true : false}
                className={cn(
                    "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-1 shadow-sm ring-primary transition-colors file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
