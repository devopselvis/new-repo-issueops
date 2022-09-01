const parseIssueBody = require('./parse-issue-body.js')

module.exports = async ({github, context}) => {
  const { repositoryName, templateRepository, teamPermission, enableIssues, renameMaster, hasLfs } = parseIssueBody({context})
  let commentBody
  
  if (repositoryName && templateRepository && teamPermission && enableIssues && renameMaster && hasLfs) {
    commentBody = `👋 Thank you for opening this migration issue.
  
    The following **${repositories.trim().split('\n').length} repositories** have been parsed from your issue body:
  
    \`\`\`${repositories}\`\`\`
  
    The **repository name** is set to be: **\`${ repositoryName }\`**
    The **template repository** is set to be: **\`${ templateRepository }\`**
    The **team permissions** is set to be: **\`${ teamPermission }\`**
    Are we going to enable **issues** **\`${ enableIssues }\`**
    Are we renaming **master** to **main**? **\`${ renameMaster }\`**
    Is there any **Git LFS** enabled? **\`${ hasLfs }\`**
  
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