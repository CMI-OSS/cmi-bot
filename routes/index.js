const express = require("express")
const {
  sendPullRequestNotification,
  sendIssueNotification,
  sendMentionNotice,
} = require("../app/mattermost")
const { sendDiscussionNotification } = require("../app/slack")
const router = express.Router()

const 충림이_알림 = "C02KD9Z8A83"
const 테스트 = "C02R2GVEYS2"

const 알림채널 = process.env.NODE_ENV === "development" ? 테스트 : 충림이_알림

router.post("/github", function (req, res) {
  if (req.body.action === "opened") {
    if (req.body.pull_request) {
      const { pull_request, repository } = req.body

      sendPullRequestNotification({
        repository: repository,
        url: pull_request.html_url,
        title: pull_request.title,
        loginId: pull_request.user.login,
      })
    }
    if (req.body.issue) {
      const { issue, repository } = req.body

      sendIssueNotification({
        repository: repository,
        url: issue.html_url,
        title: issue.title,
        loginId: issue.user.login,
      })
    }
  }

  if (req.body.action === "created") {
    if (req.body.discussion) {
      const { discussion, repository } = req.body

      sendDiscussionNotification({
        repository: repository,
        url: discussion.html_url,
        title: discussion.title,
        loginId: discussion.user.login,
      })
    }

    if (req.body.comment) {
      if (req.body.comment) {
        // const { repository } = req.body

        const { title } = req.body.issue
        const { html_url, body } = req.body.comment
        const { login } = req.body.sender

        sendMentionNotice({
          title,
          url: html_url,
          loginId: login,
          body,
        })
      }
    }
  }

  res.send(200)
})

router.get("/slack", function (req, res) {
  postMessageChannel(req.query.message, 알림채널)
  res.send(200)
})

router.get("/test/slack", function (req, res) {
  postMessageChannel(req.query.message, 테스트)
  res.send(200)
})

module.exports = router
