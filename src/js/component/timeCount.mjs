export const countDown = (bidsdate) => {
  const countDate = new Date().getTime();
  const now = new Date(bidsdate).getTime();
  const gap = countDate - now;
  const countdown = document.querySelector(".countdownDiv");

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  const textYear = Math.floor(gap / year);
  const textMonth = Math.floor((gap % year) / month);
  const textDay = Math.floor((gap % month) / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  if (textYear > 0) {
    return `year left`;
  }

  if (textMonth) {
    return `${Math.abs(textMonth)} Month`;
  }

  if (textDay > 0) {

    return `${Math.abs(textDay)} days`;
  }

  if (textHour > 0) {

    return `${Math.abs(textHour)} Hours`;
  }

  if (textMinute > 0) {
    return `${Math.abs(textMinute)} Minutes`;
  }

  if (textSecond <= 0) {
    // clearInterval();
    return `Bid Ended`;

  }
};

setInterval(countDown, 1000);
