const formatDate = (value: string) => {
  const [year = '', month] = value.split('-')
  return month ? `${month}.${year}` : year
}

export const formatPeriod = (from: string, to: string | null, presentLabel: string) =>
  `${formatDate(from)} - ${to ? formatDate(to) : presentLabel}`
