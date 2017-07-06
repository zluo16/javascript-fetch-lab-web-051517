const reposUrl = 'https://api.github.com/repos/'
const repo = 'learn-co-curriculum/javascript-fetch-lab'
var userName = 'YOUR_USER_NAME_HERE'
const fork = `${userName}/javascript-fetch-lab`


function Repo(json) {
  this.name = json.name
  this.url = json.url
}

function Issue(json) {
  this.user = json.user.login
  this.body = json.body
  this.url = json.url
}

Repo.prototype.template = function() {
  return `<h3>Forked Successfully!</h3><a href="${this.url}">${this.name}</a>`
}

Issue.prototype.template = function() {
  return `<div>
  <h3>${this.user}</h3>
  <p>${this.body}</p>
  <p><a href="${this.url}">Link</a></p>
  </div><br>`
}

function getIssues() {
  fetch(`${reposUrl}${fork}/issues`, {
    method: 'GET',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).
  then(json => {
    json.forEach(function(issueJSON) {
      let issue = new Issue(issueJSON)
      showIssues(issue)
    })
  })
}

function showIssues(issue) {
  let issuesDiv = document.getElementById('issues')
  issuesDiv.innerHTML = issue.template()
}

function createIssue() {
  let isTitle = document.getElementById('title').value
  let isBody = document.getElementById('body').value
  let postData = { title: isTitle, body: isBody }

  fetch(`${reposUrl}${fork}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: JSON.stringify(postData)
  }).then(getIssues())
}

function showResults(repo) {
  $('#results').append(repo.template())
}

function forkRepo() {
  fetch(reposUrl + repo + '/forks', {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).
  then(json => {
    let repo = new Repo(json)
    showResults(repo)
  })
}

function getToken() {
  return 'YOUR_AUTHORIZATION'
}
