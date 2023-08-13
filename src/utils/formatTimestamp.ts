export const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear() % 100}`;
    const formattedTime = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    return `${formattedDate} ${formattedTime}`;
  };