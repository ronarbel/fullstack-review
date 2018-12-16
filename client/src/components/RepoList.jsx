import React from 'react';
import RepoEntry from './RepoEntry.jsx'

const RepoList = (props) => {
  let display = props.repos.map(repo => {
    return <RepoEntry repo={repo} />
  })
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <table id='table'><tbody>
        <tr>
          <th>Owner</th>
          <th>Repo Name</th>
          <th>Description</th>
          <th>Size</th>
          <th>Fork Count</th>
          <th>Watchers Count</th>
          <th>Created Date</th>
        </tr>
        {display}
      </tbody></table>
    </div>
  )
}


export default RepoList;