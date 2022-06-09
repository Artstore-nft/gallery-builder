import { Octokit, App } from "octokit"

export default async function getShaAPI(accessToken: string, owner: string, repo: string, path: string): Promise<string> {
    const octokit = new Octokit({
        auth: accessToken
    })
    
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repo,
            path: path
        })

        const data = response.data as any

        return data.sha
    } catch(e) {
        console.log(e)
    }
}