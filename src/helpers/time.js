import moment from 'moment'

export const dateVN = (data) => moment(data).format("DD-MM-YYYY")

export const datetimeVN = (data) => moment(data).format("DD-MM-YYYY HH:mm:ss")