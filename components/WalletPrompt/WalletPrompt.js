import { useAppDispatch } from '../../app/hooks'
import {
  connectWallet,
} from '../../features/settings/settingsSlice'

export default function WalletPrompt() {
  const dispatch = useAppDispatch()

  const handleConnectWallet = () => {
    dispatch(connectWallet())
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[lightpink] flex items-center justify-center z-20">
      <ConnectWalletButton handleConnectWallet={handleConnectWallet} />
    </div>
  )
}

function ConnectWalletButton({ handleConnectWallet }) {
  return <button className="bg-[white] p-[20px] rounded-full border-solid border-[black] border-[1px] hover:bg-[red]" onClick={handleConnectWallet}>Connect Wallet</button>
}
