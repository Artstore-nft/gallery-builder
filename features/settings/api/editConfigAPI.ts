import { Octokit, App } from "octokit";
import { GalleryState } from "../settingsSlice";
import getShaAPI from "./getShaAPI";

export default async function editConfigAPI(accessToken: string, owner: string, repo: string, state: GalleryState): Promise<boolean> {
    const path = 'gallery-config.js'

    const octokit = new Octokit({
        auth: accessToken
    })

    const sha = await getShaAPI(accessToken, owner, repo, path)

    const content = Buffer.from(`export default ${JSON.stringify(state)}`).toString('base64')

    try {
        const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repo,
            path: path,
            message: 'Artstore config update',
            content: content,
            sha: sha
        })

        return true
    } catch(e) {
        console.log(e)
    }

}