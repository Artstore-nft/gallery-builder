// import components
import Header from "../Header"
import Footer from "../Footer"
import { useEffect, useState } from "react"

export default function Item({ item }) {
    return(
        <div className="flex-col overflow-auto w-screen h-full min-h-screen bg-[rgb(253,253,253)]">
            <Header />
            <ItemContent item={item} />
            <Footer />
        </div>
    )
}
function ItemContent({ item }) {
    const defaultItem = {
        image: { type: "image" },
        info: { name: "", collection: "" }
    }
    const [displayItem, setItem] = useState(defaultItem)

    useEffect(() => {
        item && setItem(item)
    })

    return(
        <div className="relative w-full overflow-auto">
            <ItemImageArea image={displayItem.image} />
            <ItemInfo info={displayItem.info} />
        </div>
    )
}
function ItemImageArea({ image }) {
    return(
        <div className="relative w-full h-[80vh] p-[70px] bg-[rgb(240,240,240)]" >
            <ItemImageContainer image={image} />
        </div>
    )
}
function ItemImageContainer({ image }) {
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        // if image type is video, show video
        image.type == "video" && setShowVideo(true)
    })

    return(
        <div className="relative w-[100%] h-[100%] flex justify-center" >
            { showVideo ? <ItemVideo source={image.source} /> : <ItemImage source={image.source} /> }
        </div>
    ) 
}
function ItemVideo({ source }) {
    return <video className="h-full object-contain" src={source} autoPlay loop muted></video>
}
function ItemImage({ source }) {
    return <img className="object-contain" src={source} />
}

function ItemInfo({ info }) {
    const [displayAttributes, setAttributes] = useState([])
    const [showAttributes, setShowAttributes] = useState(false)

    useEffect(() => {
        // if attributes exist, set attributes and show attributes
        if (info.attributes) {
            setAttributes(info.attributes)
            setShowAttributes(true)  
        }
    })

    return(
        <div className="relative w-full grid grid-cols-2 gap-[5%] p-[30px]" >
            <ItemIntro info={info} />
            {showAttributes && <ItemAttributes attributes={displayAttributes} />}
        </div>
    )
}

function ItemIntro({ info }) {
    const [showDescription, setShowDescription] = useState(false)

    useEffect(() => {
        info.description && setShowDescription(true);
    })

    return(
        <div className="w-full h-fit grid grid-cols-1 gap-y-4" >
            <ItemName name={info.name} />
            <ItemCollection collection={info.collection} />
            {showDescription && <ItemDescription description={info.description} />}
        </div>
    )
}
function ItemName({ name }) {
    return <h1 className="text-5xl font-bold">{name}</h1>
}
function ItemCollection({ collection }) {
    return <h1 className="text-2xl font-bold">{collection}</h1>
}
function ItemDescription({ description }) {
    return(
        <div className="w-full grid grid-cols-1 gap-y-2">
            <ItemDescriptionTitle />
            <ItemDescriptionContent description={description} />
        </div>
    )
}
function ItemDescriptionTitle() {
    return <h1 className="text-left text-xl font-bold border-b-[1px]">Description</h1>
}
function ItemDescriptionContent({ description }) {
    return <p className="whitespace-pre-wrap">{description}</p>
}

function ItemAttributes({ attributes }) {
    return(
        <div className="w-full h-fit grid grid-cols-1" >
            <ItemAttributesTitle />
            <ItemAttributesContent attributes={attributes} />
        </div>
    )
}
function ItemAttributesTitle() {
    return <h1 className="text-center text-4xl font-semibold pb-[4px] border-b-[2px] border-black">Attributes</h1>
}
function ItemAttributesContent({ attributes }) {
    return( 
        <div className="w-full h-fit grid grid-cols-1">
            {attributes.map((attribute, k) => {
                return <ItemAttribute attribute={attribute} key={k} />   
            })}
        </div>
    )
}
function ItemAttribute({ attribute }) {
    return( 
        <div className="w-full h-fit grid grid-cols-2 py-[20px] border-b-2">
            <ItemAttributeType type={attribute.trait_type} />
            <ItemAttributeValue value={attribute.value} />
        </div>
    )
}
function ItemAttributeType({ type }) {
    return <h1 className="text-center text-xl">{type}:</h1>
}
function ItemAttributeValue({ value }) {
    return <h1 className="text-center text-xl">{value}</h1>
}