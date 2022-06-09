import { Octokit, App } from "octokit";

export default async function getInstallsAPI(accessToken: string): Promise<boolean> {
    const artstoreAppId = 203714
    
    const octokit = new Octokit({
        auth: accessToken
    })
  
    try {
        const response = await octokit.request('GET /user/installations')
        const installations = response.data.installations

        for (let installation of installations) {
            const appId = installation.app_id

            if (appId == artstoreAppId) {
                return true
            }
        }

        return false
    }
    catch(e) {
        console.log(e)
    }  
}
