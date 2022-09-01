const parseIssueBody = require('./parse-issue-body.js')

module.exports = async ({github, context}) => {
  const { repoName, templateRepository, teamPermissions, enableIssues, enableProjects, allowForking, allowSquashMerge } = parseIssueBody({context})

  let commentBody
  
  if (repoName && templateRepository && teamPermissions && enableIssues && enableProjects && allowForking && allowSquashMerge) {
    commentBody = `👋 Thank you for opening this migration issue.
  
    The following has been parsed from your issue body:

    The **repo name** is set to be: **\`${ repoName }\`**
    The **template repository** is set to be: **\`${ templateRepository }\`**
    The **team permissions** is set to be: **\`${ teamPermissions }\`**
    Are we **enabling issues**? **\`${ enableIssues }\`**
    Are we **enabling projects**? **\`${ enableProjects }\`**
    Are we **allowing forking**? **\`${ allowForking }\`**
    Are we **allowing squash merges**? **\`${ allowSquashMerge }\`**
  
    <details>
      <summary><b>Troubleshooting</b></summary>
  
    If the parsed repository name is not matching the repositories listed in your issue body, you can edit the issue body and make sure it's correct. Type your repository name in a code snippet similar to this:
  
    \`repo-name\`
    </details>
  
    ## Create the repo
  
    Add a comment to this issue with in order to create the repo:
  
    \`\`\`
    /create-repo
    \`\`\`
  
    `
  } else {
    commentBody = '😢 The issue body could not be parsed. Please open a new issue using an issue template.'
  }
  
  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentBody.replace(/  +/g, '')
  })
}