import { Octokit, App } from "octokit";
import getShaAPI from "./getShaAPI";

export default async function addProfileImageAPI(accessToken: string, owner: string, repo: string, image: File): Promise<boolean> {
    const path = 'public/images/' + image.name

    const octokit = new Octokit({
        auth: accessToken
    })

    const sha = await getShaAPI(accessToken, owner, repo, path)
    const content = await toBase64(image)

    const strippedContent = content.replace(/^data:.*;base64,/, "")

    try {
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repo,
            path: path,
            message: 'Artstore set profile image',
            content: strippedContent,
            sha: sha
        })

        return true
    } catch(e) {
        console.log(e)
    }
}

function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject
    })
}