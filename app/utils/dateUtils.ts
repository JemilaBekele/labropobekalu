// dateUtils.ts
export const formatDateTime = (
    dateTime: Date,
    format: 'medium' ,
    locale: string = 'en-US'
  ): string => {
    const optionsMap: { [key: string]: Intl.DateTimeFormatOptions } = {  
      medium: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }
    };
  
    const options = optionsMap[format] || optionsMap['short'];
    return new Intl.DateTimeFormat(locale, options).format(dateTime);
  };
  