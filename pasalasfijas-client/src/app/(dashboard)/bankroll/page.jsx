import BankrollView from '@/views/bankroll'
import { getBankrollSummary } from '@/services/bankrollService'

export default async function BankrollPage() {
  const bankroll = await getBankrollSummary()

  return <BankrollView bankroll={bankroll} />
}
