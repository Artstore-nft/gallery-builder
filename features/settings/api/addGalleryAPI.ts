import { Octokit, App } from "octokit";
import { GalleryState } from "../settingsSlice";
import editConfigAPI from "./editConfigAPI";

export default async function addGalleryAPI(accessToken: string, username: string, state: GalleryState): Promise<string> {
    const octokit = new Octokit({
        auth: accessToken
    })
  
    try {
        const response = await octokit.request('POST /repos/{owner}/{repo}/forks', {
            owner: 'Artstore-nft',
            repo: 'gallery-template'
        })

        const repo = response.data.name

        await editConfigAPI(accessToken, username, repo, state)

        return repo

    }
    catch(e) {
        console.log(e)
    }  
}
