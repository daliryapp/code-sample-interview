import * as Yup from 'yup';

export const SeachSchema = Yup.object().shape({
    from: Yup.object().shape({
        cityCode: Yup.string().required('فرودگاه مبدا سفر خود را وارد کنید')
    }).typeError('فرودگاه مبدا سفر خود را وارد کنید'),
    to: Yup.object().shape({
        cityCode: Yup.string().required('فرودگاه مقصد سفر خود را وارد کنید')
    }).typeError('فرودگاه مقصد سفر خود را وارد کنید'),
    date: Yup.object().shape({
        day: Yup.string().required('تاریخ رفت سفر خود را مشخص کنید')
    }).typeError('تاریخ رفت سفر خود را مشخص کنید'),
    date2: Yup.object().shape({
        day: Yup.string().required('تاریخ برگشت سفر خود را مشخص کنید')
    }).typeError('تاریخ برگشت سفر خود را مشخص کنید')

})