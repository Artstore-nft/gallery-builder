
import Header from './Header'
import Footer from './Footer'
import GalleryItems from './GalleryItems/GalleryItems'
import Profile from './Profile/Profile'

export default function Gallery() {
    return (
        <div className="relative w-screen min-h-screen h-fit grid grid-cols-1 overflow-auto bg-[rgb(253,253,253)]">
            <Header />
            <GalleryContent />
            <Footer />
        </div>
    )
} 

function GalleryContent() {
    return (
        <div className="relative w-full overflow-auto py-[20px] m-0">
            <Profile />
            <GalleryItems />
        </div>
    )
}
