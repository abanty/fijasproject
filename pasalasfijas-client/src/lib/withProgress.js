import NProgress from 'nprogress'

let configured = false

export const configureProgress = () => {
  if (configured) return

  NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    trickleSpeed: 80
  })
  configured = true
}

export const startProgress = () => {
  configureProgress()
  NProgress.start()
}

export const doneProgress = () => {
  NProgress.done()
}

export const withProgress = async fn => {
  startProgress()

  try {
    return await fn()
  } catch (error) {
    doneProgress()
    throw error
  }
}
