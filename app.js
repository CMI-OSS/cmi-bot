const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const schedule = require("node-schedule");

require("dotenv").config();

const indexRouter = require("./routes/index");
const scheduleGithub = require("./app/github");
const { sendConferenceRemind, sendStudyRemind } = require("./app/slack");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

const 충림이_백엔드 = "C02NXF9QKRS";
const 충림이_프론트엔드 = "C02NEHY2CNB";
const 타입스크립트_스터디 = "C036PG3K2JY";

const dontForget = schedule.scheduleJob("0 0 16 * * 1-5", function () {
  scheduleGithub();
});

//  const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

schedule.scheduleJob({ hour: 10, minute: 50, dayOfWeek: 0 }, function () {
  sendStudyRemind({
    study: "타입스크립트 스터디",
    channelId: 타입스크립트_스터디,
    link: "https://github.com/CMI-OSS/study/tree/main/typescript",
  });
});

schedule.scheduleJob({ hour: 10, minute: 20, dayOfWeek: 0 }, function () {
  sendConferenceRemind({ team: "프론트엔드", channelId: 충림이_프론트엔드 });
});

schedule.scheduleJob({ hour: 9, minute: 50, dayOfWeek: 0 }, function () {
  sendConferenceRemind({ team: "백엔드", channelId: 충림이_백엔드 });
});

module.exports = app;
