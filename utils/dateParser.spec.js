const { parseDate } = require("./dateParser");

test("test parseDate", () => {
  expect(parseDate("2021년 1월 9일 오후 7시 30분")).toStrictEqual({
    year: 2021,
    month: 1,
    date: 9,
    hour: 19,
    minute: 30,
    seconds: 0,
  });

  expect(parseDate("1월 9일 오후 7시 30분")).toStrictEqual({
    year: 2022,
    month: 1,
    date: 9,
    hour: 19,
    minute: 30,
    seconds: 0,
  });

  expect(parseDate("매주 수요일 오후 7시 30분")).toStrictEqual({
    repeat: "매주",
    week: "수",
    hour: 19,
    minute: 30,
    seconds: 0,
  });

  expect(parseDate("5시에")).toStrictEqual({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hour: 17,
    minute: 0,
    seconds: 0,
  });

  expect(parseDate("6시 30분에")).toStrictEqual({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hour: 18,
    minute: 30,
    seconds: 0,
  });

  expect(parseDate("이번주 수요일 오후 7시 30분")).toStrictEqual({
    repeat: "매주",
    week: "수",
    hour: 19,
    minute: 30,
    seconds: 0,
  });

  expect(parseDate("매달 15일 오전 10시 30분")).toStrictEqual({
    repeat: "매달",
    date: 15,
    hour: 10,
    minute: 30,
    seconds: 0,
  });
});
