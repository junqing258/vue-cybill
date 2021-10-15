export const loadScript = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script') as HTMLScriptElement
    script.type = 'text/javascript'
    script.onload = resolve
    script.onerror = reject
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
