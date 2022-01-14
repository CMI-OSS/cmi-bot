const {
  sendPullRequestNotification,
  sendIssueNotification,
} = require("../app/slack");

const express = require("express");
const router = express.Router();

const 충림이_알림 = "C02KD9Z8A83";
const 테스트 = "C02R2GVEYS2";

const 알림채널 = process.env.NODE_ENV === "development" ? 테스트 : 충림이_알림;

router.post("/github", function (req, res) {
  console.log(req.body);
  if (req.body.action === "opened") {
    if (req.body.pull_request) {
      const { pull_request } = req.body;

      sendPullRequestNotification({
        channelId: 알림채널,
        repository: repository,
        url: pull_request.html_url,
        title: pull_request.title,
        loginId: pull_request.user.login,
      });
    }
    if (req.body.issue) {
      const { issue, repository } = req.body;

      sendIssueNotification({
        channelId: 알림채널,
        repository: repository,
        url: issue.html_url,
        title: issue.title,
        loginId: issue.user.login,
      });
    }
  }

  res.send(200);
});

module.exports = router;
