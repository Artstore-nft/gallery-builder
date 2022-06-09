// import hooks
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'

// import global selectors and actions
import {
  selectWalletAddress,
  selectWalletConnected
} from '../features/settings/settingsSlice'
import {
  loadItems,
  selectItemsLoaded
} from '../features/items/itemsSlice'

// import components
import WalletPrompt from '../components/WalletPrompt/WalletPrompt'
import Gallery from '../components/Gallery/Gallery'

export default function Home() {
  const dispatch = useAppDispatch()
  const walletConnected: boolean = useAppSelector(selectWalletConnected)
  const walletAddress: string = useAppSelector(selectWalletAddress)
  const itemsLoaded: "FALSE" | "PENDING" | "TRUE" = useAppSelector(selectItemsLoaded)
  const [showWalletPrompt, setShowWalletPrompt] = useState(false)

  useEffect(() => {
    //if wallet is connected, don't show wallet prompt, else show wallet prompt
    walletConnected ? setShowWalletPrompt(false) : setShowWalletPrompt(true);

    // if wallet address is available and items are not yet loaded, load items
    (walletAddress && (itemsLoaded == "FALSE")) && dispatch(loadItems(walletAddress));
  })

  return(
    <div className="relative w-full min-h-screen h-fit">
      { showWalletPrompt && <WalletPrompt /> }
      <Gallery />
    </div>
  )
}