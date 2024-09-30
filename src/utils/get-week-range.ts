export function getWeekRange() {
  const startOfWeek = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
  const endOfWeek = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6));
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  return `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
}