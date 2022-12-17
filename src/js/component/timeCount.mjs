export const countDown = (bidsdate) => {
  const countDate = new Date(bidsdate).getTime();
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

  if (textMonth > 0) {
    countdown.innerHTML = ` ${textMonth} Months, ${textDay} Days`;
    return countdown;
  }

  if (textDay > 0) {
    countdown.innerHTML = ` ${textDay} Days, ${textHour} Hours`;
    return countdown;
  }

  if (textHour > 0) {
    countdown.innerHTML = ` ${textHour} Hours, ${textMinute} Minutes`;
    return countdown;
  }

  if (textMinute > 0) countdown.innerHTML = `${textMinute}:${textSecond}`;

  if (textSecond <= 0) {
    countdown.innerHTML = `Bid Ended`;
    clearInterval(countdown);
  }
};

setInterval(countDown, 1000);
