const axios = require("axios")
const { getCmiMemberNickname } = require("./github")
const { getMattermostId } = require("./cmi")

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
  const sender = getMattermostId({ githubLoginId: loginId })

  sendMessageToChannel({
    text: `[충림이v2](${repository.html_url}) 새로운 PR이 도착했습니다. 소중한 코드리뷰 부탁드려요~ 🙏 \n[${title}](${url}) by ${sender.korNickname}`,
    channel: getChannelByPackage(title),
  })
}

async function sendForgotPullRequestNotification(pr) {
  const { loginId, full_name, html_url, url, title, diffDate } = pr

  sendMessageToChannel({
    text: `[충림이v2](${html_url}) ${diffDate}일이 지난 PR이 있습니다 🤕 소중한 코드리뷰 부탁드려요~ 🙏 \n[${title}](${url}) by ${getCmiMemberNickname(
      loginId,
    )}`,
    channel: getChannelByPackage(title),
  })
}

async function sendIssueNotification({ repository, url, title, loginId }) {
  const sender = getMattermostId({ githubLoginId: loginId })

  sendMessageToChannel({
    text: `[충림이v2](${repository.html_url}) 새로운 이슈가 도착했습니다. 어떤 내용일까요? 🥳 \n[${title}](${url}) ${sender.korNickname}`,
    channel: getChannelByPackage(title),
  })
}

async function sendMentionNotice({ url, title, body, loginId }) {
  const pattern = /@(\w+)/g

  let match
  while ((match = pattern.exec(body))) {
    const mentionId = match[1]

    const target = getMattermostId({ githubLoginId: mentionId })
    const sender = getMattermostId({ githubLoginId: loginId })

    if (!target) {
      logging(
        `[sendMentionNotice] 등록되지 않은 유저: ${mentionId} [${title}](${url})`,
      )
      continue
    }

    if (!sender) {
      logging(
        `[sendMentionNotice] 등록되지 않은 유저: ${loginId} [${title}](${url})`,
      )
      continue
    }

    sendMessageToChannel({
      text: `💬 [${title}](${url})에서 멘션  되었습니다. 확인 부탁드려요~ by ${sender.korNickname}\n > ${body}`,
      channel: `@${target.mattermost}`,
    })
  }
}

async function logging(log) {
  sendMessageToChannel({
    text: log,
    channel: "@jess",
  })
}

module.exports = {
  CHANNEL,
  sendForgotPullRequestNotification,
  sendIssueNotification,
  sendMessageToChannel,
  sendPullRequestNotification,
  sendMentionNotice,
}
