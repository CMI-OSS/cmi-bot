const { WebClient } = require("@slack/web-api");

const token = process.env.CMI_BOT_TOKEN;

const web = new WebClient(token);

const getCmiMemberNickname = (loginId) => {
  const cmiMember = new Map([
    ["kingyong9169", "브루니"],
    ["ionc635", "스티븐"],
    ["JeongHyeongKim", "조나슨"],
    ["nohgijin", "트레저"],
    ["thdwlsgus0", "스캇"],
    ["EunjiShin", "우디"],
    ["jaryapp", "제스"],
    ["vcho1958", "애드워드"],
    ["soonitoon", "수니툰"],
  ]);

  return cmiMember.get(loginId) || loginId;
};

async function postMessageChannel(text, channelId) {
  await web.chat.postMessage({ text, channel: channelId });
}

function getLinkText(text, url) {
  return `<${url}|${text}>`;
}

async function sendPullRequestNotification({
  repository,
  channelId,
  url,
  title,
  loginId,
}) {
  postMessageChannel(
    `[${getLinkText(
      repository.full_name,
      repository.html_url
    )}] 새로운 PR이 도착했습니다. 소중한 코드리뷰 부탁드려요~ 🙏 \n<${url}|${title}> by ${getCmiMemberNickname(
      loginId
    )}`,
    channelId
  );
}

async function sendForgotPullRequestNotification(pr) {
  const { loginId, full_name, html_url, url, title, diffDate } = pr;
  postMessageChannel(
    `[${getLinkText(
      full_name,
      html_url
    )}] ${diffDate}일이 지난 PR이 있습니다🤕 소중한 코드리뷰 부탁드려요~ 🙏 \n<${url}|${title}> by ${getCmiMemberNickname(
      loginId
    )}`,
    "C02KD9Z8A83"
  );
}

async function sendIssueNotification({
  repository,
  channelId,
  url,
  title,
  loginId,
}) {
  postMessageChannel(
    `[${getLinkText(
      repository.full_name,
      repository.html_url
    )}] 새로운 이슈가 도착했습니다. 어떤 내용일까요? 🥳 \n<${url}|${title}> by ${getCmiMemberNickname(
      loginId
    )}`,
    channelId
  );
}

module.exports = {
  sendPullRequestNotification,
  sendIssueNotification,
  sendForgotPullRequestNotification,
  postMessageChannel,
};
