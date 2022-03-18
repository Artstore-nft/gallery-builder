import Image from 'next/image'
import Link from 'next/link'

export default function ItemCard ({ item }) {
    return (
        <Link href={`/item/${encodeURIComponent(item.id.address)}/${encodeURIComponent(item.id.id)}`}>
            <div className="bg-[white] w-full rounded-lg overflow-hidden shadow-md cursor-pointer transition ease-in-out hover:shadow-xl hover:-translate-y-2">
                {item.image && <ImageContainer image={item.image} />}
                <Info item={item} />
            </div>
        </Link>
    )
}

function ImageContainer({ image }) {
    return (
        <div className="relative container aspect-[1/1] overflow-hidden">
            { (image.type == 'video') ? <ItemCardVideo source={image.source} /> :<ItemCardImage source={image.source} /> }
        </div>
    )
}

function ItemCardVideo({ source }) {
    return <video autoPlay loop className="container"><source src={source} /></video>
}

function ItemCardImage({ source}) {
    return <Image src={source} layout="fill" />
}

function Info({ item }) {
    console.log(item)
    console.log(item.info)

    return (
        <div className="grid grid-cols-1 gap-y-[10px] w-full h-[100px] px-[20px] py-[10px]">
            <ItemCardName name={item.info.name} />
            <ItemCardCollection collection={item.info.collection} />
        </div>
    )
}
function ItemCardName({ name }) {
    return <h1 className="text-3xl font-semibold">{name}</h1>
}

function ItemCardCollection({ collection }) {
    return <h1 className="text-xl font-semibold">{collection}</h1>
}