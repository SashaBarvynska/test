interface AddToast {
  message: string
  type: 'success' | 'error'
  timeout?: number
}

const useToast = () => {
  const root = document.getElementById('root') as HTMLElement

  const addToast = ({ message, type, timeout = 5000 }: AddToast ) => {
    const notification = document.createElement('div')
    notification.style.position = 'absolute'
    notification.style.top = '2em'
    notification.style.right = '2em'
    notification.style.zIndex = '999'
    notification.style.width = '11em'
    notification.style.minHeight = '3em'
    notification.style.color = 'var(--white)'
    notification.style.background = `var(--${type})`
    notification.style.padding = '1em'
    notification.style.fontFamily = 'cursive'
    notification.style.border = '0.2em solid var(--white)'
    notification.style.outline = 'outset'
    notification.textContent = message

    notification.animate([{ right: '2em' }, { right: '7em' }, { right: '2em' }], 400)
    root.append(notification)

    setTimeout(() => {
      notification.remove()
    }, timeout)
  }

  return { addToast }
}

export { useToast }
