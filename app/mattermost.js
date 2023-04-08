const axios = require("axios")
const { getCmiMemberNickname } = require("./github")

const mattermostServer = "http://192.168.219.190:8065"

const 크미봇 = {
  username: "크미봇",
}

const CHANNEL = {
  테스트용채널: "testyy",
  충림이: "cbnu_alrami",
  충림이_BE: "cbnu_alrami_be",
  충림이_FE: "cbnu_alrami_FE",
  충림이_ADMIN: "cbnu_alrami_admin",
  충림이_SCRAPER: "cbnu_alrami_scraper",
  충림이_NATIVE: "cbnu_alrami_native",
  충림이_알림: "cbnu_alrami_notice",
}

function sendMessageToChannel({ channel, text }) {
  axios.post(mattermostServer + "/hooks/ftkau6m8ojr89go5krtxowfaba", {
    ...크미봇,
    channel,
    text,
  })
}

function getChannelByPackage(title) {
  if (/server/.test(title)) return CHANNEL.충림이_BE
  if (/mobile/.test(title)) return CHANNEL.충림이_FE
  if (/native/.test(title)) return CHANNEL.충림이_NATIVE
  if (/scraper/.test(title)) return CHANNEL.충림이_SCRAPER
  if (/admin/.test(title)) return CHANNEL.충림이_ADMIN

  return CHANNEL.충림이_알림
}

async function sendPullRequestNotification({
  repository,
  url,
  title,
  loginId,
}) {
  sendMessageToChannel({
    text: `[충림이v2](${
      repository.html_url
    }) 새로운 PR이 도착했습니다. 소중한 코드리뷰 부탁드려요~ 🙏 \n[${title}](${url}) by ${getCmiMemberNickname(
      loginId,
    )}`,
    channel: getChannelByPackage(title),
  })
}

async function sendForgotPullRequestNotification(pr) {
  const { loginId, full_name, html_url, url, title, diffDate } = pr

  sendMessageToChannel({
    text: `[충림이v2](${html_url}) ${diffDate}일이 지난 PR이 있습니다🤕 소중한 코드리뷰 부탁드려요~ 🙏 \n[${title}](${url}) by ${getCmiMemberNickname(
      loginId,
    )}`,
    channel: getChannelByPackage(title),
  })
}

async function sendIssueNotification({ repository, url, title, loginId }) {
  sendMessageToChannel({
    text: `[충림이v2](${
      repository.html_url
    }) 새로운 이슈가 도착했습니다. 어떤 내용일까요? 🥳 \n[${title}](${url}) by ${getCmiMemberNickname(
      loginId,
    )}`,
    channel: getChannelByPackage(title),
  })
}

module.exports = {
  CHANNEL,
  sendForgotPullRequestNotification,
  sendIssueNotification,
  sendMessageToChannel,
  sendPullRequestNotification,
}
