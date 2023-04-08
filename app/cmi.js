const cmiMembers = [
  { github: "jaryapp", mattermost: "jess", korNickname: "제스" },
  { github: "ionc635", mattermost: "steven", korNickname: "스티븐" },
  { github: "nohgijin", mattermost: "chloe", korNickname: "클로이" },
  { github: "thdwlsgus0", mattermost: "scott", korNickname: "스캇" },
  { github: "EunjiShin", mattermost: "woody", korNickname: "우디" },
  { github: "kingyong9169", mattermost: "bruney", korNickname: "브루니" },
  { github: "soonitoon", mattermost: "soonitoon", korNickname: "수니툰" },
  { github: "Phlox09022", mattermost: "phlox", korNickname: "플록스" },
]

function getMattermostId({ githubLoginId }) {
  const member = cmiMembers.find((member) => member.github === githubLoginId)

  return member ?? null
}

module.exports = {
  cmiMembers,
  getMattermostId,
}
