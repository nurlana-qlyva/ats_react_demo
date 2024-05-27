import { Button, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Controller, useForm } from 'react-hook-form'

const FirmaInfo = () => {
    const defaultValues = {
        kmAracId: 0,
        seferSiraNo: 0,
        yakitSiraNo: 0,
        plaka: "",
        tarih: new Date(),
        saat: "",
        eskiKm: 0,
        yeniKm: 0,
        fark: 0,
        kaynak: "",
        dorse: false,
        aciklama: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    return (
        <div className='grid gap-1'>
            <div className="col-span-2" style={{ textAlign: 'center' }}>
                <img src="/images/ats_login_image.jpg" alt="" style={{ width: "100%" }} />
            </div>
            <div className="col-span-10">
                <div className="grid gap-1 p-10">
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>Firma Ünvanı</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>Adres 1</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>Adres 2</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>Şehir</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>İlçe</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>PK</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-1">
                            <label>Ülke</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Telefon</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Fax</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Web</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Vergi Dairesi</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Vergi Numarası</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-1">
                    <label>Açıklama</label>
                    <Controller
                        name=""
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="justify-end flex gap-1 col-span-12 mt-10">
                <Button className="btn btn-min primary-btn">Kaydet</Button>
                <Button className="btn btn-min cancel-btn">İptal</Button>
            </div>
        </div>
    )
}

export default FirmaInfo
