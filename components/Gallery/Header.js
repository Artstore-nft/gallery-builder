import { withRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

function Header({ router }) {
    return ( 
        <div className="w-full h-[60px] px-[20px] py-[6px]">
            {router.pathname != '/' && <HomeButton /> }
        </div>
    )
}
function HomeButton() {
    return (
        <Link href="/">
            <a className="w-fit h-full flex px-[5px] border-2 rounded-xl">
                <HomeButtonImageContainer />
                <HomeButtonTitle />
            </a>
        </Link>
    )
}
function HomeButtonImageContainer() {
    return(
        <div className="w-full h-full p-[3px]">
            <HomeButtonImageBox />
        </div>
    )
}
function HomeButtonImageBox() {
    return (
        <div className="relative h-full aspect-[1/1] rounded-full  overflow-hidden">
            <HomeButtonImage />
        </div>
    )
}
function HomeButtonImage() {
    return <Image src="https://pbs.twimg.com/profile_images/1479035114394845187/cYeg9mSk_400x400.png" layout="fill" />
}
function HomeButtonTitle() {
    return <h1 className="grid content-center text-lg px-[5px]">Gallery</h1>
}

export default withRouter(Header)
