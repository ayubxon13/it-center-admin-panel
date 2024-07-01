"use client"
import {useEffect} from "react"

declare global {
  interface Window {
    replainSettings: {id: string}
  }
}

function Chat() {
  useEffect(() => {
    window.replainSettings = {id: "30f280e8-72fc-416c-b7e6-7d1ad372aedc"}
    const script = document.createElement("script")
    script.async = true
    script.src = "https://widget.replain.cc/dist/client.js"
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return null
}

export default Chat
