import Head from 'next/head'
import { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectWalletConnected,
  selectWalletAddress
} from '../features/settings/settingsSlice'

import {
  loadItems,
  loadItemsSWR,
} from '../features/items/itemsSlice'

// import components
import WalletPrompt from '../components/WalletPrompt/WalletPrompt'
import Gallery from '../components/Gallery/Gallery'

export default function Home() {
  const dispatch = useAppDispatch()
  const walletConnected = useAppSelector(selectWalletConnected)
  const walletAddress = useAppSelector(selectWalletAddress)
  const [itemsLoaded, setItemsLoaded] = useState("FALSE")

  if (walletConnected) {
    switch(itemsLoaded) {        
      case "FALSE":
        //console.log(loadItemsSWR)
        dispatch(loadItems(walletAddress))
        setItemsLoaded("TRUE")

      case "TRUE":
        return <Gallery/>         
    }
  } else {
    return <WalletPrompt/>
  }
}
