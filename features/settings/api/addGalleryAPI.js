import { useAppSelector } from "../../../app/hooks"
import { selectGithub } from "../settingsSlice"

import { Octokit, App } from "octokit";

export default async function addGalleryAPI(accessToken) {
    const octokit = new Octokit({
        auth: accessToken
    })
  
    try {
        const response = await octokit.request('POST /repos/{owner}/{repo}/forks', {
            owner: 'google',
            repo: 'googletest'
        })
        console.log(response)
    }
    catch(e) {
        console.log(e)
    }  
}
