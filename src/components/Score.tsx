"use client"
import {ReactNode} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"

type Tscore = {
  title: string
  total: number
  icon: ReactNode
  active?: boolean
  onClick: () => void
}

function Score({title, total, icon, active, onClick}: Tscore) {
  return (
    <Card
      onClick={onClick}
      className={`border ${
        active && "border-black"
      } transition-all cursor-pointer select-none`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total} ta</div>
        <p className="text-xs text-muted-foreground">
          +{Math.random().toString().slice(2, 4)}% from last month
        </p>
      </CardContent>
    </Card>
  )
}
export default Score
