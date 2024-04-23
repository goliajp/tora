import { makeAutoObservable } from 'mobx'

type CounterStoreType = {
  count: number
  increment: () => void
  decrement: () => void
}
export const counterStore = makeAutoObservable<CounterStoreType>({
  count: 0,
  increment() {
    this.count++
  },
  decrement() {
    this.count--
  }
})
