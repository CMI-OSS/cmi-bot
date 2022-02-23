const { default: axios } = require("axios");
const { sendForgotPullRequestNotification } = require("./slack");

const prList = [];
const notiPrList = [];
const fetchGithub = async () => {
  try {
    const repos = await axios.get(
      "https://api.github.com/repos/CMI-OSS/cbnu-alrami/pulls",
      {
        headers: {
          Authorization: `token ${env.GITHUB_TOKEN}`,
        },
      }
    );
    repos.data.forEach((repo) => {
      !repo.draft &&
        prList.push({
          loginId: repo.user.login,
          full_name: repo.base.repo.full_name,
          html_url: repo.base.repo.html_url,
          url: repo.url,
          title: repo.title,
          created_at: repo.created_at,
        });
    });
  } catch (err) {}
};

const scheduleGithub = async () => {
  await fetchGithub();
  prList.forEach((pr) => {
    const diffDate = Math.floor(
      Math.abs(new Date(pr.created_at).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (diffDate >= 3) {
      notiPrList.push({ ...pr, diffDate });
    }
  });

  notiPrList.forEach((pr) => {
    sendForgotPullRequestNotification(pr);
  });
};

module.exports = scheduleGithub;
