import { useAppDispatch } from '../../app/hooks'
import {
  connect,
} from '../../features/settings/settingsSlice'

export default function WalletPrompt() {
  const dispatch = useAppDispatch()

  return (
    <div className="w-screen h-screen bg-[lightpink] flex items-center justify-center">
      <ConnectWalletButton dispatch={dispatch} />
    </div>
  )
}

function ConnectWalletButton({ dispatch }) {
  return <button className="bg-[white] p-[20px] rounded-full border-solid border-[black] border-[1px] hover:bg-[red]" onClick={() => dispatch(connect())}>Connect Wallet</button>
}
