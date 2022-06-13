import { useAppDispatch } from '../../app/hooks'
import {
  connectWallet,
} from '../../features/settings/settingsSlice'

type ConnectWalletButtonProps = {
  handleConnectWallet: () => void
}

export default function WalletPrompt() {
  const dispatch = useAppDispatch()

  const handleConnectWallet = () => {
    dispatch(connectWallet())
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#33A1E4] pt-[200px] flex flex-col items-center gap-4 z-20">
      <Title />
      <SubTitle />
      <ConnectWalletButton handleConnectWallet={handleConnectWallet} />
    </div>
  )
}

function Title() {
  return <img src="/images/logos/artstoreTitle.png" className="w-[500px]" /> 
}

function SubTitle() {
  return <h1 className="text-white text-2xl font-bold">Online NFT gallery builder</h1>
}

function ConnectWalletButton({ handleConnectWallet }: ConnectWalletButtonProps) {
  return <button className="bg-[white] p-[20px] rounded-full font-medium text-gray-700 hover:bg-sky-200 active:bg-sky-600" onClick={handleConnectWallet}>Connect Wallet</button>
}
