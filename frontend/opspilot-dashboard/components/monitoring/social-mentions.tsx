"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useI18n } from "@/lib/i18n/client"
import { socialMentions } from "@/lib/data/monitoring"

export function SocialMentions() {
  const { t } = useI18n()

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>{t("monitoring.recentMentions")}</CardTitle>
        <CardDescription>{t("monitoring.recentMentionsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px]">
          <div className="space-y-4">
            {socialMentions.map((mention) => (
              <div key={mention.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={mention.username} />
                      <AvatarFallback>{mention.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{mention.username}</span>
                    <Badge variant="outline" className="ml-2">
                      {mention.platform}
                    </Badge>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      mention.sentiment === "positive"
                        ? "border-green-500 text-green-500"
                        : mention.sentiment === "negative"
                          ? "border-red-500 text-red-500"
                          : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {t(`customers.${mention.sentiment}`)}
                  </Badge>
                </div>
                <p className="text-sm">{mention.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{mention.timestamp}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
