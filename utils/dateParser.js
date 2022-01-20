function parseDate(stringDate) {
  const toNumber = /[^0-9]/g;
  const isYear = /....년/g;
  const isMonth = /..월/g;
  const isDaily = /매./g;
  const isDate = /..일/g;
  const isHour = /..시/g || /..시./g;
  const isMinute = /..분/g || /..분./g;
  const isSecond = /..초/g;
  const isWeek = /.요일/g;
  const isAM = /오전/g;
  const isThis = /이번./g;

  const year = isYear.test(stringDate)
    ? parseInt(stringDate.match(isYear)[0].replace(toNumber, ""))
    : new Date().getFullYear();

  const month = isMonth.test(stringDate)
    ? parseInt(stringDate.match(isMonth)[0].replace(toNumber, ""))
    : new Date().getMonth() + 1;

  const date = isDate.test(stringDate)
    ? parseInt(stringDate.match(isDate)[0].replace(toNumber, ""))
    : new Date().getDate();

  let hour = parseInt(stringDate.match(isHour)[0].replace(toNumber, ""));
  if (!isAM.test(stringDate)) {
    hour += 12;
  }

  const minute = isMinute.test(stringDate)
    ? parseInt(stringDate.match(isMinute)[0].replace(toNumber, ""))
    : 0;

  const seconds = isSecond.test(stringDate)
    ? parseInt(stringDate.match(isSecond)[0].replace(toNumber, ""))
    : 0;

  // 매일, 매주 또는 매달

  if (isDaily.test(stringDate)) {
    const repeat = stringDate.match(isDaily)[0];

    if (repeat === "매일") {
      return {
        repeat,
        hour,
        minute,
        seconds,
      };
    }

    if (repeat === "매주") {
      const week = stringDate.match(isWeek)[0][0];

      return {
        repeat,
        week,
        hour,
        minute,
        seconds,
      };
    }

    if (repeat === "매달") {
      return {
        repeat,
        date,
        hour,
        minute,
        seconds,
      };
    }
  }

  // 이번주, 이번달, 이번년
  if (isThis.test(stringDate)) {
  }

  console.log({
    year,
    month,
    date,
    hour,
    minute,
    seconds,
  });

  return {
    year,
    month,
    date,
    hour,
    minute,
    seconds,
  };
}

const stringDate = "2021년 1월 9일 오후 7시 30분";
parseDate(stringDate);

module.exports = {
  parseDate,
};
