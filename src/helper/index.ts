import { format } from 'date-fns'

export const getFormattedDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return format(date, 'dd/MM/yyyy')
}
