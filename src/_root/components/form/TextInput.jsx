import { Input } from "antd";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

const TextInput = ({ control, name, label, color, disabled }) => {

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} style={{ color: color }}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        disabled={disabled}
                        onChange={(e) => {
                            field.onChange(e.target.value);
                        }}
                    />
                )}
            />
        </div>
    );
};

export default TextInput;
