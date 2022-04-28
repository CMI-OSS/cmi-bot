const { default: axios } = require("axios");
const { sendForgotPullRequestNotification } = require("./slack");


let prList = [];


const fetchGithub = async () => {

  prList = []
  

  try {
    const repos = await axios.get(
      "https://api.github.com/repos/CMI-OSS/cbnu-alrami/pulls",
      // {
      //   headers: {
      //     Authorization: `token ${process.env.GITHUB_TOKEN}`,
      //   },
      // }
    );
    repos.data.forEach((repo) => {
      console.log(repo._links.html.href);
      !repo.draft &&
        prList.push({
          loginId: repo.user.login,
          full_name: repo.base.repo.full_name,
          html_url: repo.base.repo.html_url,
          url: repo._links.html.href,
          title: repo.title,
          created_at: repo.created_at,
        });
    });
  } catch (err) {
    console.log(err, "err");
  }
};

const scheduleGithub = async () => {

  const notiPrList = [];

  await fetchGithub();
  prList.forEach((pr) => {
    const diffDate = Math.floor(
      Math.abs(new Date(pr.created_at).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (diffDate >= 4) {
      notiPrList.push({ ...pr, diffDate });
    }
  });


  notiPrList.forEach((pr) => {
    sendForgotPullRequestNotification(pr);
  });
};

module.exports = scheduleGithub;
