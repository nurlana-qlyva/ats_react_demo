import { Input } from 'antd'
import { t } from 'i18next'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const FinansBilgileri = () => {
    const { control } = useFormContext()

    return (
        <div className="grid gap-1">
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("borc")}</label>
                    <Controller
                        name="borc"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                readOnly
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("alacak")}</label>
                    <Controller
                        name="alacak"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                readOnly
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("bakiye")}</label>
                    <Controller
                        name="bakiye"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                readOnly
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default FinansBilgileri
