export const useCurrentEvent = () => {
  return useState('currentEvent', () => null)
}
